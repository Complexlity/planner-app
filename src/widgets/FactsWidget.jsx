import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { getRandomQuote } from "../getQuote";
import "../styles/styles.css";
import { motion, AnimatePresence } from 'framer-motion'

export default function FactsWidget() {
  const [category, setCategory] = useState('inspirational')
  const [info, setInfo] = useState('')
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
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        style={{
          maxWidth: "fit-content",
        }}
      >
        <option value="inspirational">Inspirational</option>
        <option value="funny">Funny</option>
        <option value="success">Success</option>
        <option value="leadership">Leadership</option>
        <option value="learning">Learning</option>
        <option value="happiness">Happiness</option>
      </select>
      <div style={{ position: "relative", flex: "1" }}>
        {isLoading ? (
          <div data-loader className="loading-div">
            <div className="loader">
              Loading
              <span></span>
            </div>
          </div>
        )
          :

          <DisplayedData data={data} />
        }
      </div>
    </div>
  );
}

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > text.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return <>{displayedText}</>;
};


  function DisplayedData({ data }) {
  const [displayedData, setDisplayedData] = useState(data[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  useEffect(() => {
    setDisplayedData(data[currentIndex]);
  }, [data, currentIndex]);

  return (
    <AnimatePresence mode="wait">
      {displayedData && (
        <motion.div
          key={displayedData}
          initial={{ opacity: 0, top: '-10px' }}
          animate={{ opacity: 1, top: '10px' }}
          exit={{ opacity: 0, top: '-10px' }}
          transition={{ duration: 0.5 }}
        >
          <Typewriter text={displayedData} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

