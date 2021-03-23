import './App.css';
import React, { useState, useEffect } from "react";
import Chart from "./components/Chart/Chart";
import SearchBar from "./components/SearchBar/SearchBar";
import NewsArticles from "./components/NewsArticles/NewsArticles";
import { STOCKS_REF } from "./StockList";
// import { renderIntoDocument } from 'react-dom/test-utils';


function App() {

  const API_KEY_STOCK = "48e307f8ac79427eb947f26e045d3b36"; //TwelveData
  // const API_KEY_NEWS = "a2c5d4b9d2a24021a0ec161f2215e7a3"; //NewsAPI
  const API_KEY_NEWS = "6d46a318565a5800ae0e79635293547e"; //GNews
  // const stocks = "AAPL";
  // const interval = "1day";
  // const outputSize = 365;

  // const [stockList, setStockList] = useState("");
  const [openPrices, setOpenPrices] = useState([]);
  const [highPrices, setHighPrices] = useState([]);
  const [lowPrices, setLowPrices] = useState([]);
  const [closePrices, setClosePrices] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [interval, setInterval] = useState("1day");
  const [outputSize, setOutputSize] = useState(100);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("AAPL");
  const [news, setNews] = useState([]);
  const [newsQuery, setNewsQuery] = useState("Apple Inc");

  const intervals = ["1min", "5min", "15min", "30min", "45min", "1h", "2h", "4h", "1day", "1week", "1month"];

  useEffect( () => {
    getStockList();
    getNews();
  },[query]);


  const getStockList = async () => {
    const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${query}&interval=${interval}&outputsize=${outputSize}&apikey=${API_KEY_STOCK}`);
    const data = await response.json();
    console.log(data);

    let openPrices = data.values.map(timeInterval => timeInterval.open);
    let highPrices = data.values.map(timeInterval => timeInterval.high);
    let lowPrices = data.values.map(timeInterval => timeInterval.low);
    let closePrices = data.values.map(timeInterval => timeInterval.close);
    let volumes = data.values.map(timeInterval => timeInterval.volume);
    let dateTimes = data.values.map(timeInterval => timeInterval.datetime);

    setOpenPrices(openPrices);
    setHighPrices(highPrices);
    setLowPrices(lowPrices);
    setClosePrices(closePrices);
    setVolumes(volumes);
    setTimeData(dateTimes);
  }

  const getNews = async () => {
    const response = await fetch(`https://gnews.io/api/v4/search?q=${newsQuery} stock&lang=en&token=${API_KEY_NEWS}`);
    const data = await response.json();
    
    console.log(data);
    setNews(data.articles);
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
    
    // define auto-complete suggestions from stock reference list.
    let autoCompleteArr=[];

    if (e.target.value) {
      autoCompleteArr = STOCKS_REF.filter(stock => stock.name.toLowerCase().includes(e.target.value) || stock.symbol.toLowerCase().includes(e.target.value.toLowerCase()))
        .slice(0,20); // keep results under 20;
      autoCompleteArr = autoCompleteArr.map((stock, index) => `<li id="suggestion${index}">${stock.symbol} - ${stock.name}</li>`);
    }
    showAutoComplete(autoCompleteArr);
  }

  // show auto-complete suggestions, and enable clicking on stock to populate search-bar with ticker.
  const showAutoComplete = (autoCompleteArr) => {
    const html = autoCompleteArr.length ? autoCompleteArr.join('') : "";
    document.getElementById("auto-complete").innerHTML = html;

    // regex to pull symbol out of search suggestion <li> tags
    let stockSymbolRegex = /(?<=>)\S*(?= -)/; 
    for (let i=0; i<autoCompleteArr.length; i++) {
      let stockSymbol = autoCompleteArr[i].match(stockSymbolRegex)[0];
      let companyName = STOCKS_REF.filter(stock => stock.symbol===stockSymbol)[0].name;
      document.getElementById("suggestion"+i).addEventListener("click", () => {
        setNewsQuery(companyName);
        setQuery(stockSymbol);
      });
    }
  }

  const getSearch = (e) => {
    e.preventDefault(); //prevent app from re-rendering to initial state
    let companyName = STOCKS_REF.filter(stock => stock.symbol===search.toUpperCase())[0].name;
    setNewsQuery(companyName);
    setQuery(search.toUpperCase());
    setSearch("");
  }

  const upInterval = () => {
    let currentIndex = intervals.indexOf(interval);
    if (currentIndex !== intervals.length-1) {
      setInterval(intervals[currentIndex+1]);
    }
  }

  const downInterval = () => {
    let currentIndex = intervals.indexOf(interval);
    if (currentIndex !== 0) {
      setInterval(intervals[currentIndex-1]);
    }
  }

  const updateOutputSize = (e) => {
    setOutputSize(e.target.value);
  }

  return (
    <div className="App">
      
      <SearchBar 
        search={search} 
        getSearch={getSearch} 
        updateSearch={updateSearch}
        interval={interval}
        upInterval={upInterval}
        downInterval={downInterval}
        outputSize={outputSize}
        updateOutputSize={updateOutputSize}
      />
      
      <Chart 
        symbol={query}
        openPrices={openPrices}
        highPrices={highPrices}
        lowPrices={lowPrices}
        closePrices={closePrices}
        volumes={volumes}
        timeData={timeData}
      />
      
      <NewsArticles 
        symbol={query}
        news={news}
      />

    </div>
  );
}

export default App;
