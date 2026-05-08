"use client";

import React, { useState, useEffect, useRef, useMemo, ReactNode } from "react";

interface MasonryProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  columnWidth?: number;
  gap?: number;
  predictHeight: (item: T, columnWidth: number) => number;
  className?: string;
  overscan?: number;
}

export function Masonry<T extends { id: string | number }>({
  items,
  renderItem,
  columnWidth = 300,
  gap = 32,
  predictHeight,
  className = "",
  overscan = 500,
}: MasonryProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Update container width on resize
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
        setViewportHeight(window.innerHeight);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const layout = useMemo(() => {
    if (containerWidth === 0) return { positions: [], totalHeight: 0, columnCount: 0, actualColumnWidth: 0 };

    // Strategic Column Calculation:
    // If width < 640px (typical mobile), use 2 columns as requested for compact layout.
    // Otherwise, calculate based on columnWidth.
    let columnCount: number;
    let currentGap = gap;
    if (containerWidth < 640) {
      columnCount = 2;
      currentGap = Math.min(gap, 16); // More compact on mobile
    } else {
      columnCount = Math.max(1, Math.floor((containerWidth + gap) / (columnWidth + gap)));
    }
    
    const actualColumnWidth = (containerWidth - (columnCount - 1) * currentGap) / columnCount;
    const columnHeights = new Array(columnCount).fill(0);

    const positions = items.map((item, index) => {
      // Find shortest column
      let shortestColumnIndex = 0;
      let minHeight = columnHeights[0];

      for (let i = 1; i < columnHeights.length; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i];
          shortestColumnIndex = i;
        }
      }

      const top = minHeight;
      const left = shortestColumnIndex * (actualColumnWidth + currentGap);
      const height = predictHeight(item, actualColumnWidth);

      columnHeights[shortestColumnIndex] += height + currentGap;

      return {
        item,
        index,
        top,
        left,
        height,
        width: actualColumnWidth,
      };
    });

    const totalHeight = Math.max(...columnHeights);

    return { positions, totalHeight, columnCount, actualColumnWidth };
  }, [items, containerWidth, columnWidth, gap, predictHeight]);

  const visibleItems = useMemo(() => {
    if (!containerRef.current) return [];
    
    const containerTop = containerRef.current.offsetTop;
    const relativeScrollTop = Math.max(0, scrollTop - containerTop);
    
    return layout.positions.filter((pos) => {
      const isVisible = 
        pos.top + pos.height > relativeScrollTop - overscan &&
        pos.top < relativeScrollTop + viewportHeight + overscan;
      return isVisible;
    });
  }, [layout.positions, scrollTop, viewportHeight, overscan]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ 
        position: "relative", 
        height: layout.totalHeight,
        width: "100%",
        minHeight: "400px" // Placeholder during initial load
      }}
    >
      {visibleItems.map((pos) => (
        <div
          key={pos.item.id}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: pos.width,
            height: pos.height,
            transform: `translate3d(${pos.left}px, ${pos.top}px, 0)`,
            willChange: "transform",
            transition: containerWidth === 0 ? "none" : "transform 0.4s cubic-bezier(0.2, 0, 0, 1)",
          }}
        >
          {renderItem(pos.item, pos.index)}
        </div>
      ))}
    </div>
  );
}
