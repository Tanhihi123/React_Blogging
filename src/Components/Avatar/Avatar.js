"use client";
import React, { useState, useCallback } from "react";

function throttle(func, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const Avatar = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    throttle((e) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 4;
      const rotateY = (centerX - x) / 4;

      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };
  return (
    <>
      <div
        className="card relative h-[400px] w-[300px] rounded-xl bg-white transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        <div className="group relative flex h-full w-full select-none items-center justify-center rounded-xl border-0 border-neutral-900 bg-gradient-to-tl from-lime-300 via-teal-600 to-teal-400 text-sm font-light text-slate-300">
          <div className="duration-600 absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-b from-[#6982e3] to-[#0ced14] opacity-0 blur transition group-hover:opacity-75" />
          <img src="/Tansama.png" alt="" className="rounded-xl" />
        </div>
      </div>
    </>
  );
};

export default Avatar;
