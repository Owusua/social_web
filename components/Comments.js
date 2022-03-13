import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ThumbUpIcon } from '@heroicons/react/outline'

function Comments({ id }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
  }, [])

  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <div key={comment.id} className="mt-3 mb-4 flex pr-4">
          <div className="relative h-8 w-8 rounded-full border-4 border-pink-500">
            <Image
              className="cursor-pointer rounded-full bg-black hover:opacity-75"
              src={`https://avatars.dicebear.com/api/pixel-art/${comment.email}.svg`}
              layout="fill"
            />
          </div>
          <div className="flex flex-col pl-3">
            <h6 className="text-sm">{comment.email}</h6>
            <div className="mb-1 text-xs">{comment.body}</div>
            <div className="flex align-middle">
              <ThumbUpIcon className="h-4 w-4 text-blue-800" />{' '}
              <div
                className="ml-1 text-xs font-semibold"
                style={{ lineHeight: 'none' }}
              >
                2
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
