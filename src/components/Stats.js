// code formatted with Prettier

import { Space } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TRAINING_URL } from "../Constants";

export default function Stats() {
  const [trainings, setTrainings] = useState([]);
  const [data, setData] = useState([]);

  const getTrainings = () => {
    fetch(TRAINING_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to fetch");
        }
      })
      .then((data) => setTrainings(data.content))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
    setData(_.groupBy(trainings, "activity"));
  }, [trainings]);

  const dataArr = [];
  for (const i in data) {
    dataArr.push({ activity: i, duration: _.sumBy(data[i], "duration") });
  }

  return (
    <div>
      <h2 style={{ marginTop: 20 }}>Graphic spread of booked trainings</h2>
      <Space style={{ marginTop: 20, marginBottom: 20 }}>
        <BarChart width={700} height={500} data={dataArr}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#1774ff" />
        </BarChart>
        <PieChart width={600} height={350}>
          <Pie
            data={dataArr}
            dataKey="duration"
            nameKey="activity"
            outerRadius={150}
            innerRadius={55}
            fill="#1774ff"
          />
          <Tooltip />
        </PieChart>
      </Space>
    </div>
  );
}
