import Heading from 'Components/Layout/Heading';
import React from 'react';

const PostComment = () => {
  return (
    <div className='mb-14'>
      <Heading>Bình Luận</Heading>
      <div className="p-10 w-full">
        <input className="w-2/3 max-h-[100px]  border rounded-lg border-slate-200 overflow-y-hidden"></input>
      </div>
    </div>
  );
};

export default PostComment;