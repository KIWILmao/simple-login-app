import React from "react"
import { Link , useNavigate } from 'react-router-dom'
import Styles from './home.module.css'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'

export default function Home(){
    const[authe ,setAuthe] = React.useState({
        userIn:true,
        name:""
      })
    
      React.useEffect(()=>{
      auth.onAuthStateChanged(user => {
          console.log(user);
          if(user){
              setAuthe({
                  userIn: false,
                  name : user.displayName
              })
          }
          else{
            console.log("else part called");
              setAuthe({
                  useIn:true,
                  name:""
              })
          }
      })
    },[])
    
    const [errMsg ,setErrMsg] = React.useState("")
    
    const navigate = useNavigate()
    function handleLogout(){
        signOut(auth)
        .then(() => {
            navigate('/')
        })
        .catch((error) => {
            setErrMsg(error.message)
        });
        
    }

    console.log(authe.userIn);
    
    return(
        <div className={Styles.home}>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>signup</Link>
            <h1>Welcome {authe.name}</h1>
            <h5 className={Styles.errmsg}>{errMsg}</h5>
            <button className={Styles.logout}onClick={handleLogout}>Logout</button>
        </div>
    )
}