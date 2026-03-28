import React, { useRef, useState } from "react";

function App() {
  const containerRef = useRef(null);

  // ✅ items in state (IMPORTANT for load more)
  const [items, setItems] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      title: `Item ${i + 1}`,
      desc: "Lorem ipsum dolor sit amet."
    }))
  );

  const [scrollTop, setScrollTop] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemHeight = 60; // ✅ added
  const containerHeight = 500;

  // ✅ Load more items
  const loadMoreItems = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...Array.from({ length: 20 }, (_, i) => ({
          title: `Item ${prev.length + i + 1}`,
          desc: "Lorem ipsum dolor sit amet."
        }))
      ]);
      setLoading(false);
    }, 500);
  };

  // ✅ Scroll handler with 90% logic
  const handleScroll = () => {
    const scrollTopVal = containerRef.current.scrollTop;
    const scrollHeight = containerRef.current.scrollHeight;
    const clientHeight = containerRef.current.clientHeight;

    setScrollTop(scrollTopVal);

    // 🔥 90% scroll trigger
    if (scrollTopVal + clientHeight >= scrollHeight * 0.9) {
      loadMoreItems();
    }
  };

  // ✅ Virtual scroll logic
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
              <div
                key={startIndex + index}
                style={{ height: itemHeight, padding: "10px" }}
              >
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ optional loader */}
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      </div>
    </div>
  );
}

export default App;