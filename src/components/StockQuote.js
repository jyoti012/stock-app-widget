import React, { useState, useEffect } from "react";
import axiosInstance from "./../index";

const MARKET_STACK_TICKER_URL = `${process.env.REACT_APP_MARKETSTACK_BASE_URL}/tickers`;

function StockQuote(props) {
  const [stock, setStock] = useState({
    stockExchange: "N/A",
    name: "N/A",
  });

  useEffect(() => {
    axiosInstance
      .get(`${MARKET_STACK_TICKER_URL}/${props.symbol}`, {
        params: {
          access_key: process.env.REACT_APP_MARKETSTACK_ACCESS_KEY,
        },
      })
      .then((result) => {
        if (!result.data) {
          return;
        }
        setStock({
          stockExchange: result.data.stock_exchange.acronym,
          name: result.data.name,
        });
      });
  }, [props.symbol, stock.stockExchange]);

  const varColor = "text-green-500";

  return (
    <div className={"quote rounded-lg shadow-md p-4 bg-gray-800"}>
      <span className={"quoteSymbol text-sm text-white font-bold"}>
        {props.symbol}
      </span>
      <span className={"quoteSymbol text-2xs text-gray-400 ml-1"}>
        {stock.name}
      </span>
      <span className={"quoteSymbol text-2xs text-gray-400 ml-1"}>
        ({stock.stockExchange})
      </span>
      <div className={"quote flex flex-row justify-between mt-1"}>
        <div
          className={
            "quotePrice self-center text-2xl font-bold items-center text-white"
          }
        >
          $200
        </div>
        <div className={"flex flex-col text-right"}>
          <div className={"quoteVar " + varColor}>{10}%</div>
          <div className={"quoteTime text-right text-2xs text-gray-400"}>
            9/04/2025
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockQuote;
