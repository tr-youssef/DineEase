import { useEffect, useState } from "react";
import { callAPI } from "../../../utils/FetchData.jsx";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import { Time } from "../../../utils/SecondsToMs.jsx";

function FilledData() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      try {
        const res = await callAPI(
          `${import.meta.env.VITE__API_URL}/api/tables/filledTables/`,
          "GET",
          "",
          user.token
        );
        const result = res.map((table) => ({
          ...table,
          key: table._id,
          waitingTime: Time(table.waitingTime),
          bookedAt: new Date(
            table.bookedAt - new Date().getTimezoneOffset()
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        }));
        setDataSource(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user.token]);

  const Columns = [
    {
      title: "Table No.",
      dataIndex: "nameOfTable",
      key: "nameOfTable",
    },
    {
      title: "Seats",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Waiting Time",
      dataIndex: "waitingTime",
      key: "waitingTime",
    },
    {
      title: "Booked At",
      dataIndex: "bookedAt",
      key: "bookedAt",
    },
  ];

  return (
    <div className="availableTable">
      <AntTable Columns={Columns} dataSource={dataSource} />
    </div>
  );
}

export default FilledData;
