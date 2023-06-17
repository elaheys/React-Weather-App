import React, { useState } from 'react';
import axios from 'axios';

//style
import styles from './Main.module.css';


const Main = () => {

    const dateBuilder = (d) =>{
        let months = ['January','February','March','April','May','June','July','August','September'
    ,'October','November','December'];
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return`${day} ${date} ${month} ${year}`
    }

    const deg = '°C';
    
    const [inputVal,setInputVal] = useState('');
    const [data,setData] = useState({});
    const [error,setError] = useState('');
    // console.log(data)
    
    
    const apiKey = 'c9d7e26cc99593470f0e5a8b9b768fa9';
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    const getApi = async() => {
        const response =await axios.get(URL);
        return response.data
    }

    const changeHandler = (event) => {
        setInputVal(event.target.value);
    }
    const submitHandler = async(event) => {
        event.preventDefault();
        if(inputVal){
            setData(await getApi());
            setInputVal('');
            setError('')
        }else {
            setError('Enter Valid City !');
        }
    }
    return (
       
    <div className={styles.topContainer }>
   <section className={styles.topBanner}>
    <div className={styles.container}>
      <h1 className={styles.heading}>Weather App</h1>
       <form >
        <input onChange={changeHandler} value={inputVal} type="text" placeholder="Search for a city" autoFocus/>
        <button type="submit" onClick={submitHandler}>SUBMIT</button>
       </form>
    </div>
   </section>
   <div>
        <span className={styles.error}>{error}</span>
   </div>
   <div>
        <div className={data.name && data.sys?.country ? styles.nameCountry : null}>{data.name} {data.sys?.country}</div> 
        <div className={styles.date}>{data.name} {data.sys?.country && dateBuilder(new Date())}</div>
        <div className={data?.main?.temp.toFixed() && styles.temp}>{data?.main?.temp.toFixed()}{data?.main?.temp.toFixed() && deg}</div>
        <div className={styles.description}>{data.weather?.[0].description}</div>
        
   </div>
   
</div>
    );
};

export default Main;