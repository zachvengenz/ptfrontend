import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { CloseOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import { Col, InputNumber, Row, Slider } from "antd";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: null,
    activity: "",
    duration: 0,
    customer: "",
  });
  const [durationValue, setDurationValue] = useState(1);

  const onChange = (newValue) => {
    setDurationValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        shape="round"
        icon={<ThunderboltOutlined />}
        size="large"
        onClick={handleOpen}
      >
        Book a training session
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
            format="DD-MM-YYYY H:mm"
            showTime
            onOk={(e) => setTraining({ ...training, date: e.target.value })}
          />
        </Space>
        {/* <Input
          placeholder="Date"
          value={training.date}
          onChange={(e) => setTraining({ ...training, date: e.target.value })}
        /> */}
        <p>Duration (min)</p>
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={90}
              onChange={onChange}
              value={typeof durationValue === "number" ? durationValue : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={90}
              style={{
                margin: "0 16px",
              }}
              value={durationValue}
              onChange={onChange}
            />
          </Col>
        </Row>
        {/* <Input
          placeholder="Duration (min)"
          type="number"
          value={training.duration}
          onChange={(e) =>
            setTraining({ ...training, duration: e.target.value })
          }
        /> */}
        <p>Activity</p>
        <Input
          placeholder="Activity"
          value={training.activity}
          onChange={(e) =>
            setTraining({ ...training, activity: e.target.value })
          }
        />
        <p>Customer</p>
        <Input
          placeholder="Customer"
          type="list"
          value={training.customer}
          onChange={(e) =>
            setTraining({ ...training, customer: e.target.value })
          }
        />
      </Modal>
    </div>
  );
}
