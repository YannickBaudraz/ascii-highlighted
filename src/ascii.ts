export const nonPrintableNames: Record<number, string> = {
  0: "NUL",
  1: "SOH",
  2: "STX",
  3: "ETX",
  4: "EOT",
  5: "ENQ",
  6: "ACK",
  7: "BEL",
  8: "BS",
  9: "HT",
  10: "LF",
  11: "VT",
  12: "FF",
  13: "CR",
  14: "SO",
  15: "SI",
  16: "DLE",
  17: "DC1",
  18: "DC2",
  19: "DC3",
  20: "DC4",
  21: "NAK",
  22: "SYN",
  23: "ETB",
  24: "CAN",
  25: "EM",
  26: "SUB",
  27: "ESC",
  28: "FS",
  29: "GS",
  30: "RS",
  31: "US",
  32: "SP",
  127: "DEL",
};

export const unusedAsciiValues = [129, 141, 143, 144, 157];

const decoder = new TextDecoder("iso-8859-1");

export const getAsciiCharacter = (code: number): string => {
  return code in nonPrintableNames
    ? nonPrintableNames[code]
    : decoder.decode(new Uint8Array([code]));
};
