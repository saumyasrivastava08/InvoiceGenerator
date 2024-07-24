import React, { useState, useEffect } from "react";
import axios from "axios";

const Quotations = () => {
  const [quotations, setQuotations] = useState([]);
  const downloadPdf = async (filePath) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://invoicegenerator-ud0x.onrender.com/api/download-pdf/${encodeURIComponent(filePath.split("/").pop())}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filePath.split("/").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://invoicegenerator-ud0x.onrender.com/api/quotations",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setQuotations(response.data.quotations);
      } catch (err) {
        console.error("Error fetching quotations:", err);
      }
    };

    fetchQuotations();
  }, []);

  return (
    <div>
      <h2>Quotations</h2>
      <ul>
        {quotations.map((quotation) => (
          <li key={quotation._id}>
            <h3>{`Invoice ${quotation.date}`}</h3>{" "}
            {quotation.filePath && (
              <button onClick={() => downloadPdf(quotation.filePath)}>
                Download PDF
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quotations;
