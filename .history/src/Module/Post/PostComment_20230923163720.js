import { Button } from "Components/Button";
import Heading from "Components/Layout/Heading";
import React from "react";

const PostComment = () => {
  return (
    <div className="mb-14">
      <Heading>Bình Luận</Heading>
      <div className="p-10 w-full">
        <textarea
          className="w-2/3 max-h-[150px] h-[150px] border rounded-lg border-slate-200 overflow-y-auto resize-none px-10 py-7 relative"
          placeholder="Ý kiến của bạn"
        ></textarea>
        <div className="flex items-center justify-between absolute bottom-0 left-0">
          <span>0/15</span>
          <div className="flex justify-center gap-x-3">
            <span>Cười</span>
            <Button>Gửi</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
