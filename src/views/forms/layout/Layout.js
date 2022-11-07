import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Layout = () => {
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const history = useNavigate()

  const header = { 'Access-Control-Allow-Origin': '*' }

  const HandleSubmit = (e) => {
    e.preventDefault()
    if (name === '') {
      alert(' name field is requred!', {
        position: 'top-center',
      })
    } else if (email === '') {
      alert('email field is requred', {
        position: 'top-center',
      })
    } else if (!email.includes('@')) {
      alert('plz enter valid email addres', {
        position: 'top-center',
      })
    } else if (!email.includes('.')) {
      alert('plz enter valid email addres', {
        position: 'top-center',
      })
    } else {
      axios
        .post('https://632eb541b7314fc02f48d2d2.mockapi.io/crud-utube', {
          name: name,
          email: email,
          header,
        })
        // history("/read")
        .then(() => {
          history('/forms/read')
        })
    }
  }
  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Create form</h2>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>

        <button type="submit" onClick={HandleSubmit} className="btn btn-primary">
          Submit
        </button>
        <Link to="/forms/read">
          <button className="btn btn-primary mx-2">Show Data</button>
        </Link>
      </form>
    </>
  )
}

export default Layout
