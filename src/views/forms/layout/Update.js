import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Update = () => {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    setId(localStorage.getItem('id'))
    setName(localStorage.getItem('name'))
    setEmail(localStorage.getItem('email'))
  }, [])

  const HandleUpdate = (e) => {
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
        .put(`https://632eb541b7314fc02f48d2d2.mockapi.io/crud-utube/${id}`, {
          name: name,
          email: email,
        })
        .then(() => {
          navigate('/forms/read')
        })
    }
  }
  return (
    <>
      <h2>Update form</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        {name}
        {email}
        <button type="submit" onClick={HandleUpdate} className="btn btn-primary mx-2">
          Update
        </button>
        <Link to="/forms/read">
          <button className="btn btn-secondary mx-2">Back</button>
        </Link>
      </form>
    </>
  )
}

export default Update
