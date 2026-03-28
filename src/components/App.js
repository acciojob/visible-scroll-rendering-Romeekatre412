import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

function getItems() {
  const items = [];
  for (let index = 1; index <= 1000; index++) {
    items.push({
      id: index,
      description: `Description for item ${index}`,
    });
  }
  return items;
}
const offset = 15;
export default function InfiniteScroll() {
  const [allItems] = useState(() => getItems());
  const visibleItems = useRef(offset);
  const [itemsToShow, setItemsToShow] = useState(null);
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    setItemsToShow(() => allItems.slice(0, offset));
  }, [allItems]);

  function loadMoreItems() {
    const newItems = allItems.slice(visibleItems.current, visibleItems.current + offset);
    visibleItems.current = visibleItems.current + offset;
    setItemsToShow((prev) => [...prev, ...newItems]);
  }

  function onContainerScroll(event) {
    // console.log(event);
    const percentageScrolled =
      ((scrollContainerRef.current.clientHeight + scrollContainerRef.current.scrollTop) /
        scrollContainerRef.current.scrollHeight) *
      100;
    if (percentageScrolled > 90) {
      loadMoreItems();
    }
  }

  useEffect(() => {
    scrollContainerRef.current?.addEventListener("scroll", onContainerScroll);

    return () => {
      scrollContainerRef.current?.removeEventListener("scroll", onContainerScroll);
    };
  }, []);

  return (
    <ul
      ref={scrollContainerRef}
      style={{
        height: 500,
        width: 300,
        border: "1px solid",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {itemsToShow?.map((item) => (
        <li key={item.id}>{item.description}</li>
      ))}
    </ul>
  );
}