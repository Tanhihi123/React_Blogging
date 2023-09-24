import React from "react";

const PostUserComment = ({avatar ,fullname, comment }) => {
  return (
    <div className="w-3/4 mb-14 flex justify-center gap-x-3 items-baseline">
      <img
        src={avatar}
        alt="avatar"
        className="rounded-full w-10 h-10 select-none"
      />
      <div className="flex flex-1 rounded-lg bg-yellow-100 p-4 justify-between items-baseline select-none">
        <div className="flex flex-col text-base gap-y-4">
          <div className="flex justify-center items-center gap-x-3">
            <h3 className="font-semibold">{fullname}</h3>
            <span className="text-slate-400">9 giờ trước</span>
          </div>
          <p className="ml-3">{comment}</p>
        </div>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
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
