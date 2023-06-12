import { Route, Routes } from "react-router-dom"
import { History } from "../pages/History"
import { Home } from "../pages/Home"
import { Result } from "../pages/Result"
import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"



export const AllRoutes = () => {
  return (
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/result" element={<Result/>} />
    <Route path="/history" element={<History/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/signup" element={<SignUp/>} />
    
   </Routes>
  )
}
