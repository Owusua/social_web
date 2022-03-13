import React from 'react'

function Pagination({ postsOnPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsOnPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className={
                currentPage == number ? 'page-link active' : 'page-link'
              }
            >
              {number}
            </a>
            <style jsx>{`
              a.page-link.active {
                background-color: #d0d0d0;
              }
            `}</style>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
