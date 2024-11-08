import React from "react";

function Stock({ stock, onClick }) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">Price: ${stock.price}</p>
          <p className="card-text">Type: {stock.type}</p>
          <button onClick={onClick}>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default Stock;
