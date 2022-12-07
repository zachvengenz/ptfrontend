import { Layout } from "antd";
import { Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "./App.css";
import Tabmenu from "./components/Tabmenu";
const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ background: "lightblue" }}>
          <Title level={3} code={true} italic={true}>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </Title>
        </Header>
        <Content style={{ background: "white" }}>
          <Tabmenu />
        </Content>
        <Footer style={{ background: "lightblue" }}>
          Made by: github.com/zachvengenz
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
