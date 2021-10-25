import React, { useState,useEffect} from "react";
import {withRouter,useHistory,useParams} from 'react-router-dom';
import {Button,Form} from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import {motion} from 'framer-motion';
import axiosInstance from './axios'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

toast.configure();
const changeColor={
    color:"white" };

 function Login(props) {
  useEffect(()=>{
    toast("Please log in to use  FaturaApp")
  },[])
  
  const [user,setUser]=useState('')
  const [UserName, setUserName] = useState('');
  const [Password,setPassword]=useState('');
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const[show,setShow]=useState(false)

    const  apiUrl="/login/authenticate";

  function validateForm() {
     return UserName.length > 0 && Password.length > 0;
   }
  const loginUser=(e)=>{
    e.preventDefault()


    
    let item={UserName,Password};
    
    axiosInstance.post(apiUrl,item,{
      headers:{
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "https://localhost:44362",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      }
    }).then(response=>{
      setLoading(false);
      toast.success("Login successfully!!");
      localStorage.setItem("user",UserName)
      setShow({"show":true})
    
           setTimeout(() => setShow({"show":false}), 3000);
           setTimeout(() => loginList(),1000) 

   localStorage.setItem("token",response.data)
 
    }).catch (error=>{
      setLoading(false);
      localStorage.setItem("token","");
      if (error.response.status=== 401 || error.response.status===400  || error.response.status===500)
      {
       toast.error("Username or Password are incorrect!")
      }
      
    })

  }

  const loginList=()=>{
    props.history.push('/Welcome')
  }
 
  

  return (
    <motion.div className="Login"
    initial={{x:'-100vh'}}
    animate={{x:0}}
    transition={{type:'spring',stiffness:120}}
    >
       <div  className="text-center" style={changeColor}>  
    
  

                  <motion.h1 className="h4 text-gray-900 mb-4" id="my header">Login</motion.h1>  
                </div> 
      <Form onSubmit={loginUser}>
        <Form.Group size="lg" controlId="email">
          <Form.Label style={changeColor}>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            name="email"
            value={UserName}
            onChange={e=>setUserName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label style={changeColor} >Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={Password}
            required
            onChange={e=>setPassword(e.target.value)}
          />
        </Form.Group>
        <Button  className="btn-login" block size="lg" type="submit" disabled={()=>{   validateForm()}}>
        SIGN IN
        </Button>
<br/>
        <p className="forgot-password text-right text-color-white" style={changeColor}>
                    You don't have account ? <a href="/Registration">Sign Up</a>
                </p>
      </Form>
      
    </motion.div>
  );
}
export default withRouter(Login)