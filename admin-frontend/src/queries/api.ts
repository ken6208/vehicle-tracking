import axios from "axios"
import { TripData } from "src/types/tripData"

const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT_URL || "http://localhost:8000"

// Fetch all trips (GET)
export const fetchTrips = async () => {
  const response = await axios.get(`${API_BASE_URL}/trips`)
  return response.data
}

// Create a new trip (POST)
export const createTrip = async (tripData: TripData) => {
  const response = await axios.post(`${API_BASE_URL}/trip/new`, tripData)
  return response.data
}

// Update an existing trip (PUT)
export const updateTrip = async (id: number, tripData: Partial<TripData>) => {
  const response = await axios.put(`${API_BASE_URL}/trip/${id}`, tripData)
  return response.data
}

// Delete a trip (DELETE)
export const deleteTrip = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/trip/${id}`)
}
