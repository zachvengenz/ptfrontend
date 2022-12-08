// code formatted with Prettier

import { CSVLink } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function ExportCSV(props) {
  const csvHeaders = [
    { label: "firstname", key: "firstname" },
    { label: "lastname", key: "lastname" },
    { label: "streetaddress", key: "streetaddress" },
    { label: "postcode", key: "postcode" },
    { label: "city", key: "city" },
    { label: "email", key: "email" },
    { label: "phone", key: "phone" },
  ];

  return (
    <div>
      <CSVLink
        onClick={() => {
          if (window.confirm("Confirm download?")) {
            return true;
          } else {
            return false;
          }
        }}
        headers={csvHeaders}
        data={props.customers}
        filename={"customerdata.csv"}
        enclosingCharacter={``}
      >
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<DownloadOutlined />}
        >
          CSV download
        </Button>
      </CSVLink>
    </div>
  );
}
