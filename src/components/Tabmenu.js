import React, { useState } from "react";
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

export default function Tabmenu() {
  const [value, setValue] = useState("one");

  const handleTabChange = (value) => {
    setValue(value.key);
  };

  const items = [
    { label: "Home", key: "one", icon: <HomeOutlined /> },
    { label: "Customers", key: "two", icon: <UserOutlined /> },
    { label: "Trainings", key: "three", icon: <ThunderboltOutlined /> },
  ];

  return (
    <div>
      <Menu
        onClick={handleTabChange}
        selectedKeys={[value]}
        mode="horizontal"
        items={items}
      ></Menu>
      {value === "one" && (
        <div>
          <h1>Welcome to the front page!</h1>
          <h3>
            What you see is an assignment done in school, which means that the
            mediocrity of this creation knows no bounds.<br></br>
            The assignment was to create a front-end UI for provided back-end
            data using React and its libraries.
          </h3>
        </div>
      )}
      {value === "two" && (
        <div>
          {" "}
          <Customerlist />{" "}
        </div>
      )}
      {value === "three" && (
        <div>
          <Traininglist />
        </div>
      )}
    </div>
  );
}
