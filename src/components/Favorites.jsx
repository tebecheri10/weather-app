import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'


const Favorites = ({ favoriteList, setFavoriteList, updated, setUpdated }) => {

    const [lastUpdate, setLastUpdate] = useState("")

    const handleUpdateFavorites = () => {
        if (Object.keys(favoriteList).length > 0) {
            const cityToUpdate = favoriteList.map(city => city.location.name)
            cityToUpdate.forEach(name => {
                const searchCity = async () => {
                    const cityName = name.toLowerCase()
                    try {
                        const url = `https://api.weatherapi.com/v1/current.json?key=374f5faf0715432694522415221206&q=${cityName}&aqi=no`
                        const result = await fetch(url)
                        const resultData = await result.json()
                        const updatedList = await favoriteList.map(f => f.location.name === resultData.location.name ? resultData : f)

                        if (updatedList) {
                            setFavoriteList(updatedList)
                            console.log(favoriteList)
                        }
                    } catch (error) {
                        console.log("Update favorites error: ", error)
                    }
                }
                searchCity()
                const event = new Date();
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                setLastUpdate(event.toLocaleDateString(undefined, options));

            })
        }

    }

    const handleDelete = (name)=>{
         const listAfterDeleted = favoriteList.filter(item=>item.location.name !== name)
         setFavoriteList(listAfterDeleted)
    }


    const FavoritesContainer = styled.div`
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  `
    const ResultContainer = styled.div`
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`
    const Result = styled.div`
   width: 100%;
   max-width: 320px;
   height: 130px;
   max-height: 320px;
   display: flex;
   flex-direction: column;
   padding-bottom: 30px;
   padding-top: 10px;
   margin-top: 30px;
   border-radius: 6px;
   text-align: center;
   background: rgba(255, 255, 255, 0.11);
   border-radius: 16px;
   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
   backdrop-filter: blur(5px);
   -webkit-backdrop-filter: blur(5px);
   border: 1px solid rgba(255, 255, 255, 0.3);
   @media (max-width: 690px) {
   max-height: 340px;         
   }
   
`
    const CityName = styled.h2`
   font-size: 24px;
   text-decoration: underline #5421e0;
   margin: 20px;
   margin: 0;
   `

    const DataRow = styled.div`
   width: 100%;
   height: 80px;
   display: flex;
   justify-content: space-around;
   margin: 10px 0;
 `
    const IconRow = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  p{
      font-size: 24px;
    
  }
`
    const DataContent = styled.div`
       display: flex;
       flex-direction: column;
       
`
    const Data = styled.p`
   font-size: 20px;
   margin: 10px;
   line-height: 10px;
   font-weight: 700;
   @media (max-width: 370px){
        font-size: 16px;
      }
 `
    const DeleteButton = styled.button`
      font-size: 14px;
    width: 30px;
    height: 30px;
    line-height: 14px;
    border-radius: 50%;
    background-color: transparent;
    color: #fff;
    position: absolute;
    border: none;
    right: 8px;
    top: 8px;
    border: 1px solid #5421e0;
   &:hover{
   background-color: #460ce5;
   cursor: pointer;
 }
   `
    const UpdateButton = styled.input`
   width: 100%;
   height: 40px;
   max-width: 200px;
   min-width: 250px;
   margin-top: 20px;
   background-color: #5421e0;
   border: none;
   border-radius: 6px;
   font-size: 20px;
   font-weight: 400;
   color: #fff;
   &:hover{
     background-color: #460ce5;
     cursor: pointer;
   }

`
    console.log(lastUpdate.toString())
    return (
        <FavoritesContainer>
            <UpdateButton
                type="submit"
                value="Update Favorites"
                onClick={handleUpdateFavorites}
            />
            <ResultContainer>
                {favoriteList.map(data => {
                    return (
                        <>
                            <Result key={data.location.tz_id}>
                                <DeleteButton onClick={()=>handleDelete(data.location.name)}>X</DeleteButton>
                                <CityName>{data.location.name}</CityName>
                                <IconRow>
                                    <DataContent>
                                        <img src={data.current.condition.icon} alt="" />
                                    </DataContent>
                                    <DataContent>
                                        <Data>{data.current.condition.text}</Data>
                                    </DataContent>
                                </IconRow>
                                <DataRow>
                                    <DataContent>
                                        <Data>Temperature</Data>
                                        <Data>{data.current.temp_c}°</Data>
                                    </DataContent>

                                    <DataContent>
                                        <Data>Feels Like</Data>
                                        <Data>{data.current.feelslike_c}°</Data>
                                    </DataContent>
                                </DataRow>
                            </Result>
                        </>
                    )
                })}
            </ResultContainer>
        </FavoritesContainer>
    )
}

export default Favorites