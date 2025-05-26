// Weather service to fetch data from OpenWeatherMap API

export interface WeatherData {
  location: {
    name: string
    country: string
    lat: number
    lon: number
  }
  current: {
    temp: number
    feels_like: number
    humidity: number
    wind_speed: number
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }
    dt: number // timestamp
  }
  forecast: Array<{
    dt: number // timestamp
    temp: {
      day: number
      min: number
      max: number
    }
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }
  }>
}

export interface GeoLocation {
  lat: number
  lon: number
}

// Mock data for development and fallback
const mockWeatherData: Record<string, WeatherData> = {
  "New York": {
    location: {
      name: "New York",
      country: "US",
      lat: 40.7128,
      lon: -74.006,
    },
    current: {
      temp: 22,
      feels_like: 21,
      humidity: 65,
      wind_speed: 5,
      weather: {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
      dt: Math.floor(Date.now() / 1000),
    },
    forecast: [
      {
        dt: Math.floor(Date.now() / 1000) + 86400,
        temp: {
          day: 23,
          min: 18,
          max: 25,
        },
        weather: {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 172800,
        temp: {
          day: 24,
          min: 19,
          max: 26,
        },
        weather: {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 259200,
        temp: {
          day: 22,
          min: 17,
          max: 24,
        },
        weather: {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 345600,
        temp: {
          day: 21,
          min: 16,
          max: 23,
        },
        weather: {
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "10d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 432000,
        temp: {
          day: 20,
          min: 15,
          max: 22,
        },
        weather: {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      },
    ],
  },
  London: {
    location: {
      name: "London",
      country: "GB",
      lat: 51.5074,
      lon: -0.1278,
    },
    current: {
      temp: 18,
      feels_like: 17,
      humidity: 75,
      wind_speed: 4,
      weather: {
        id: 300,
        main: "Drizzle",
        description: "light intensity drizzle",
        icon: "09d",
      },
      dt: Math.floor(Date.now() / 1000),
    },
    forecast: [
      {
        dt: Math.floor(Date.now() / 1000) + 86400,
        temp: {
          day: 19,
          min: 15,
          max: 20,
        },
        weather: {
          id: 300,
          main: "Drizzle",
          description: "light intensity drizzle",
          icon: "09d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 172800,
        temp: {
          day: 20,
          min: 16,
          max: 21,
        },
        weather: {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 259200,
        temp: {
          day: 18,
          min: 14,
          max: 19,
        },
        weather: {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 345600,
        temp: {
          day: 17,
          min: 13,
          max: 18,
        },
        weather: {
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "10d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 432000,
        temp: {
          day: 19,
          min: 15,
          max: 20,
        },
        weather: {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      },
    ],
  },
  Tokyo: {
    location: {
      name: "Tokyo",
      country: "JP",
      lat: 35.6762,
      lon: 139.6503,
    },
    current: {
      temp: 28,
      feels_like: 30,
      humidity: 70,
      wind_speed: 3,
      weather: {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03d",
      },
      dt: Math.floor(Date.now() / 1000),
    },
    forecast: [
      {
        dt: Math.floor(Date.now() / 1000) + 86400,
        temp: {
          day: 29,
          min: 24,
          max: 31,
        },
        weather: {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 172800,
        temp: {
          day: 30,
          min: 25,
          max: 32,
        },
        weather: {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 259200,
        temp: {
          day: 29,
          min: 24,
          max: 31,
        },
        weather: {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 345600,
        temp: {
          day: 28,
          min: 23,
          max: 30,
        },
        weather: {
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "10d",
        },
      },
      {
        dt: Math.floor(Date.now() / 1000) + 432000,
        temp: {
          day: 30,
          min: 25,
          max: 32,
        },
        weather: {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      },
    ],
  },
}

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development" || !process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export async function getWeatherByLocation(location: GeoLocation): Promise<WeatherData> {
  // Use mock data in development or when API key is missing
  if (isDevelopment) {
    console.log("Using mock weather data (no API key or in development mode)")
    // Return New York as default mock data
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
    return mockWeatherData["New York"]
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    if (!apiKey) {
      throw new Error("OpenWeather API key is missing")
    }

    const { lat, lon } = location

    // Fetch current weather and 5-day forecast
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`,
    )

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key or unauthorized access")
      }
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    // Fetch location name using reverse geocoding
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`,
    )

    if (!geoResponse.ok) {
      if (geoResponse.status === 401) {
        throw new Error("Invalid API key or unauthorized access")
      }
      throw new Error(`Geocoding API error: ${geoResponse.status}`)
    }

    const geoData = await geoResponse.json()
    const locationName = geoData[0]?.name || "Unknown"
    const country = geoData[0]?.country || ""

    // Format the data
    return {
      location: {
        name: locationName,
        country: country,
        lat,
        lon,
      },
      current: {
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        weather: data.current.weather[0],
        dt: data.current.dt,
      },
      forecast: data.daily.slice(1, 6).map((day: any) => ({
        dt: day.dt,
        temp: {
          day: day.temp.day,
          min: day.temp.min,
          max: day.temp.max,
        },
        weather: day.weather[0],
      })),
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

// Update the getCurrentLocation function to better handle permission errors
export function getCurrentLocation(): Promise<GeoLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => {
        // Provide more user-friendly error messages based on error code
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error("Location access was denied. Please enable location permissions or enter a location manually."),
            )
            break
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information is unavailable. Please try again or enter a location manually."))
            break
          case error.TIMEOUT:
            reject(
              new Error("The request to get your location timed out. Please try again or enter a location manually."),
            )
            break
          default:
            reject(new Error("An unknown error occurred while trying to access your location."))
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  })
}

// Add a function to get weather by city name
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  // Use mock data in development or when API key is missing
  if (isDevelopment) {
    console.log(`Using mock weather data for ${city} (no API key or in development mode)`)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

    // Return the mock data for the requested city, or New York as fallback
    return mockWeatherData[city] || mockWeatherData["New York"]
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    if (!apiKey) {
      throw new Error("OpenWeather API key is missing")
    }

    // First get coordinates for the city
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`,
    )

    if (!geoResponse.ok) {
      if (geoResponse.status === 401) {
        throw new Error("Invalid API key or unauthorized access")
      }
      throw new Error(`Geocoding API error: ${geoResponse.status}`)
    }

    const geoData = await geoResponse.json()

    if (!geoData || geoData.length === 0) {
      throw new Error(`City not found: ${city}`)
    }

    const { lat, lon } = geoData[0]

    // Then get weather using those coordinates
    return getWeatherByLocation({ lat, lon })
  } catch (error) {
    console.error("Error fetching weather data by city:", error)
    throw error
  }
}

// Convert temperature from Celsius to Fahrenheit
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}

// Format timestamp to day name
export function formatDay(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", { weekday: "short" })
}

// Get appropriate weather icon
export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

// Get weather background color based on weather condition
export function getWeatherBackground(weatherId: number): string {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  if (weatherId >= 200 && weatherId < 300) {
    return "bg-indigo-700" // Thunderstorm
  } else if (weatherId >= 300 && weatherId < 400) {
    return "bg-blue-400" // Drizzle
  } else if (weatherId >= 500 && weatherId < 600) {
    return "bg-blue-600" // Rain
  } else if (weatherId >= 600 && weatherId < 700) {
    return "bg-slate-300" // Snow
  } else if (weatherId >= 700 && weatherId < 800) {
    return "bg-gray-400" // Atmosphere (fog, mist, etc.)
  } else if (weatherId === 800) {
    return "bg-sky-500" // Clear sky
  } else if (weatherId > 800) {
    return "bg-sky-300" // Clouds
  }
  return "bg-sky-500" // Default
}

// Add a list of default cities for fallback
export const defaultCities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Sydney",
  "Berlin",
  "Toronto",
  "Singapore",
  "Dubai",
  "San Francisco",
]
