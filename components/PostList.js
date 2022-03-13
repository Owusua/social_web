import React, { useState } from 'react'
import Comments from './Comments'
import {
  ChatAlt2Icon,
  TrashIcon,
  PencilAltIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import Fade from 'react-reveal/Fade'

function PostList({
  id,
  title,
  body,
  onEdit,
  onDelete,
  commentsOnPost,
  userId,
}) {
  const [showComments, setShowComments] = useState(false)
  const editPost = () => {
    onEdit(id, title, body)
  }
  const deletePost = () => {
    onDelete(id, userId)
  }
  const commentsShow = () => {
    if (showComments === false) {
      setShowComments(true)
    } else {
      setShowComments(false)
    }
  }

  return (
    <li key={id} className="list-group-item p-4 hover:bg-slate-100">
      <div className="flex">
        <div className="relative mr-4 h-8 w-8 rounded-full border-4 border-pink-500">
          <Image
            className="cursor-pointer rounded-full bg-black hover:opacity-75"
            src={`https://avatars.dicebear.com/api/pixel-art/${title}.svg`}
            layout="fill"
          />
        </div>
        <div className="w-full">
          <div className="flex">
            <div className="flex flex-grow flex-col">
              <h5 className="text-sm">{title}</h5>
              <p className="text-xs">{body}</p>
            </div>
            <div className="flex justify-end">
              <button className="mr-2 text-blue-500" onClick={editPost}>
                <PencilAltIcon className="mr-1 h-5 w-5" />
              </button>
              <button className="text-rose-600" onClick={deletePost}>
                <TrashIcon className="ml-1 h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <button onClick={commentsShow} className="flex text-xs">
              <ChatAlt2Icon className="mr-1 h-5 w-5" /> Comments
            </button>
            {showComments ? (
              <Fade bottom>
                <Comments id={id} />
              </Fade>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  )
}

export default PostList
