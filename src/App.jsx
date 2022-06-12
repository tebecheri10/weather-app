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
  const [favoriteList, setFavoriteList] = useState([])
  const [updated, setUpdated] = useState([])

useEffect(()=>{
  if( Object.keys(favorite).length > 1 &&  Object.keys(updated).length === 0){
    setFavoriteList([...favoriteList, favorite])
  }
  else{
    setUpdated(favorite)
    console.log(updated)
  }


},[favorite])

  useEffect(()=>{
      const searchCity = async ()=>{
        try {
          const url = `http://api.weatherapi.com/v1/current.json?key=374f5faf0715432694522415221206&q=${city}&aqi=no`
          const result = await fetch(url)
          const resultData = await result.json()
          setCityData([resultData])
        } catch (error) {  
        } 
      }
    if(city.length > 0 ){
      searchCity()
      setCity("")
    }
   
  },[city])
 

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
    const Title = styled.h1`
    text-align: center;
    font-size: 34px;
    text-decoration: underline #5421e0;
    margin-top: 50px;
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
