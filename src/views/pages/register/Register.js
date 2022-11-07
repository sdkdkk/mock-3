import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const history = useNavigate()

  const [inpval, setInpval] = useState({
    name: '',
    email: '',
    date: '',
    password: '',
  })

  // const [data, setData] = useState([])
  // console.log(inpval)
  // console.log(setData)

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      }
    })
  }

  const addData = (e) => {
    e.preventDefault()

    const { name, email, password } = inpval

    if (name === '') {
      toast.error(' name field is requred!', {
        position: 'top-center',
      })
    } else if (email === '') {
      toast.error('email field is requred', {
        position: 'top-center',
      })
    } else if (email.length < 5) {
      toast.error('email field is requred', {
        position: 'top-center',
      })
    } else if (!email.includes('@')) {
      toast.error('plz enter valid email addres', {
        position: 'top-center',
      })
    } else if (!email.includes('.')) {
      alert('plz enter valid email addres', {
        position: 'top-center',
      })
    } else if (password === '') {
      toast.error('password field is requred', {
        position: 'top-center',
      })
    } else if (password.length < 5) {
      toast.error('password length greater five', {
        position: 'top-center',
      })
    } else {
      axios.post('https://632eb541b7314fc02f48d2d2.mockapi.io/users', {
        name: name,
        email: email,
        password: password,
      })
      console.log('data added succesfully')
      history('/login')
      // localStorage.setItem('useryoutube', JSON.stringify([...data, inpval]))
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="name"
                      onChange={getdata}
                      placeholder="Enter Your Name"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      name="email"
                      onChange={getdata}
                      placeholder="Enter email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      onChange={getdata}
                      placeholder="Password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={addData}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
