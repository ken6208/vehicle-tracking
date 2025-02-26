import React from "react"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./App.css"
import { Body } from "./Body"

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
