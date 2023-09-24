import Heading from 'Components/Layout/Heading';
import React from 'react';

const PostComment = () => {
  return (
    <div className='mb-14'>
      <Heading>Bình Luận</Heading>
      <div className="p-10 w-full h-[100px]">
        <input className="w-2/3 h-full border border-slate-100 rounded-lg"></input>
      </div>
    </div>
  );
};

export default PostComment;