// code formatted with Prettier

import React, { useState } from "react";
import {
  Button,
  Modal,
  Input,
  Col,
  InputNumber,
  Row,
  Slider,
  DatePicker,
  Space,
} from "antd";
import { CloseOutlined, ThunderboltOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: null,
    activity: "",
    duration: 0,
    customer: "",
  });
  const [duration, setDuration] = useState(1);

  const handleOpen = () => {
    setOpen(true);
    setTraining({ ...training, customer: props.data.links[1].href });
  };

  const handleClose = () => {
    setOpen(false);
    setTraining({
      date: null,
      activity: "",
      duration: 0,
      customer: "",
    });
  };

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
  };

  const handleDuration = () => {
    setTraining({ ...training, duration: duration });
  };

  const handleDate = (e) => {
    setTraining({ ...training, date: dayjs(e).toISOString() });
  };

  return (
    <div>
      <Button
        type="dashed"
        style={{
          fontWeight: "bolder",
          background: "green",
          color: "white",
        }}
        shape="round"
        icon={<ThunderboltOutlined />}
        onClick={handleOpen}
      >
        Book
      </Button>
      <Modal
        title="New training session"
        open={open}
        onOk={handleSave}
        onCancel={handleClose}
        closeIcon={<CloseOutlined />}
      >
        <p>Date</p>
        <Space direction="vertical" size={12}>
          <DatePicker
            format="DD-MM-YYYY HH:mm"
            showTime
            onChange={handleDate}
          />
        </Space>
        <p>Duration (min)</p>
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={180}
              onChange={(e) => {
                setDuration(e);
                handleDuration(e);
              }}
              value={typeof duration === "number" ? duration : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={180}
              style={{
                margin: "0 16px",
              }}
              value={duration}
              onChange={(e) => {
                setDuration(e);
                handleDuration(e);
              }}
            />
          </Col>
        </Row>
        <p>Activity</p>
        <Input
          placeholder="Activity"
          value={training.activity}
          onChange={(e) =>
            setTraining({ ...training, activity: e.target.value })
          }
        />
      </Modal>
    </div>
  );
}
