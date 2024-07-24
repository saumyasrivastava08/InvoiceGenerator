import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Quotations = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://invoicegenerator-ud0x.onrender.com/api/quotations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuotations(response.data.quotations);
      } catch (err) {
        console.error('Error fetching quotations:', err);
      }
    };

    fetchQuotations();
  }, []);

  return (
    <div>
      <h2>Quotations</h2>
      <ul>
        {quotations.map(quotation => (
          <li key={quotation._id}>
            <Link to={`/quotation/${quotation._id}`}>{`Invoice ${quotation.date}`}</Link>
            {quotation.filePath && (
              <a
                href={`https://invoicegenerator-ud0x.onrender.com/api/download-pdf/${encodeURIComponent(quotation.filePath.split('/').pop())}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download PDF
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quotations;
