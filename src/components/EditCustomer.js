// code formatted with Prettier

import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

export default function EditCustomer(props) {
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
    setCustomer({
      firstname: props.data.firstname,
      lastname: props.data.lastname,
      streetaddress: props.data.streetaddress,
      postcode: props.data.postcode,
      city: props.data.city,
      email: props.data.email,
      phone: props.data.phone,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCustomer(customer, props.data.links[1].href);
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ fontWeight: "bolder" }}
        shape="round"
        icon={<EditOutlined />}
        onClick={handleOpen}
      >
        Edit
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
