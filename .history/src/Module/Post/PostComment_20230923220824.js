import { Button } from "Components/Button";
import Heading from "Components/Layout/Heading";
import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
const PostComment = () => {
  // const [inputStr, setInputString] = useState("");
  const [word, setWord] = useState("");
  const [show, setShow] = useState(false);
  const addEmoji = (e) => {
    setWord(word => word + e.emoji.toString());
    console.log(e.emoji.toString());
    console.log(word);
  }
  const handleOnChange = (e) => {
    if (e.target.value.length <= 150) setWord(e.target.value);
  };
  return (
    <div className="mb-14 ">
      <Heading>Bình Luận</Heading>
      <div className="px-5 py-3 w-3/4 relative border rounded-lg border-slate-200 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <textarea
          className="w-full max-h-[150px] h-[150px]  overflow-y-auto resize-none px-10 py-7 z-50"
          placeholder="Ý kiến của bạn"
          onChange={handleOnChange}
          maxLength={150}
          value={}
        ></textarea>
        <div className="w-full px-5 flex items-center justify-between absolute bottom-3 left-3">
          <span>{word?.length}/150</span>
          <div className="flex justify-center gap-x-6 relative">
            <div className="absolute right-0 bottom-14 translate-x-3/4">
              {show && <Picker onEmojiClick={addEmoji}/>}
            </div>
            <div className="flex gap-x-10">
                <span
                  className="flex flex-col justify-center h-full"
                  onClick={() => setShow(!show)}
                >
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
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                </span>
              <button className="py-2 px-5 rounded-xl bg-green-300 text-center">
                <span>Gửi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
