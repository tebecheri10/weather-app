import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import '../styles/form.css'

const Form = ({setCity}) => {

    const [search , setSearch] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setCity(search)
    }

    const Button = styled.input`
      width: 100%;
      height: 40px;
      max-width: 500px;
      margin-top: 20px;
      background-color: #5421e0;
      border: none;
      border-radius: 6px;
      font-size: 24px;
      font-weight: 400;
      color: #fff;
      &:hover{
        background-color: #460ce5;
        cursor: pointer;
      }

  `
    return (
        <form onSubmit={handleSubmit}>
            <input 
              id='nombre'
              type="text"
              placeholder='Enter the city name'
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              />
            <Button
                type="submit"
                value="Search"
            />
        </form>
    )
}

export default Form