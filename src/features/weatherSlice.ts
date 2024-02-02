import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import snow from '../assets/snow.png'

type WeatherType = {
    temp: number;
    feels_like: number;
    city: string;
    humidity: number;
    wind: number;
    icon: string;
  }
 
type WeatherStateType = {
    loading: boolean;
    weather: WeatherType;
    error: string;
}


const getImagePath = (icon:string) => {
    
    switch(icon){
        case "Clear":
          return clear;
        case "Clouds":
          return cloud;
        case "Drizzle":
          return drizzle;
        case "Snow":
          return snow;
        default:
          return clear;
    }
  }


export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
})




const initialState: WeatherStateType = {
    loading: false,
    weather: {
        temp: 0,
        feels_like: 0,
        city: '',
        humidity: 0,
        wind: 0,
        icon: ''
    },
    error: ''
}


const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.loading = false;
            state.weather = {
                temp: action.payload.main.temp,
                feels_like: action.payload.main.feels_like,
                city: action.payload.name,
                humidity: action.payload.main.humidity,
                wind: action.payload.wind.speed,
                icon:  getImagePath(action.payload.weather[0].main)
            }
            state.error = '';
        })
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Enter valid city name.';
        })

    }
})


export default weatherSlice.reducer;