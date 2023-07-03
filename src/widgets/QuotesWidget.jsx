import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { getRandomQuote } from "../getRandomQuotes";
import "../styles/styles.css";
import { motion, AnimatePresence } from "framer-motion";

export default function QuotesWidget() {
  const [category, setCategory] = useState("inspirational");
  const url = `https://api.api-ninjas.com/v1/quotes?category=${category}&limit=10`;
  const { data, error, isLoading } = useSWR(url, getRandomQuote);
  return (
    <div
      style={{
        width: 300,
        minHeight: 150,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        style={{
          maxWidth: "fit-content",
        }}
      >
        <option value="inspirational">Inspiration</option>
        <option value="courage">Courage</option>
        <option value="education">Education</option>
        <option value="success">Success</option>
        <option value="happiness">Happiness</option>
      </select>
      <div
        style={{
          position: "relative",
          flex: "1",
          display: "grid",
          alignItems: "center",
        }}
      >
        {isLoading && (
          <LoadingSpinner />
        )}
        {data ? <DisplayedData data={data} /> : null}
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: "medium",
        }}
      >
        <span style={{ color: "lightgreen" }}>Tip</span>:{" "}
        <span style={{ fontStyle: "italic" }}>Hover over quote to prevent blur out</span>
      </p>
    </div>
  );
}

function DisplayedData({ data }) {
  const [displayedData, setDisplayedData] = useState(data[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length, data, isHovered]);

  useEffect(() => {
    setDisplayedData(data[currentIndex]);
  }, [data, currentIndex]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <AnimatePresence mode="wait">
      {displayedData && (
        <motion.div
          key={displayedData}
          initial={{ opacity: 0, top: "-10px" }}
          animate={{ opacity: 1, top: "10px" }}
          exit={{ opacity: 0, top: "-10px" }}
          transition={{ duration: 0.5 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="quote">{displayedData}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingSpinner() {
  return (
    <div data-loader className="loading-div">
      <div className="loader">
        Loading...
        <span></span>
      </div>
    </div>
  );
}