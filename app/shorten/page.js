"use client"
import React from 'react'
import { useState } from 'react'
const Shorten = () => {

  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [generated, setgenerated] = useState(false)
  return (
 
    <div>
      <h1>Generate Your Shorten URL</h1>
      <div>
        <input type='text' placeholder='Enter your URL' onChange={e =>{seturl(e.target.value)}}/>
        <input type='text' placeholder='Enter your Preffered Short URL text' onChange={e =>{setshorturl(e.target.value)}}/>
        <button>Generate</button>
      </div>
    </div>
  )
}

export default Shorten