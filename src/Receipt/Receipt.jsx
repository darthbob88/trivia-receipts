import React from 'react';
import "./Receipt.css"

const Receipt = ({ receipt }) => { 
  const subtotal = receipt.items.reduce((acc, cur) => acc + cur.price, 0);
  return (
    <div className="receipt">
      <h2>{receipt.storeName}</h2>
      <h3>{receipt.location}</h3>
      <hr />
      <p className="date">Date: {receipt.date}</p>
      <ul className="items">
        {receipt.items.map(item => (
          <li key={item.name}>
            <span>{item.name}</span>
            <span>
              {receipt.currency}
              {item.price}
            </span>
          </li>
        ))}
      </ul>
      <ul className="ending">
        <li>
          Subtotal: {receipt.currency}
          {subtotal}
        </li>
        <li>
          Tax: {receipt.currency}
          {(subtotal * 0.08).toFixed(0)}
        </li>
        <li>
          Total: {receipt.currency}
          {(subtotal * 1.08).toFixed(0)}
        </li>
      </ul>
      <h4>Thanks for shopping!</h4>
      <img
        alt="barcode"
        src="https://i.imgur.com/P1u1Wn8.jpg"
        style={{ margin: "0 auto", display: "block" }}
      />
    </div>
  );}

/*
{
         storeName: "Pokemart",
         location: "Viridian City, Kanto Region",
         date: "02/27/1996",
         currency: "₽",
         items: [{name: "Pokeballs", price: 500}]
       }
        */

Receipt.defaultProps = {
  // bla: 'test',
};

export default Receipt;
