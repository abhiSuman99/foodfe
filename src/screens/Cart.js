import React from 'react';
import { useCart } from '../components/ContextReducer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';

export default function Cart() {
  const data = useCart();

  const totalPrice = data.reduce((total, food) => total + food.price, 0);
  const gstAmount = parseFloat((totalPrice * 0.18).toFixed(1)); // Calculate GST amount and round off to 1 decimal place
  const finalPrice = parseFloat((totalPrice + gstAmount).toFixed(1)); // Calculate final price including GST and round off to 1 decimal place

  const pdfData = {
    totalPrice,
    gstAmount,
    finalPrice,
    items: data,
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4 text-center text-white">Your Cart</h1>
      <table className="table table-hover">
        <thead className="table-dark text-white">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody className='text-white'>
          {data.map((food, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="row justify-content-end">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Invoice Summary</h5>
              <p className="card-text">
                Total Price: {totalPrice.toFixed(1)}/-<br />
                GST (18%): {gstAmount.toFixed(1)}/-<br />
                Final Price: {finalPrice.toFixed(1)}/-
              </p>
              <PDFDownloadLink document={<InvoicePDF data={pdfData} />} fileName="invoice.pdf">
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download PDF'
                }
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
