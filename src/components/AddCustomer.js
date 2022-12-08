import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";

export default function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCustomer({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    });
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    props.addCustomer(customer);
    handleClose();
  };

  return (
    <div>
      <Button
        type="primary"
        shape="round"
        icon={<UserOutlined />}
        size="large"
        onClick={handleOpen}
      >
        Add a customer
      </Button>
      <Modal
        title="New customer"
        open={open}
        onOk={handleSave}
        onCancel={handleClose}
        closeIcon={<CloseOutlined />}
      >
        <p>First name</p>
        <Input
          name="firstname"
          value={customer.firstname}
          onChange={handleChange}
        />
        <p>Last name</p>
        <Input
          name="lastname"
          value={customer.lastname}
          onChange={handleChange}
        />
        <p>Street address</p>
        <Input
          name="streetaddress"
          value={customer.streetaddress}
          onChange={handleChange}
        />
        <p>Postal code</p>
        <Input
          name="postcode"
          value={customer.postcode}
          onChange={handleChange}
        />
        <p>City</p>
        <Input name="city" value={customer.city} onChange={handleChange} />
        <p>Email</p>
        <Input name="email" value={customer.email} onChange={handleChange} />
        <p>Phone</p>
        <Input name="phone" value={customer.phone} onChange={handleChange} />
      </Modal>
    </div>
  );
}
