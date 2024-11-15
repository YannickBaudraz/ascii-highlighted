import React from "react";
import { Col, Card, Typography } from "antd";
import { blue } from "@ant-design/colors";

const { Text } = Typography;

interface AsciiCardProps {
  data: {
    code: number;
    hexCode: string;
    binaryCode: string;
    octalCode: string;
    character: string;
    isPrintable: boolean;
  };
  isHighlighted: boolean;
  onCellClick: (character: string, isPrintable: boolean) => void;
}

const AsciiCardInner = (
  { data, isHighlighted, onCellClick }: AsciiCardProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { code, hexCode, binaryCode, octalCode, character, isPrintable } = data;

  return (
    <Col xs={8} sm={6} md={4} lg={3} xl={2}>
      <div ref={ref}>
        <Card
          hoverable={isPrintable}
          onClick={
            isPrintable ? () => onCellClick(character, isPrintable) : undefined
          }
          style={{
            textAlign: "center",
            backgroundColor: isHighlighted ? blue[1] : "#ffffff",
            opacity: isPrintable ? 1 : 0.6,
          }}
        >
          <Text strong>{character}</Text>
          <div>
            <Text type="secondary">Dec: {code}</Text>
          </div>
          <div>
            <Text type="secondary">Hex: {hexCode}</Text>
          </div>
          <div>
            <Text type="secondary">Oct: {octalCode}</Text>
          </div>
          <div>
            <Text type="secondary">Bin: {binaryCode}</Text>
          </div>
        </Card>
      </div>
    </Col>
  );
};

const AsciiCard = React.forwardRef<HTMLDivElement, AsciiCardProps>(
  AsciiCardInner,
);

export default React.memo(AsciiCard);
