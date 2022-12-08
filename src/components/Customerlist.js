// code formatted with Prettier

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { CUSTOMER_URL, TRAINING_URL } from "../Constants";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import AddTraining from "./AddTraining";
import ExportCSV from "./ExportCSV";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Customerlist(props) {
  const [customers, setCustomers] = useState([]);

  const [columndefs] = useState([
    {
      width: 150,
      field: "firstname",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      width: 150,
      field: "lastname",
      sortable: true,
      filter: true,
      cellStyle: { color: "white", background: "#1774ff", textAlign: "left" },
    },
    {
      field: "streetaddress",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      width: 150,
      field: "postcode",
      sortable: true,
      filter: true,
      cellStyle: { color: "white", background: "#1774ff", textAlign: "left" },
    },
    {
      width: 150,
      field: "city",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "email",
      sortable: true,
      filter: true,
      cellStyle: { color: "white", background: "#1774ff", textAlign: "left" },
    },
    {
      width: 150,
      field: "phone",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      width: 150,
      field: "Training",
      cellStyle: { textAlign: "left" },
      cellRenderer: (params) => (
        <AddTraining data={params.data} addTraining={addTraining} />
      ),
    },
    {
      width: 150,
      cellStyle: { textAlign: "left" },
      cellRenderer: (params) => (
        <EditCustomer data={params.data} updateCustomer={updateCustomer} />
      ),
    },
    {
      width: 150,
      cellStyle: { textAlign: "left" },
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
  }, [props]);

  const addTraining = (training) => {
    fetch(TRAINING_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) {
          return;
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

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
    if (window.confirm("Delete?")) {
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
    <div>
      <Space>
        <AddCustomer addCustomer={addCustomer} />
        <ExportCSV customers={customers} />
      </Space>
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
          paginationPageSize={10}
          animateRows={true}
        />
      </div>
    </div>
  );
}
