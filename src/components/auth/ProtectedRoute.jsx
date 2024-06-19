import { Navigate, Outlet } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({user,redirect="/login",adminRoute=false,isAdmin=false}) => {
   if(adminRoute && !isAdmin) return <Navigate to={"/admin"}/>
   return user?<Outlet/>:<Navigate to={redirect}/>
}

export default ProtectedRoute