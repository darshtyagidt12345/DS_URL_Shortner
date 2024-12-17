"use client"
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const page = () => {
  let router = useRouter()
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [Generated, setGenerated] = useState({gmessage:null,gsuccess:false,h:null})
  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "URL") {
      setUrl(value);
    } else if (name === "shortURL") { // Match the name here
      setShortUrl(value);
    }
  };
  
  const HandleOnSubmit = async(e) => {
    e.preventDefault()
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       "url": url,
       "shorturl": shortUrl
     });
     
     let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/generate`, { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.json();
     if(!response.ok){
      toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
     }else{
       
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      }
      setGenerated({gmessage:`${shortUrl}`,gsuccess:true,h:`${"http://localhost:3000/"}`})
      setShortUrl("")
     setUrl("")
     
  }  
  return (
    <div className='border border-white w-56 mx-auto '>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      <div className=' mt-10 shadow-xl h-56'>
        <form method='post' onSubmit={HandleOnSubmit}>
          <div className='container ml-3'>
            <label htmlFor="URL" className='font-bold'>URL:</label>
          </div>
          <div className='text-center'>
            <input
              type="text"
              className='mt-2 border border-black rounded '
              name='URL'
              onChange={HandleOnChange}
              value={url} />
          </div>
          <div className='container ml-3'>
            <label htmlFor="shortURL" className='font-bold'>Short URL:</label>
          </div>
          <div className='text-center'>
            <input
              type="text"
              className='mt-2 border border-black rounded '
              name='shortURL'
              onChange={HandleOnChange} 
              value={shortUrl}/>
          </div>
          <button type="submit" className='ml-16 mt-10 border border-black hover:bg-pink-500 hover:border-pink-500 hover:text-white rounded-md'>Short URL</button>
        </form>
      </div>
        {Generated.gsuccess&&<div className='font-bold'><section>Short URL</section><section>{Generated.h}{Generated.gmessage}</section></div>}
    </div>
  )
}

export default page
