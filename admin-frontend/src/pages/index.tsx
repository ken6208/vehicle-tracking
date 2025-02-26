import React from "react"
import { Box } from "@mui/material"

import RealTimeMap from "../components/RealTimeMap"
import TripList from "../components/TripList"

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <RealTimeMap />
      <TripList />
    </Box>
  )
}

export default Home
