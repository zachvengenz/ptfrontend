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
        <Header style={{ background: "#1774ff" }}>
          <Title level={3} style={{ color: "white" }}>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </Title>
        </Header>
        <Content style={{ background: "white" }}>
          <Tabmenu />
        </Content>
        <Footer style={{ color: "white", background: "#1774ff" }}>
          Made by: github.com/zachvengenz
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
