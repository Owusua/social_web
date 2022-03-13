import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddPost from '../components/AddPost'
import Swal from 'sweetalert2'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsOnPage, setPostsOnPage] = useState(10)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json))
  }, [])

  const addPost = async (title, body, userID) => {
    await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        id: 101,
        title: title,
        body: body,
        userId: userID,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id === 11) {
          data.id = posts.length + 1
        }
        setPosts((posts) => [data, ...posts])
      })
  }

  const onEdit = (id, title, body) => {
    let titleNew = ''
    let bodyNew = ''
    Swal.fire({
      title: 'Edit your post',
      html:
        `<textarea id="swal-input1" class="form-control mb-3">${title}</textarea>` +
        `<textarea id="swal-input2" class="form-control">${body}</textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Edit',
      customClass: {
        content: 'text-primary',
        confirmButton: 'bg-primary',
        cancelButton: 'bg-dark',
      },
      preConfirm: () => {
        console.log(
          'this is innerHTML',
          document.getElementById('swal-input1').value
        )
        titleNew = document.getElementById('swal-input1').value
        bodyNew = document.getElementById('swal-input2').value

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            id: id,
            title: titleNew,
            body: bodyNew,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const newData = [...posts]
            newData[data.id - 1] = { title: data.title, body: data.body }
            setPosts(newData)
          })
      },
    })
  }

  const onDelete = (id, userId) => {
    console.log(userId, id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      })
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
        setPosts(
          posts.filter((post) => {
            return post.id !== id
          })
        )
      }
    })
  }
  const indexOfLastPost = currentPage * postsOnPage
  const indexOfFirstPost = indexOfLastPost - postsOnPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-300 py-2 pt-4">
      <Head>
        <title>Social Page</title>
        {/* <link href="/static/social.css" rel="stylesheet" />*/}
      </Head>
      <div className="container mt-4">
        <div>
          <div
            className="roundedbg-white mb-4 bg-white p-4"
            style={{
              boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12)`,
            }}
          >
            <div
              className="text-lg font-semibold"
              style={{ textShadow: `#D0D0D0 0.1em 0.1em 0.15em` }}
            >
              The Social Page
            </div>
          </div>
          <div
            className="rounded"
            style={{ boxShadow: `0 3px 10px rgb(0 0 0 / 0.2)` }}
          >
            <ul className="list-group mb-4">
              <AddPost addPost={addPost} />
              {currentPosts.map((current) => (
                <PostList
                  id={current.id}
                  body={current.body}
                  title={current.title}
                  userId={current.userId}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Pagination
        postsOnPage={postsOnPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

export default Home
