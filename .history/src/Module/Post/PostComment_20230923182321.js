import { Button } from "Components/Button";
import Heading from "Components/Layout/Heading";
import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
const PostComment = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [show, setShow] = useState(false);
  const [iconRight, setIconRight] = useState(0);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(chosenEmoji);
  };
  const refIcon = useRef();
  let locationX = null;
  let locationY = null;
  useEffect(() => {
    locationX = refIcon.current.getBoundingClientRect().x;
    locationY = refIcon.current.getBoundingClientRect().y;
    setIconRight((window.innerWidth - refIcon.current.getBoundingClientRect().right));
  }, [refIcon]);
  return (
    <div className="mb-14">
      <Heading>Bình Luận</Heading>
      <div className="p-10 w-full relative">
        <div className={`fixed bottom-[-${locationY}px] right-[-${icon}px] `}>{show && <Picker onEmojiClick={onEmojiClick} />}</div>
        <textarea
          className="w-2/3 max-h-[150px] h-[150px] border rounded-lg border-slate-200 overflow-y-auto resize-none px-10 py-7"
          placeholder="Ý kiến của bạn"
        ></textarea>
        <div className="flex flex-col gap-y-5">
          <div className="w-2/3 p-12 flex items-center justify-between absolute bottom-3 left-3">
            <span>0/15</span>
            <div className="flex justify-center gap-x-6" ref={refIcon}>
              {!chosenEmoji && (
                <span onClick={() => setShow(!show)}>
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
              )}
              <button>Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
