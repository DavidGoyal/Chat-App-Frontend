import { useDispatch, useSelector } from 'react-redux'
import { Suspense, lazy, useEffect } from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { LayoutLoader } from "./components/layout/Loaders"
import axios from "axios"
import { server } from "./constants/config"
import { makeAdmin, removeAdmin, userExists, userNotExists } from './redux/reducers/auth'
import {Toaster} from "react-hot-toast"
import { SocketProvider } from './socket'


const Home=lazy(()=>import("./pages/Home"))
const Login=lazy(()=>import("./pages/Login"))
const Chat=lazy(()=>import("./pages/Chat"))
const Groups=lazy(()=>import("./pages/Groups"))
const NotFound=lazy(()=>import("./pages/NotFound"))

const AdminLogin = lazy(()=>import("./pages/admin/AdminLogin"))
const Dashboard = lazy(()=>import("./pages/admin/Dashboard"))
const ChatManagement = lazy(()=>import("./pages/admin/ChatManagement"))
const UserManagement = lazy(()=>import("./pages/admin/UserManagement"))
const MessageManagement = lazy(()=>import("./pages/admin/MessageManagement"))




const App = () => {
  const {user,isLoading,isAdmin}=useSelector(state=>state.auth)

  const dispatch=useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`,{withCredentials:true})
      .then(({data}) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()));
  }, [dispatch])


  useEffect(() => {
    axios
      .get(`${server}/api/v1/admin/`,{withCredentials:true})
      .then(() => dispatch(makeAdmin()))
      .catch(() => dispatch(removeAdmin()));
  }, [dispatch])
  
  return isLoading?<LayoutLoader/>:(
    <>
      <Router>
        <Suspense fallback={<LayoutLoader/>}>
          <Routes>
            <Route element={<SocketProvider><ProtectedRoute user={user}/></SocketProvider>}>
              <Route path="/" element={<Home/>} />
              <Route path="/chat/:chatId" element={<Chat/>} />
              <Route path="/groups" element={<Groups/>} />
            </Route>

            <Route element={<ProtectedRoute user={!user} redirect="/"/>}>
              <Route path="/login" element={<Login/>} />
            </Route>

            <Route path="/admin" element={<AdminLogin/>}/>
            
            <Route element={<ProtectedRoute user={user} adminRoute={true} isAdmin={isAdmin} redirect="/"/>}>
              <Route path="/admin/dashboard" element={<Dashboard/>} />
              <Route path="/admin/user-management" element={<UserManagement/>} />
              <Route path="/admin/chat-management" element={<ChatManagement/>} />
              <Route path="/admin/message-management" element={<MessageManagement/>} />
            </Route>

            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Suspense>      
        <Toaster position='bottom-center'/>
      </Router>
    </>
  )
}

export default App