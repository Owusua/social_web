import React from 'react'

function EditPost({ editID }) {
  let handleSubmit = async (e) => {
    e.preventDefault()
    //postAdd(e.target.title.value, e.target.body.value)
    fetch(`https://jsonplaceholder.typicode.com/posts/${editID}`, {
      method: 'PUT',
      body: JSON.stringify({
        addedPosts,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      //
      .then((json) => setAddedPosts(json.addedPosts))
      .then((json) => console.log(addedPosts))
  }

  return <button className="btn btn-outline-info btn-sm mr-2">Edit</button>
}

export default EditPost
