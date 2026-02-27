"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface Props {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  beforeLabel = "시공 전",
  afterLabel = "시공 후",
}: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setPosition(pct);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setFromClientX(e.clientX);
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      setFromClientX(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [setFromClientX]);

  const startDrag = useCallback(
    (clientX: number) => {
      isDragging.current = true;
      setFromClientX(clientX);
    },
    [setFromClientX]
  );

  return (
    <div className="w-full">
      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] overflow-hidden select-none cursor-ew-resize border border-slate-200"
        onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX); }}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      >
        {/* After image (base — full width) */}
        <div className="absolute inset-0">
          <Image
            src={afterUrl}
            alt={afterLabel}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 800px"
          />
          <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-slate-900/80 text-white text-[10px] font-bold tracking-widest uppercase">
            {afterLabel}
          </span>
        </div>

        {/* Before image (clipped to left of slider) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeUrl}
            alt={beforeLabel}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 800px"
          />
          <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/85 text-slate-900 text-[10px] font-bold tracking-widest uppercase">
            {beforeLabel}
          </span>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 w-10 h-10 bg-white shadow-xl flex items-center justify-center"
          style={{
            left: `${position}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg
            className="w-4 h-4 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l-3 3 3 3M16 9l3 3-3 3"
            />
          </svg>
        </div>
      </div>

      {/* Hint text */}
      <p className="text-center text-[11px] text-slate-400 mt-2 select-none">
        ← 드래그하여 시공 전·후 비교 →
      </p>
    </div>
  );
}
