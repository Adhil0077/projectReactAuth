
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../redux/userSlice'

function Home() {
  const user = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const veryfyUser = async () => {
      if (!cookies.jwt) {
        navigate('/login')
      } else {

        const { data } = await axios.post('http://localhost:4000', { user: user }, { withCredentials: true })
        if (!data.status) {
          removeCookie('jwt')
          navigate('/login')
        } else {
          if (!data.user) {
            navigate('/admin')
          } else {
            if (data.user.image) {
              dispatch(
                setUserDetails({
                  id: data.user._id,
                  email: data.user.email,
                  phone: data.user.phone,
                  image: data.user.image
                })
              )
            }

          }

        }
      }
    }
    veryfyUser()
  }, [cookies, navigate, removeCookie])


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#fff' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>HIVE</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img onClick={() => navigate('/profile')} style={{ width: '55px', height: '40px', objectFit: 'cover', borderRadius: '50%', cursor: 'pointer' }} src={user.image ? process.env.PUBLIC_URL + `/image/${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"} alt="" />
          <button onClick={() => {
            removeCookie('jwt')
            navigate('/login')
          }} style={{ marginLeft: '20px', padding: '10px 20px', borderRadius: '20px', background: '#000', color: '#fff', cursor: 'pointer', border: 'none' }}>Logout</button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 150px)', backgroundColor: 'rgb(232 232 232)' }}>
        <img style={{width:"500px"}} src="https://imgs.search.brave.com/GLCi7qSdcH1sVz0eTgISJDmHwP_cXNQXeJLpVbCoLj8/rs:fit:960:705:1/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/Ni8wMS8xNy80My9o/b3VzZS0xNDI5NDA5/Xzk2MF83MjAucG5n" alt="" srcset="" />
      </div>
    </>
  )
}

export default Home
