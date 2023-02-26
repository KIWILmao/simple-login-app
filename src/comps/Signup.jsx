import React from "react"
import Styles  from './signup.module.css'
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth"
import { auth } from '../firebase'
import { Link,useNavigate } from "react-router-dom"

export default function Signup(props){
    const [formData ,setFormData] = React.useState({
        name:"",
        email:"",
        pass:""
    })

    const [errMsg ,setErrMsg] = React.useState("")

    const [disabled ,setDisabled] = React.useState(false)

    function handleChange(event){
        const{name,value} = event.target
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                [name]:value
            }
        })
    }
    
    const navigate = useNavigate()
    function onSignUp(event){
        event.preventDefault();
        if(!formData.name || !formData.email || !formData.pass){
            setErrMsg("Fill each detail!")
            return
        }
        setErrMsg("")
        setDisabled(true)
        createUserWithEmailAndPassword(auth,formData.email,formData.pass)
            .then((res) =>{
                setDisabled(false)
                updateProfile(res.user,{
                    displayName: formData.name
                })
                navigate("/")
            })
            .catch((error) => {
                setDisabled(false)
                setErrMsg(error.message)
            })
    }

    return(
        <div className={Styles.outersignup}>
        <div className={Styles.signupcontainer}>
            <form className={Styles.form} method="POST">
                <label htmlFor="signup-name">Name</label>
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className={Styles.signupname}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}/>

                <label htmlFor="signup-email">Email</label>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className={Styles.signupemail}
                    name="email"
                    value={formData.email} 
                    onChange={handleChange}/>
                <br/>
                <label htmlFor="signup-pass">Password</label>
                <input 
                    type="text" 
                    placeholder="Enter your password" 
                    className={Styles.signuppass}
                    name="pass"
                    value={formData.pass} 
                    onChange={handleChange}/>
                <br />
                <h5 className={Styles.errmsg}>{errMsg}</h5>
                <button className={Styles.signupbtn} onClick={onSignUp} disabled={disabled}>Sign up</button>
                <h4>Already have account? <Link to="/login">Login</Link></h4>
            </form>
        </div>
        </div>
    )
}