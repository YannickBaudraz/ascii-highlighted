import { Input, Layout, Select, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import AsciiTable from "./AsciiTable";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [base, setBase] = useState<"10" | "16" | "2" | "8">("10");
  const [code, setCode] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBaseChange = (value: "10" | "16" | "2" | "8") => {
    setBase(value);
  };

  const convertToChar = useCallback(
    (value: string) => {
      let code;
      switch (base) {
        case "10":
          code = parseInt(value, 10);
          break;
        case "16":
          code = parseInt(value, 16);
          break;
        case "2":
          code = parseInt(value, 2);
          break;
        case "8":
          code = parseInt(value, 8);
          break;
        default:
          code = NaN;
      }

      setCode(code);
    },
    [base],
  );

  useEffect(() => {
    convertToChar(inputValue);
  }, [inputValue, base, convertToChar]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Fixed Header */}
      <div className="header">
        <Title
          level={3}
          style={{ color: "#fff", textAlign: "center", margin: 0 }}
        >
          ASCII Table Highlighter
        </Title>
        <div className="input-container">
          <Select
            defaultValue="10"
            onChange={handleBaseChange}
            style={{ width: 120, marginRight: "16px" }}
            size="large"
          >
            <Option value="10">Decimal</Option>
            <Option value="16">Hexadecimal</Option>
            <Option value="2">Binary</Option>
            <Option value="8">Octal</Option>
          </Select>
          <Input
            placeholder={`Enter ASCII code in base ${base}`}
            value={inputValue}
            onChange={handleInputChange}
            style={{ width: 200 }}
            size="large"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <Content style={{ padding: "16px", marginTop: "100px" }}>
        <AsciiTable highlightedCode={code} />
      </Content>
    </Layout>
  );
};

export default App;
