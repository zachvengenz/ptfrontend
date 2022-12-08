// code formatted with Prettier

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { TRAINING_URL, TRAININGS_URL } from "../Constants";
import { format } from "date-fns";
import { Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

// import dayjs from "dayjs";

export default function Traininglist(props) {
  const [trainings, setTrainings] = useState([]);
  const formatDate = (params) => {
    return format(new Date(params.value), "dd.MM.yyyy HH:mm");
  };

  // alternate formatter - would show empty as an invalid date for some reason
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
    {
      field: "customer.phone",
      sortable: true,
      filter: true,
      cellStyle: { color: "white", background: "#1774ff" },
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
            onClick={() => deleteTraining(params.data)}
          >
            {" "}
            Delete{" "}
          </Button>
        </Space>
      ),
    },
  ]);

  useEffect(() => {
    getTrainings();
  }, [props]);

  const getTrainings = () => {
    fetch(TRAININGS_URL)
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
    if (window.confirm("Delete?")) {
      fetch(TRAINING_URL + "/" + data.id, {
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

  return (
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
        paginationPageSize={10}
        animateRows={true}
      />{" "}
    </div>
  );
}
