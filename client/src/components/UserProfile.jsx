import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {

    const[ user, setUser] = useState(null)
    const navigate = useNavigate()


    useEffect(()=>{
        const data = localStorage.getItem('githubUser')
        if(data){
            setUser(JSON.parse(data))
        }
    },[])
  return (
    <div className="p-4">
      {user ? (
        <>
          <h1 className="text-xl font-bold">👋 Welcome, {user.login}!</h1>
          <img
            src={user.avatar_url}
            alt="GitHub Avatar"
            className="w-20 rounded-full mt-2"
          />
        </>
      ) : (
        <p className="text-gray-600">🔐 Please login with GitHub.</p>
      )}

      <button
  onClick={() => {
    localStorage.removeItem("githubUser");
    navigate("/", {replace: true})
  }}
  className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
>
  Logout
</button>
    </div>
  )
}

export default UserProfile