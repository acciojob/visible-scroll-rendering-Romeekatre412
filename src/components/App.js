import React, { useRef, useState } from "react";

const items = Array.from({ length: 1000 }, (_, i) => ({
  title: `Item ${i + 1}`,
  desc: "Lorem ipsum dolor sit amet."
}));

function App() {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const itemHeight = 50;
  const containerHeight = 500;

  const handleScroll = () => {
    setScrollTop(containerRef.current.scrollTop);
  };

  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const endIndex = startIndex + visibleCount;

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Visible Scroll Rendering</h2>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: "500px",
          overflowY: "auto",
          border: "1px solid black"
        }}
      >
        <div style={{ height: items.length * itemHeight }}>
          <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
            {visibleItems.map((item, index) => (
  <div key={startIndex + index} style={{ height: itemHeight, padding: "10px" }}>
    <strong>{item.title}</strong>
    <p>{item.desc}</p>
  </div>
))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;