import { message, Row } from "antd";
import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import {
  getAsciiCharacter,
  nonPrintableNames,
  unusedAsciiValues,
} from "./ascii";
import AsciiCard from "./AsciiCard";

interface AsciiTableProps {
  highlightedCode: number;
}

const AsciiTable: React.FC<AsciiTableProps> = React.memo(
  ({ highlightedCode }) => {
    const asciiData = useMemo(
      () =>
        Array.from({ length: 256 }, (_, i) => ({
          code: i,
          hexCode: i.toString(16).toUpperCase().padStart(2, "0"),
          binaryCode: i.toString(2).padStart(8, "0"),
          octalCode: i.toString(8).padStart(3, "0"),
          character: getAsciiCharacter(i),
          isPrintable:
            !unusedAsciiValues.includes(i) && i in nonPrintableNames === false,
        })),
      [],
    );

    const onCellClick = useCallback(
      async (character: string, isPrintable: boolean) => {
        if (!isPrintable) return;
        try {
          await navigator.clipboard.writeText(character);
          message.success(`Copied '${character}' to clipboard!`);
        } catch (err) {
          const errorMEssage = `Failed to copy '${character}' to clipboard!`;
          message.error(errorMEssage);
          console.error(errorMEssage, err);
        }
      },
      [],
    );

    const refsMap = useRef<Record<number, HTMLDivElement | null>>({});

    useLayoutEffect(() => {
      if (highlightedCode != null && refsMap.current[highlightedCode]) {
        refsMap.current[highlightedCode]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [highlightedCode]);

    return (
      <div style={{ padding: "16px" }}>
        <Row gutter={[8, 8]}>
          {asciiData.map((data) => {
            const isHighlighted = data.code === highlightedCode;

            if (!refsMap.current[data.code]) {
              refsMap.current[data.code] = null;
            }

            return (
              <AsciiCard
                key={data.code}
                data={data}
                isHighlighted={isHighlighted}
                onCellClick={() =>
                  void onCellClick(data.character, data.isPrintable)
                }
                ref={(el) => (refsMap.current[data.code] = el)}
              />
            );
          })}
        </Row>
      </div>
    );
  },
);

AsciiTable.displayName = "AsciiTable";

export default AsciiTable;
