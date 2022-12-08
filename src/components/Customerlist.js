import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { CUSTOMER_URL } from "../Constants";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { DeleteOutlined } from "@ant-design/icons";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Space } from "antd";

// code formatted with Prettier

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  const [columndefs] = useState([
    {
      field: "firstname",
      sortable: true,
      filter: true,
    },
    {
      field: "lastname",
      sortable: true,
      filter: true,
      cellStyle: { color: "white", background: "#1774ff" },
    },
    {
      field: "streetaddress",
      sortable: true,
      filter: true,
    },
    {
      field: "postcode",
      sortable: true,
      filter: true,
      cellStyle: { color: "white", background: "#1774ff" },
    },
    {
      field: "city",
      sortable: true,
      filter: true,
    },
    {
      field: "email",
      sortable: true,
      filter: true,
      cellStyle: { color: "white", background: "#1774ff" },
    },
    {
      field: "phone",
      sortable: true,
      filter: true,
    },
    {
      width: 150,
      cellRenderer: (params) => (
        <EditCustomer data={params.data} updateCustomer={updateCustomer} />
      ),
    },
    {
      width: 150,
      cellRenderer: (params) => (
        <Space>
          <Button
            type="primary"
            style={{ fontWeight: "bolder" }}
            danger
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => deleteCustomer(params.data)}
          >
            {" "}
            Delete{" "}
          </Button>
        </Space>
      ),
    },
  ]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    fetch(CUSTOMER_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to fetch");
        }
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (data) => {
    if (window.confirm("Are you sure?")) {
      fetch(data.links[1].href, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            getCustomers();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const addCustomer = (customer) => {
    fetch(CUSTOMER_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          getCustomers();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  const updateCustomer = (customer, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          getCustomers();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{
          height: 650,
          width: "95%",
          margin: "auto",
        }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columndefs}
          pagination={true}
          paginationPageSize={20}
          animateRows={true}
        />{" "}
      </div>
    </>
  );
}
