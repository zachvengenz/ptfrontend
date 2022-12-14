// code formatted with Prettier

import React, { useState } from "react";
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";
import Calendar from "./Calendar";
import Stats from "./Stats";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ThunderboltOutlined,
  CalendarOutlined,
  LineChartOutlined,
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
    { label: "Calendar", key: "four", icon: <CalendarOutlined /> },
    { label: "Statistics", key: "five", icon: <LineChartOutlined /> },
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
          <h1 style={{ fontSize: 36, marginTop: 10 }}>
            Welcome to the front page!
          </h1>
          <h3 style={{ fontSize: 24, marginBottom: 20 }}>
            What you see is an assignment done in school, which means that the
            mediocrity of this creation knows no bounds.<br></br>
            The assignment was to create a front-end UI for provided back-end
            data using React and its libraries.
          </h3>
        </div>
      )}
      {value === "two" && (
        <div>
          <Customerlist />
        </div>
      )}
      {value === "three" && (
        <div>
          <Traininglist />
        </div>
      )}
      {value === "four" && (
        <div>
          <Calendar />
        </div>
      )}
      {value === "five" && (
        <div>
          <Stats />
        </div>
      )}
    </div>
  );
}
