import React, { useState,useEffect} from "react";
import {withRouter,useHistory,useParams} from 'react-router-dom';
import {Button,Form} from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
toast.configure();
const changeColor={
    color:"white" };

 function Login(props) {
  useEffect(()=>{
    toast("Please log in to use  FaturaApp")
  },[])
  const [user, setUser] = useState({Email:'',password:''});
    const  apiUrl="https://jsonplaceholder.typicode.com/users";

  function validateForm() {
     return user.email.length > 0 && user.password.length > 0;
   }

  const loginUser=(e)=>{
    e.preventDefault();
    const data={Email:user.Email,password:user.password}
    axios.post(apiUrl,data)
    .then((result)=>{
      console.log(result.data)
 localStorage.setItem('token',result.token)
      var a=localStorage.getItem('myDataForReg');
      console.log("A:",a);
      const user=result.data;
      console.log(result.data);
      if(result.data.status=-"200")
      props.history.push('/Welcome')
      else
      alert('ERROR')
    })
  }


  // function handleSubmit(event) {
  //   event.preventDefault();
  //   props.history.push('/Welcome')

  // }
 

  const onChange=(e)=>{
    e.persist();
    setUser({...user,[e.target.name]:e.target.value});
  }
  return (
    <div className="Login">
       <div className="text-center" style={changeColor}>  
                  <h1 className="h4 text-gray-900 mb-4">Login</h1>  
                </div> 
      <Form onSubmit={loginUser}>
        <Form.Group size="lg" controlId="email">
          <Form.Label style={changeColor}>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label style={changeColor} >Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={()=>{
          
            validateForm()
        }}>
          Login
        </Button>
<br/>
        <p className="forgot-password text-right text-color-white" style={changeColor}>
                    You dont have account ? <a href="/Registration">Sign Up</a>
                </p>
      </Form>
      
    </div>
  );
}
export default withRouter(Login)