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
  };

  const handleSave = () => {
    props.addCustomer(customer);
    setOpen(false);
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
          placeholder="First name"
          value={customer.firstname}
          onChange={(e) =>
            setCustomer({ ...customer, firstname: e.target.value })
          }
        />
        <p>Last name</p>
        <Input
          placeholder="Last name"
          value={customer.lastname}
          onChange={(e) =>
            setCustomer({ ...customer, lastname: e.target.value })
          }
        />
        <p>Street address</p>
        <Input
          placeholder="Street address"
          value={customer.streetaddress}
          onChange={(e) =>
            setCustomer({ ...customer, streetaddress: e.target.value })
          }
        />
        <p>Postal code</p>
        <Input
          placeholder="Postal code"
          value={customer.postcode}
          onChange={(e) =>
            setCustomer({ ...customer, postcode: e.target.value })
          }
        />
        <p>City</p>
        <Input
          placeholder="City"
          value={customer.city}
          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
        />
        <p>Email</p>
        <Input
          placeholder="Email"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        />
        <p>Phone</p>
        <Input
          placeholder="Phone"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />
      </Modal>
    </div>
  );
}
