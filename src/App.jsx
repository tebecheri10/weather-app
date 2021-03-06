import React,{ useState, useEffect } from 'react'
import Form from './components/Form'
import Result from './components/Result'
import Favorites from './components/Favorites'
import styled from '@emotion/styled'
import './App.css'

function App() {

  const [city , setCity] = useState("")
  const [cityData, setCityData] = useState([])
  const [favorite, setFavorite] = useState([])
  const [favoriteList, setFavoriteList] = useState(
    localStorage.getItem("favoriteList") ? JSON.parse(localStorage.getItem("favoriteList")): []
  )
  const [updated, setUpdated] = useState([])
  const [spinner, setSpinner] = useState(false)


useEffect(()=>{
  if( Object.keys(favorite).length > 1){
    setFavoriteList([...favoriteList, favorite])
  }
},[favorite])

useEffect(()=>{
  localStorage.setItem("favoriteList",JSON.stringify( favoriteList));
},[favoriteList])

  useEffect(()=>{
     
      const searchCity = async ()=>{
        setSpinner(true)
        try {
          const url = `https://api.weatherapi.com/v1/current.json?key=374f5faf0715432694522415221206&q=${city}&aqi=no`
          const result = await fetch(url)
          const resultData = await result.json()
          setCityData([resultData])
        } catch (error) {  
        } 
        setSpinner(false)
      }
      
    if(city.length > 0 ){
      searchCity()
      setCity("")
    }
   
  },[city])
 

  const Container = styled.div`
    width: 80%;
    margin: 10px auto 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
    const Title = styled.h1`
    text-align: center;
    font-size: 34px;
    text-decoration: underline #5421e0;
    margin-top: 15px;
  `;
    const NoResult = styled.h2`
    font-size: 34px;
    text-align: center;
    `

  return (
    <Container className="App">
        <Title> Weather App</Title>
        <Form
        setCity={setCity}
        />
        {!cityData.length > 0 ?(
          <NoResult>No result yet...</NoResult>   
        ):cityData[0].error ? (<NoResult>You must insert a valid input</NoResult>):(
          <Result
          cityData={cityData}
          setFavorite={setFavorite}
          spinner={ spinner }
          />
        )
       }

       <Favorites
       favoriteList={favoriteList}
       setFavoriteList={setFavoriteList}
       updated={updated}
       setUpdated={ setUpdated}
       />
       

    </Container>
  )
}

export default App
