'use client';
import React, { useState } from 'react'

const buttons = () => {
    const [number , setnumber] = useState(0);
    const increment = () =>{
        setnumber();
    }
  return (
    <div>
      <button onClick={increment}>{number}</button>
    </div>
  )
}

export default buttons
