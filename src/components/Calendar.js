// code formatted with Prettier

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { TRAININGS_URL } from "../Constants";
import dayjs from "dayjs";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Calendar(props) {
  const [trainings, setTrainings] = useState([]);

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

  useEffect(() => {
    getTrainings();
  }, [props]);

  return (
    <div>
      <FullCalendar
        timeZone="UTC"
        plugins={[dayGridPlugin, timeGridPlugin, bootstrap5Plugin, listPlugin]}
        initialView="dayGridMonth"
        height="auto"
        weekNumbers={true}
        themeSystem="bootstrap5"
        firstDay={1}
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "dayGridMonth timeGridWeek timeGridDay listMonth",
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        events={trainings.map((e) => {
          return {
            title: `${e.customer.firstname} ${e.customer.lastname} - ${e.activity}`,
            start: dayjs(e.date.substring(0, 23)).toISOString(),
            end: dayjs(e.date.substring(0, 23))
              .add(e.duration, "minute")
              .toISOString(),
          };
        })}
      />
    </div>
  );
}
