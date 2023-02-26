import React from "react"
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider} from "firebase/auth"
import { auth } from '../firebase'
import Styles from './Login.module.css'
import { Link,useNavigate } from "react-router-dom"

export default function Login(){
    const [formData ,setFormData] = React.useState({
        email:"",
        pass:""
    })

    const [errMsg ,setErrMsg] = React.useState("")

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
    function onLogin(event){
        event.preventDefault()
        if(!formData.email || !formData.pass){
            setErrMsg("Fill each detail!")
            return
        }
        setErrMsg("")
        signInWithEmailAndPassword(auth,formData.email,formData.pass)
            .then((res) =>{
                navigate('/')
            })
            .catch((error) => {
                setErrMsg(error.message)
            })
    }
    const provider = new GoogleAuthProvider();
    function handleGoogle(event){
        event.preventDefault()
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                navigate('/')
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return(
        <div className={Styles.outerlogin}>
        <div className={Styles.logincontainer}>
            <form className={Styles.form}>
                <label htmlFor="login-email">Email</label>
                <input 
                    type="email"
                    placeholder="Enter your email" 
                    className={Styles.loginemail}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}/>
                <label htmlFor="login-pass">Password</label>
                <input 
                    type="text" 
                    placeholder="Enter your password" 
                    className={Styles.loginpass} 
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}/>
                <h5 className={Styles.errmsg}>{errMsg}</h5>
                <button className={Styles.loginbtn} onClick={onLogin}>Login</button>
                <button className={Styles.loginbtn} onClick={handleGoogle}>Login with google</button>
                <hr />  
                <h4>Forget password? <a href="./Login.js">Reset</a></h4>
                <h4>Don't have account? <Link to="/signup">Signup</Link></h4>
            </form>
        </div>
        </div>
    )
}