import { useState } from "react"
import "../styles/style.css"
import axios from "axios";


export function WeatherApp(){
    const[city ,setCity]=useState("")
    const[icon, setIcon] = useState('')
    const[temperature, setTemperature] = useState('');
    const[wind, setWind]= useState('')
    const[humidity, setHumidity] = useState('')
    const[text,setText]=useState("");
    const [isVisible, setIsVisible] = useState(false);
  


    const weatherCheck=()=>{
        axios.get(`http://api.weatherapi.com/v1/current.json?key=49142aba3bdd46ec9c4150813253001&q=${city}`).then((response)=>{
            setIcon(response.data.current.condition.icon)
            setTemperature(response.data.current.temp_c +"°C")
            setWind(response.data.current.wind_kph +" km/hr")
            setHumidity(response.data.current.humidity)
            setText(response.data.current.condition.text)
            setIsVisible(true);
            // console.log(response);
        }).catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please check the city name.");
          });
    }

    return(
        <div>
            <div className="parent">
            <div className="cover">
                    
            </div>
            <div className="logoContainer">
            </div>
            <div className="weatherContainer">
                <label>Enter Your City :-</label>
                <input type="text" name="city" className="inputCity" placeholder="Hyderbad" onChange={(e)=>{
                    setCity(e.target.value)
                    setIsVisible(false)
                    }}/>
                <button className="getWeather" onClick={weatherCheck}>Weather</button>

            </div>
           
        </div>
        {
            isVisible&&(
                <div className="detailsContainer">
                <div className="iconimg">
                    <img src={icon} alt="iconWeather" height="100" width="100"/>
                    <p>{text}</p>
                </div>
                <div className="tempContainer">
                    <h3>Temperature</h3>
                    <p>{temperature}</p>
                </div>
                <div className="windContainer">
                    <h3>Wind Speed</h3>
                    <p>{wind}</p>
                </div>
                <div className="humidityContainer">
                    <h3>Himidity</h3>
                    <p>{humidity}</p>

                </div>
            </div>
            )
        }
       

        </div>
        
    )
}