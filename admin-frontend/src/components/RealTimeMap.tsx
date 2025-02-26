import React, { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

// Component to keep the map centered on the latest position
const UpdateMapCenter = ({ position }: { position: [number, number] }) => {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true })
    }
  }, [position, map])

  return null
}

const RealTimeMap = () => {
  const [position, setPosition] = useState<[number, number] | null>(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8765")

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.lat && data.lng) {
          setPosition([data.lat, data.lng])
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    ws.onerror = (error) => console.error("WebSocket error:", error)
    ws.onclose = () => console.log("WebSocket closed")

    return () => ws.close()
  }, [])

  return (
    <MapContainer
      center={position || [51.505, -0.09]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && (
        <>
          <UpdateMapCenter position={position} />
          <Marker position={position} icon={defaultIcon}>
            <Popup>Live Location</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  )
}

export default RealTimeMap
