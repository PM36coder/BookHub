
import { Navigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"
import { useEffect } from "react"
export const Logout = ()=>{
    const {logout} = useAuth()
useEffect(()=>{
    logout()
},[logout])
    return <Navigate to= "/login" />
}