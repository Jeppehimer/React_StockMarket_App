import React from 'react';
import "./SearchBar.css";
import { GoArrowUp, GoArrowDown } from "react-icons/go";

const SearchBar = ({ search, updateSearch, getSearch, interval, upInterval, downInterval, updateOutputSize, outputSize }) => {
    


    return (
        <div className="search-bar">
            <form className="wrapper" onSubmit={getSearch}>
                <div className="auto-complete-parent">
                    <input  
                        id="search"
                        className="stock-search"
                        type="text" 
                        placeholder="Search Tickers"
                        autocomplete="off"
                        value={search} 
                        onChange={updateSearch} 
                    />
                    <ul id="auto-complete" className="auto-complete-list"></ul>
                </div>
                <button  
                    className="button"
                    type="submit" 
                >
                    Search
                </button>
            </form>
            
                <div className="wrapper">
                    <div className="inline-child">Interval: {interval}</div>
                    <GoArrowDown className="arrow-icons" onClick={downInterval} />
                    <GoArrowUp className="arrow-icons" onClick={upInterval} />                                 
                </div>
                <div className="wrapper">
                    <form>
                        Output Size (samples):&nbsp;  
                        <input 
                            className="sample-size"
                            type="text"
                            autocomplete="off" 
                            value={outputSize}
                            onChange={updateOutputSize}
                        />
                    </form>
                </div>  
        </div>
    )
}

export default SearchBar
