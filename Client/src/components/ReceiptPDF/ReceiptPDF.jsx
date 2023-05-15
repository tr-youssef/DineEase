import { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import BillReceipt from "../billReceipt/BillReceipt";
import { callAPI } from "../../utils/FetchData";
import { useParams } from "react-router-dom";

const ReceiptPDF = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pdf, setPDF] = useState(null);
  const params = useParams();
  const bookedId = params.id;
  useEffect(() => {
    callAPI(
      `${import.meta.env.VITE__API_URL}/api/orders/getOrder/${bookedId}`,
      "GET",
      "",
      user.token
    ).then((res) => {
      const pdf = BillReceipt({ order: res });
      setPDF(pdf);
    });
  }, [bookedId, user.token]);
  if (pdf == null) return null;
  return (
    <PDFViewer
      style={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        border: "none",
      }}
    >
      {pdf}
    </PDFViewer>
  );
};

export default ReceiptPDF;
