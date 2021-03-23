import React from 'react';
import "./NewsArticles.css";
import { v4 as uuidv4 } from "uuid";



const NewsArticles = ({ symbol, news }) => {
    
  let hidden = true; 

  const seeMore = () => {
      if (hidden) {
        for (let i=3; i<news.length; i++) {
          document.getElementById("hidden-news"+i).style.display="flex";
          document.getElementById("hidden-news"+i).style["flex-direction"]="row";
        }
        document.getElementById("see-more").innerHTML = "See Less";
        hidden=false;
      } else {
        for (let i=3; i<news.length; i++) {
          document.getElementById("hidden-news"+i).style.display="none";
        }
        document.getElementById("see-more").innerHTML = "See More";
        hidden=true;
      }
  }

  return (
    <div className="news-articles">
      <h2 className="news-header">{symbol} News Articles</h2>
      <br />
      {news.length>0 && 
        news.map((article, index) => (
          <span 
            id={index < 3 ? `news-list${index}` : `hidden-news${index}`}
            key={uuidv4()}
            onClick={() => window.open(`${article.url}`, '_blank')}
          >
            <img
              className="news-image"
              src={article.image}
              alt="test"
            />
            <span>
              <a 
                key={uuidv4()}
                className="hyperlink"
                rel="noreferrer" 
                href={article.url} 
                target="_blank"
              >
                {article.title}
              </a>
              <p className="news-text">{article.description}</p>
              <div className="news-source">{article.source.name} ({article.publishedAt.slice(0,10)})</div>
            </span>
          </span>
        ))
      }
      <button 
        id="see-more" 
        onClick={() => seeMore()}
      > 
        See More
      </button> 
    </div>
  )
}

export default NewsArticles
