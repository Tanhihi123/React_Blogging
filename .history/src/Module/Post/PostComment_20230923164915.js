import { Button } from "Components/Button";
import Heading from "Components/Layout/Heading";
import React, { useState } from "react";
import Picker from "emoji-picker-react";
const PostComment = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(object);
  };
  return (
    <div className="mb-14">
      <Heading>Bình Luận</Heading>
      <div className="p-10 w-full relative">
        <textarea
          className="w-2/3 max-h-[150px] h-[150px] border rounded-lg border-slate-200 overflow-y-auto resize-none px-10 py-7"
          placeholder="Ý kiến của bạn"
        ></textarea>
        <div className="w-2/3 p-12 flex items-center justify-between absolute bottom-3 left-3">
          <span>0/15</span>
          <div className="flex justify-center gap-x-3">
            {chosenEmoji ? (
              <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
              <span>No emoji Chosen</span>
            )}
            <Picker onEmojiClick={onEmojiClick} />
            <button>Gửi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
