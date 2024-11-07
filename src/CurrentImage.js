import React from "react";
import { useState, useEffect} from "react";
import pic from './images/sun2.png';

const Clock = () => {
        var [date, setDate] = useState(new Date());
        useEffect( () => {
            var timer = setInterval( () => setDate(new Date()), 1000)

            return function cleanup() {
                clearInterval(timer)
            }
        });

    return (
        <div className = "clock">
            <label>Current Date: {date.toLocaleDateString()}</label> 
            <br></br>
            <label>Current Time : {date.toLocaleTimeString()}</label>
            <br></br>
            <img className="weather-pic" src={pic} alt={"Weather pic"}/>
            
            
            
        </div>
    )
};
    // const showTime = date.getHours()+ ":" + date.getMinutes()+":"+date.getSeconds();
    // return (
    //     <h2 align="center" className = "clock"> Current Time : {showTime}</h2>
    // )
    // // const hour = new Date().getHours();
    // // return (
    // //     { hour >=6 && hour <=18 
    // //         ? <Daytime/>
    // //             : <Nighttime/>
    // //         }
    // // );


export default Clock;