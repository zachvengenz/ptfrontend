import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { API_URL } from "../Constants";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

// code formatted with Prettier

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  // TODO
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
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Something went wrong");
        }
      })
      .then((data) => setCustomers(data._embedded.customers)) // kato viel toi customers
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
    fetch(API_URL, {
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
      <AddCar addCar={addCustomer} />
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
          paginationPageSize={10}
        />{" "}
      </div>
    </>
  );
}
