import { useEffect, useState } from 'react'
import {City} from 'country-state-city'
import humidity from './assets/humidity.png'
import wind from './assets/wind.png'
import clear from './assets/clear.png'

import { useAppDispatch, useAppSelector } from './app/hooks'
import { fetchWeather } from './features/weatherSlice'

type CityType = {
  name: string,
  countryCode: string,
  stateCode: string,
  latitude: string,
  longitude: string
}

const cities = City.getAllCities().filter(city => city.countryCode === "IN");


function App() {

  const dispatch = useAppDispatch();
  const {loading, weather, error} = useAppSelector(state => state.weather)
  console.log(weather)
  const [filteredCities, setFilteredCities] = useState<any>([])
  const [value, setValue] = useState("")
  // const [error, setError] = useState("")

  // const [weather, setWeather] = useState({
  //                                           temp: 0,
  //                                           city: "",
  //                                           humidity: 0,
  //                                           wind: 0,
  //                                           icon: ""
  //                                         })



  // const fetchCurrentCityWeather = async (city:string=weather.city) => {
  //   setError("")
  //   const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
       
  //   if(!res.ok) setError("Enter a valid city name")
  //   else{
  //     const data = await res.json()
  //     console.log(data)
  //     setWeather({
  //       temp: data.main.temp,
  //       city: data.name,
  //       humidity: data.main.humidity,
  //       wind: data.wind.speed,
  //       icon: getImagePath(data.weather[0].main)
  //     })
  //   }
    
  // }

  const handleSuggestions = (city:string) => {
    setValue(city)
    dispatch(fetchWeather(city))
    setFilteredCities([])
  }


  useEffect(() => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const {latitude, longitude} = position.coords
    //   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
    //   .then(res => res.json())
    //   .then(data => {
    //     // console.log(data)
    //     setWeather({
    //       temp: data.main.temp,
    //       city: data.name,
    //       humidity: data.main.humidity,
    //       wind: data.wind.speed,
    //       icon: getImagePath(data.weather[0].main)
    //     })
    //   })
    // }
    // )

    dispatch(fetchWeather("Guwahati"))
    // fetchCurrentCityWeather()
  },[])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() !== ''){
      dispatch(fetchWeather(value))
      setFilteredCities([])
    }
  }
  // useEffect(() => {
  //   if(value.length > 0){
  //     const filtered = cities.filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
  //     // console.log("Suggestions:", filtered)
  //     setFilteredCities(filtered)
  //   }else{
  //     setFilteredCities([])
  //   }
  // },[value, cities])
  const handleFilteredCities = () => {
    if(value.length > 0){
      const filtered = cities.filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
      // console.log("Suggestions:", filtered)
      setFilteredCities(filtered)
    }else{
      setFilteredCities([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    handleFilteredCities()
  }

  const handleBlur = () => {
    setTimeout(() => {
      setFilteredCities([])
    }, 300)
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[480px] h-[500px] bg-gradient-to-br from-sky-500 to-indigo-500 rounded-md p-4 overflow-hidden">
        <h1 className="text-3xl font-semibold text-white text-center py-4">Weather App</h1>
        {/* SEARCH FIELD */}
        <div className="flex gap-2 px-4">
          <div className='flex flex-col relative w-full'>
          <input type="text"
                 value={value}
                 onChange={handleChange}
                //  onFocus={handleFilteredCities}
                 onBlur={handleBlur}
                 onKeyDown={handleKeyPress}
                 placeholder="Enter any city name"
                 className="w-full rounded-md p-2 px-4 bg-gray-100 focus:outline-slate-500 font-semibold" />
                 
                 {filteredCities.length > 0 && (
                  <ul
                  className="absolute h-28 px-4 opacity-80 overflow-y-scroll overflow-x-hidden z-10 bg-white border border-gray-300 w-full top-10  rounded-md shadow-md">
                    {filteredCities.map((city:CityType, i:number) => (
                      <li
                        key={i}
                        onClick={() => handleSuggestions(city.name)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {city.name}
                      </li>
                    ))}
                  </ul>
                )}
          </div>
          <button onClick={() => dispatch(fetchWeather(value))}
                  className="bg-gray-200 rounded-md p-2 focus:outline-none hover:scale-110 transform transition-all duration-300 ease-in-out">
            <svg
               className="w-6 h-6 "
               viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#2e2e2e"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>  
          </button>

        </div>

        <p className='text-amber-400 text-center font-medium py-4'>{error && error}</p>

        {/* WEATHER DETAILS */}
        {loading ? <h1 className="text-white text-2xl font-semibold text-center py-4">Loading...</h1>
        :
        <>
        <div className="flex gap-8 justify-center pt-12 ">
          <img src={weather.icon === "" ? clear : weather.icon}
                alt="weather icon"
                className="w-24 h-24 " />
          <div className="my-auto">
            <h1 className="text-white text-5xl font-semibold">{weather.temp.toFixed(1)}°c</h1>
            <h2 className="text-white text-md py-1 font-base ml-1"> Feels like: {weather.feels_like.toFixed(1)}°c</h2>
            <h3 className="text-white text-2xl font-semi">{weather.city}</h3>
          </div>
        </div>

        {/* WEATHER INFO */}
        <div style={{height:"25%"}} className=" flex items-end  justify-between mt-8 px-4 md:lg:px-8 ">
          
          <div className="flex items-center gap-2">
            <img src={humidity} alt="humidity icon" className="w-7 h-7 md:lg:w-9 md:lg:h-9" />
            <div>
              <h3 className="text-white text-xl md:lg:text-2xl font-semibold">{weather.humidity}%</h3>
              <h3 className="text-white text-sm md:lg:text-md font-medium">Humidity</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={wind} alt="humidity icon" className="w-7 h-7 md:lg:w-9 md:lg:h-9" />
            <div>
              <h3 className="text-white text-xl md:lg:text-2xl font-semibold">{weather.wind} km/h</h3>
              <h3 className="text-white md:lg:text-md font-medium">Wind speed</h3>
            </div>
          </div>

        </div>
        </>
        
        }
        

      </div>
    </main>
  )
}

export default App
