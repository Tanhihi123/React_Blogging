import Heading from 'Components/Layout/Heading';
import React from 'react';

const PostComment = () => {
  return (
    <div className='mb-14'>
      <Heading>Bình Luận</Heading>
      <div className="p-10 w-full">
        <textarea className="w-2/3 max-h-[150px] h-[150px] border rounded-lg border-slate-200 overflow-y-auto resize-none px-10 py-7" placeholder='Ý kiến của bạn'>
          .flex.items-center.justif
        </textarea>
      </div>
    </div>
  );
};

export default PostComment;