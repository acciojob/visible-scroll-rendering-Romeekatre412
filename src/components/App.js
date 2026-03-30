import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const ITEM_HEIGHT = 60;
const CONTAINER_HEIGHT = 500;
const TOTAL_ITEMS = 1000;

const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  text: `Item ${i + 1}`,
}));

function App() {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIndex = startIndex + visibleCount;

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = () => {
    setScrollTop(containerRef.current.scrollTop);
  };

  useEffect(() => {
    const node = containerRef.current;
    node.addEventListener("scroll", handleScroll);
    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "500px",
        overflowY: "auto",
        border: "1px solid black",
      }}
    >
      {/* IMPORTANT: relative container */}
      <div
        style={{
          height: TOTAL_ITEMS * ITEM_HEIGHT,
          position: "relative",
        }}
      >
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;

          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top: actualIndex * ITEM_HEIGHT,
                height: ITEM_HEIGHT,
                width: "100%",
                borderBottom: "1px solid #ccc",
                padding: "10px",
                boxSizing: "border-box",
                background: "white",
              }}
            >
              <h4>{item.text}</h4>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;