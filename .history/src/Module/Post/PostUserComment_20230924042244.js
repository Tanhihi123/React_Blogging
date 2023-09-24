import React from "react";

const PostUserComment = () => {
  return (
    <div className="w-3/4 mb-14 flex items-center justify-center gap-x-3">
      <img
        src="https://source.unsplash.com/random"
        alt="avatar"
        className="rounded-full"
      />
      <div className="flex flex-1 rounded-lg bg-yellow-200 p-4 justify-between items-baseline">
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-x-3">
            <h3 className="font-semibold">Tan dep trai</h3>
            <span></span>
          </div>
        </div>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default PostUserComment;
