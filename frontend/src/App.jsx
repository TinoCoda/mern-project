
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import { Box, Button, useColorModeValue } from "@chakra-ui/react"
import { Route,Routes } from "react-router-dom"



function App() {
  

  return (
    
    <Box bg={useColorModeValue("gray.200", "gray.700")} h="100vh">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        

      </Routes>
 
    </Box>
  )
}

export default App
