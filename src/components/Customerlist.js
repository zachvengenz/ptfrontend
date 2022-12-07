import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { CUSTOMER_URL } from "../Constants";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

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
      cellStyle: { color: "black", background: "lightblue" },
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
      cellStyle: { color: "black", background: "lightblue" },
    },
    {
      field: "city",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "email",
      sortable: true,
      filter: true,
      width: 150,
      cellStyle: { color: "black", background: "lightblue" },
    },
    {
      field: "phone",
      sortable: true,
      filter: true,
      width: 150,
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
      fetch(data._links.car.href, {
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
          width: "90%",
          margin: "auto",
        }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columndefs}
          pagination={true}
          paginationPageSize={20}
        />{" "}
      </div>
    </>
  );
}
