import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import Image from 'next/image'

function AddPost({ addPost }) {
  let handleSubmit = async (e) => {
    e.preventDefault()
    addPost(
      e.target.title.value,
      e.target.body.value,
      Math.floor(Math.random() * 100)
    )
    e.target.title.value = ''
    e.target.body.value = ''
  }

  return (
    <li className="list-group-item bg-gray-100 p-4">
      <div className="flex">
        <div className="relative mr-4 h-8 w-8 rounded-full border-4 border-pink-500">
          <Image
            className="cursor-pointer rounded-full bg-black hover:opacity-75"
            src={`https://avatars.dicebear.com/api/pixel-art/brith.svg`}
            layout="fill"
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            name="title"
            placeholder="Enter Title of post"
            className="form-control mb-3"
            style={{ fontSize: '0.875rem', fontWeight: 'bold' }}
          />
          <input
            type="text"
            name="body"
            placeholder="Write a post..."
            className="form-control mb-3"
            style={{ fontSize: '0.75rem' }}
          />
          <button type="submit" className="btn btn-outline-primary">
            {' '}
            <PlusIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </li>
  )
}

export default AddPost
