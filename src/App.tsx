import humidity from './assets/humidity.png'
import wind from './assets/wind.png'

function App() {

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[480px] h-[500px] bg-gradient-to-br from-sky-500 to-indigo-500 rounded-md p-4 overflow-hidden">
        <h1 className="text-3xl font-semibold text-white text-center py-4">Weather App</h1>
        {/* SEARCH FIELD */}
        <div className="flex gap-2 px-4">
          <input type="text" placeholder="Enter any city name"
                 className="w-full rounded-md p-2 bg-gray-100 focus:outline-slate-400" />
          <button className="bg-gray-200 rounded-md p-2 focus:outline-none hover:scale-110 transform transition-all duration-300 ease-in-out">
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

        {/* WEATHER DETAILS */}
        <div className="flex gap-8 justify-center pt-16 ">
          <img src="https://cdn-icons-png.flaticon.com/512/10127/10127236.png"
                alt="weather icon" className="w-24 h-24 " />
          <div className="my-auto">
            <h1 className="text-white text-5xl font-semibold">30°c</h1>
            <h3 className="text-white text-2xl font-semi">Guwahati</h3>
          </div>
        </div>

        {/* WEATHER INFO */}
        <div style={{height:"30%"}} className=" flex items-end  justify-between mt-8 px-4 md:lg:px-8 ">

          <div className="flex items-center gap-2">
            <img src={humidity} alt="humidity icon" className="w-9 h-9" />
            <div>
              <h3 className="text-white text-2xl font-semibold">30%</h3>
              <h3 className="text-white text-md font-medium">Humidity</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={wind} alt="humidity icon" className="w-9 h-9" />
            <div>
              <h3 className="text-white text-2xl font-semibold">2.6 km/h</h3>
              <h3 className="text-white text-md font-medium">Wind speed</h3>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}

export default App
