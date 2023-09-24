import Heading from 'Components/Layout/Heading';
import React from 'react';

const PostComment = () => {
  return (
    <div className='mb-14'>
      <Heading>Bình Luận</Heading>
      <div className="p-10 w-full">
        <textarea className="w-2/3 h-[100px] border border-slate-200 overflow-y-hidden"></textarea>
      </div>
    </div>
  );
};

export default PostComment;