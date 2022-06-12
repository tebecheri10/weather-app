import React from 'react'
import styled from '@emotion/styled'

const Result = ({ cityData }) => {

    const Result = styled.div`
        width: 100%;
        max-width: 500px;
        height: auto;
        display: flex;
        flex-direction: column;
        padding-bottom: 20px;
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
     `
    const CityName = styled.h2`
        font-size: 34px;
        text-decoration: underline #21e05e;
        margin: 20px;
        padding: 10px;
        margin: 0;
        `

    const DataRow = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-around;
      `
       const IconRow = styled.div`
       width: 100%;
       display: flex;
       justify-content: center;
       align-items: center;
       p{
        font-size: 34px;
       }
     `
    const DataContent = styled.div`
            display: flex;
            flex-direction: column;
            margin-top: 10px;
     `
    const Data = styled.p`
        font-size: 24px;
        margin: 10px;
        line-height: 10px;
        font-weight: 700;
      `
      
    return (
        <>
                
                {cityData.map(data => {
                    return (
                        <>
                            <Result key={data.location.tz_id}>
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
                                  <Data>Humidity</Data>
                                      <Data>{data.current.humidity}%</Data>
                                  </DataContent>
                              </DataRow>
                              <DataRow>
                                  <DataContent>
                                      <Data>Feels Like</Data>
                                      <Data>{data.current.feelslike_c}°</Data>
                                  </DataContent>
                                      
                                  <DataContent>
                                  <Data>Wind</Data>
                                      <Data>{data.current.wind_kph} Kpm</Data>
                                  </DataContent>
                              </DataRow>  
                              </Result>  
                        </>
                    )
                })}
         
        </>

    )
}

export default Result