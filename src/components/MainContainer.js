import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((data) => setStocks(data));
  }, []);

  const buyStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const sellStock = (stock) => {
    setPortfolio(portfolio.filter((item) => item.id !== stock.id));
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.ticker.localeCompare(b.ticker);
    } else if (sortBy === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  const filteredStocks = sortedStocks.filter((stock) => {
    if (filter === "") return true;
    return stock.type === filter;
  });

  return (
    <div>
      <SearchBar
        setSortBy={setSortBy}
        setFilter={setFilter}
        filter={filter}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onBuy={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onSell={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
