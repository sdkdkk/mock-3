import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Login = () => {
  const history = useNavigate()

  const [inpval, setInpval] = useState({
    email: '',
    password: '',
  })

  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('https://632eb541b7314fc02f48d2d2.mockapi.io/users')
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
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
    if (inpval.email === '') {
      alert('email field is requred', {
        position: 'top-center',
      })
    } else if (!inpval.email.includes('@')) {
      alert('plz enter valid email addres', {
        position: 'top-center',
      })
    } else if (!inpval.email.includes('.')) {
      alert('plz enter valid email addres', {
        position: 'top-center',
      })
    } else if (inpval.password === '') {
      alert('plz enter password', {
        position: 'top-center',
      })
    } else {
      if (inpval.email !== '' && inpval.password !== '') {
        data.map((item) => {
          if (inpval.email === item.email && inpval.password === item.password) {
            history('/dashboard')
            localStorage.setItem('email', inpval.email)
            localStorage.setItem('password', inpval.password)
          } else {
            alert('plz enter valid email and password')
          }
        })
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        name="email"
                        onChange={getdata}
                        placeholder="Enter email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
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
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" onClick={addData} className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
