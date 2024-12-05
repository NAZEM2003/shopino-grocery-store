import CommentBox from '@/components/templates/p-user/comments/CommentBox';
import { authUser, getUserComments } from '@/utils/actions';
import React from 'react';

const Comments = async () => {
    const user = await authUser();
    const comments = await getUserComments(user._id);
   


    return (
        <main className='p-3'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Comments</h1>
            {
                comments.length ?
                    <div className='mt-10'>
                        {
                            comments.map((comment, index) => <CommentBox key={comment._id} comment={comment} index={index} />)
                        }
                    </div>
                    : <h1 className='text-center mx-auto mt-36 w-max text-3xl text-zinc-800'>There is no Comment!</h1>
            }
        </main>
    );
}

export default Comments;
