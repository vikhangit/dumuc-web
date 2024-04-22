import React, { useEffect, useRef, useState } from "react";

const rotations = [0, 0, 0]; // [seconds, minutes, hours]

export default function Clock(props) {
  const [run, setRun] = useState(false);
  const [start, setStart] = useState(true);
  const { width = 140, height = 140, setLoadData, ...svgProps } = props;
  const [speed, setPeed] = useState(1);
  useEffect(() => {
    const tr = setTimeout(() => {
      setRun(false);
    }, 1000);
    return () => clearTimeout(tr);
  });
  useEffect(() => {
    const tr = setTimeout(() => {
      setStart(false);
    }, 0);
    return () => clearTimeout(tr);
  });
  useEffect(() => {
    const tr = setTimeout(() => {
      setLoadData(false);
    }, 1000);
    return () => clearTimeout(tr);
  });
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div
        className="absolute -top-2 z-10"
        style={{
          background: "#fff",
          height: 150,
          width: 150,
          border: "10px solid",
          borderRadius: "50%",
          borderColor: !run
            ? "#F0F2F5 #F0F2F5 #1890FFD9 #1890FFD9"
            : "#1890FFD9 #F0F2F5 #1890FFD9 #1890FFD9",
          transform: !run && "rotate(75deg)",
          animation: run && `spin ${speed}s linear infinite`,
        }}
      ></div>
      <svg
        className="relative z-30"
        viewBox="0 0 100 100"
        //   color="#212121"
        //   fill="currentColor"
        width={width}
        height={height}
      >
        <g className="u-clock-marks -rotate-90 border border-gray-500 rounded-full">
          {[...Array(7)].map((_, idx) => (
            <line
              key={idx}
              stroke="#1890FF"
              opacity={0.7}
              strokeWidth={1.5}
              transform={`rotate(${30 * idx})`}
              strokeLinecap="round"
              x1="50"
              y1="5"
              x2="50"
              y2="10"
              className={idx % 2 !== 0 && "hidden"}
            />
          ))}
        </g>
        <line
          stroke="#1890FF"
          style={{
            animation: run && `spin ${speed}s linear infinite`,
            transform: !run && "rotate(30deg)",
          }}
          strokeLinecap="round"
          strokeWidth="2"
          x1="50"
          y1="25"
          x2="50"
          y2="50"
        />
        <circle
          cx="50"
          cy="50"
          r="3"
          stroke="#1890FF"
          strokeWidth="1"
          fill="white"
        />
      </svg>
      <div
        className="w-[140px] h-[70px] absolute top-1/2 flex justify-center translate-y-1 z-20"
        style={{
          borderLeft: "190px solid transparent",
          borderRight: "190px solid transparent",
          borderBottom: "65px solid white",
        }}
      ></div>
      <button
        onClick={() => {
          setRun(!run);
          setStart(!start);
          setLoadData(true);
        }}
        className="bottom-link text-[#1890FFD9] uppersae w-[100px] h-4 absolute top-1/2 translate-y-4 uppercase z-30"
      >
        Bắt đầu
      </button>
    </div>
  );
}
