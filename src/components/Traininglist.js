import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { TRAINING_URL } from "../Constants";
import AddTraining from "./AddTraining";
import EditTraining from "./EditTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

// code formatted with Prettier

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  const [columndefs] = useState([
    {
      field: "date",
      sortable: true,
      filter: true,
    },
    {
      field: "duration",
      sortable: true,
      filter: true,
      cellStyle: { color: "black", background: "lightblue" },
    },
    {
      field: "activity",
      sortable: true,
      filter: true,
    },
    {
      field: "customer.firstname",
      sortable: true,
      filter: true,
      cellStyle: { color: "black", background: "lightblue" },
    },
    {
      field: "customer.lastname",
      sortable: true,
      filter: true,
    },
  ]);

  useEffect(() => {
    getTrainings();
  }, []);

  const formatDate = (d) => {
    setTrainings({ ...trainings, date: d.format("ll") });
  };

  const getTrainings = () => {
    fetch(TRAINING_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to fetch");
        }
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (data) => {
    if (window.confirm("Are you sure?")) {
      fetch(data._links.car.href, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            getTrainings();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const addTraining = (training) => {
    fetch(TRAINING_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) {
          getTrainings();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  const updateTraining = (training, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) {
          getTrainings();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AddTraining addTraining={addTraining} />
      <div
        className="ag-theme-material"
        style={{
          height: 650,
          width: "90%",
          margin: "auto",
        }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columndefs}
          pagination={true}
          paginationPageSize={20}
        />{" "}
      </div>
    </>
  );
}
