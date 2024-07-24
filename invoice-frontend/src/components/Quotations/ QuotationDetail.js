// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const QuotationDetail = ({ params }) => {
//   const [quotation, setQuotation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuotation = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`https://invoicegenerator-ud0x.onrender.com/api/quotations/${params.id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setQuotation(response.data.quotation);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching quotation:', err);
//         setLoading(false);
//       }
//     };

//     fetchQuotation();
//   }, [params.id]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Quotation Detail</h2>
//       {quotation && (
//         <div>
//           <h3>{`Invoice Date: ${new Date(quotation.date).toLocaleDateString()}`}</h3>
//           <ul>
//             {quotation.products.map((product, index) => (
//               <li key={index}>
//                 {`${product.name}: ${product.qty} x ${product.rate} = ${product.qty * product.rate + product.gst}`}
//               </li>
//             ))}
//           </ul>
//           <a href={`https://invoicegenerator-ud0x.onrender.com/api/quotations/download/${quotation.filePath}`} target="_blank" rel="noopener noreferrer">
//             Download PDF
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuotationDetail;
