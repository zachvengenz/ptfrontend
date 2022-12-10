// code formatted with Prettier

import { Layout, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Tabmenu from "./components/Tabmenu";
import "./App.css";

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ background: "#1774ff" }}>
          <Title style={{ color: "white" }}>Customers & Trainings</Title>
        </Header>
        <Content style={{ background: "white" }}>
          <Tabmenu />
        </Content>
        <Footer style={{ color: "white", background: "#1774ff" }}>
          Author: github.com/zachvengenz
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
