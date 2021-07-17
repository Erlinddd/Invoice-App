import React, { useState,useEffect} from "react";
import {withRouter,useHistory,useParams} from 'react-router-dom';
import {Button,Form} from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import {motion} from 'framer-motion';


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

    const  apiUrl="https://localhost:44362/api/login/authenticate";

  function validateForm() {
     return UserName.length > 0 && Password.length > 0;
   }
   

  const loginUser=(e)=>{
    e.preventDefault()
    let item={UserName,Password};
    
    axios.post(apiUrl,item).then(response=>{
      setLoading(false);
      alert("Log In Success")
      localStorage.setItem("user",UserName)
      setShow({"show":true})
    
           setTimeout(() => setShow({"show":false}), 3000);
           setTimeout(() => loginList(),1000) 

   localStorage.setItem("token",response.data)
 
    }).catch (error=>{
      setLoading(false);
     
      if (error.response.status=== 401 || error.response.status===400)
      {
        alert("Username or Password are incorrect!")
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
       <div className="text-center" style={changeColor}>  
                  <motion.h1 className="h4 text-gray-900 mb-4">Login</motion.h1>  
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
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label style={changeColor} >Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={Password}
            onChange={e=>setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={()=>{   validateForm()}}>
          Login
        </Button>
<br/>
        <p className="forgot-password text-right text-color-white" style={changeColor}>
                    You dont have account ? <a href="/Registration">Sign Up</a>
                </p>
      </Form>
      
    </motion.div>
  );
}
export default withRouter(Login)