import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { TRAINING_URL } from "../Constants";
import AddTraining from "./AddTraining";
import EditTraining from "./EditTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { format } from "date-fns";

// import dayjs from "dayjs";

// code formatted with Prettier

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const formatDate = (params) => {
    return format(new Date(params.value), "dd.MM.yyyy HH:mm");
  };

  // alternate formatter - would show empty as an invalid date
  /*
  const formatDate = (params) => {
    return dayjs(params.value).format("D.M.YYYY H:mm");
  };
  */

  const [columndefs] = useState([
    {
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: formatDate,
    },
    {
      field: "duration",
      sortable: true,
      filter: true,
      cellStyle: { color: "white", background: "#1774ff" },
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
      cellStyle: { color: "white", background: "#1774ff" },
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
          width: "95%",
          margin: "auto",
        }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columndefs}
          pagination={true}
          paginationPageSize={20}
          animateRows={true}
        />{" "}
      </div>
    </>
  );
}
