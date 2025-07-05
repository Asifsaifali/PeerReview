import React from 'react'

const GithubLogin = () => {

    const handleGitHubLogin = async()=>{
    try {
      const clientId = "Ov23lihYxXlgo0oCXUWo"
      const redirectUri = 'http://localhost:5173/callback'
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;
      console.log("Inide function");
      

    } catch (error) {
      
    }
  }
  return (
    <>
     <button
  onClick={handleGitHubLogin}
  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
>
  Login with GitHub
</button>
    </>
  )
}

export default GithubLogin