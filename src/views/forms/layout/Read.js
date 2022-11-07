import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

import { Link } from 'react-router-dom'

function App() {
  const [data, setdata] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  // const [tabledark, setTableDark] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  function getdata() {
    axios
      .get('https://632eb541b7314fc02f48d2d2.mockapi.io/crud-utube')
      .then((res) => {
        console.log(res.data)
        setdata(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function handleDelet(id) {
    axios.delete(`https://632eb541b7314fc02f48d2d2.mockapi.io/crud-utube/${id}`).then(() => {
      getdata()
    })
  }
  const SetToLocalStorage = (id, name, email) => {
    localStorage.setItem('id', id)
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
  }
  useEffect(() => {
    getdata()
  }, [data])

  const usersPerPage = 10
  const pagesVisited = pageNumber * usersPerPage

  const displayUsers = data.slice(pagesVisited, pagesVisited + usersPerPage)

  const pageCount = Math.ceil(data.length / usersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="search..."
        className="form-control"
        style={{ marginTop: 50, marginBottom: 20, width: '40%' }}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delet</th>
          </tr>
        </thead>
        {displayUsers
          .filter((val) => {
            if (searchTerm === '') {
              return val
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.email.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val
            }
          })
          .map((data) => {
            return (
              <>
                <tbody>
                  <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>
                      <Link to="/forms/update">
                        <button
                          className="btn-success"
                          onClick={() => SetToLocalStorage(data.id, data.name, data.email)}
                        >
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button className="btn-danger" onClick={() => handleDelet(data.id)}>
                        Delet
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            )
          })}
      </table>
      <div style={{ display: 'flex' }}>
        <Link to="/forms/layout">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>

      <ReactPaginate
        className="pagination justify-content-end "
        style={{ display: 'flex', ListStyle: 'none', justifyContent: 'center' }}
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </div>
  )
}

export default App
