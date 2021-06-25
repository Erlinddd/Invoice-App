import React, { useEffect, useState } from "react";
import {withRouter,useHistory,useParams} from 'react-router-dom';
import {Button,Form} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

import "./Login.css";
import axios from "axios";
import MyToast from './myToast'

toast.configure();


const changeColor={
    color:"white"
      };


 

 function RegistrationForm(props) {
 
  const [data, setData] = useState({Email:'',userName:'',lastName:'',password:''});
  const[show,setShow]=useState(false)
const apiUrl="https://jsonplaceholder.typicode.com/users"
  const Registration=(e)=>{
    e.preventDefault()
    if (data.Email == "" && data.userName== "" && data.lastName =="" && data.password ==""){
      alert ("Fill the form ")
      return;
    }
    else if(data.Email=="")
  {
    alert("Your must fill the email form")
    return;
  }
  else if (data.userName==""){
    alert("You must fill the username ")
    return;
  } else if (data.lastName==""){
    alert("You must fill the lastname")
    return;
  }
  else if (data.password==""){
alert("fill the pass");
return ;
  }

  
    const data1={Email:data.Email,userName:data.userName,lastName:data.lastName,password:data.password}
    axios.post(apiUrl,data1)
    .then ((result)=>{
      console.log(result.data);
      const serializedState = JSON.stringify(result.data);  
      var a= localStorage.setItem('myDataForReg', serializedState); 
      if (result.data.Status == 'Invalid')
      alert('Invalid User')
      else
      setShow({"show":true})
    
           setTimeout(() => setShow({"show":false}), 3000);
           setTimeout(() => loginList(),2000) 
      //props.history.push('/')
    })
  }
const loginList=()=>{
  props.history.push('/')
}
  function validateForm() {    
    return data.Email.length > 0 && data.password.length > 0;
  }

const onChange=(e)=>{
  e.persist()
  //debugger;
  setData({...data,[e.target.name]:e.target.value})
} 

  return (

    <div className="Login">
       <div style={{"display":show ? "block" : "none"}}>
    
    <MyToast show = {show} message={  "Regjistrimi u kry me sukses"} type = {"success"}/>
     </div>
     
     <div className="text-center" style={changeColor}>  
                  <h1 className="h4 text-gray-900 mb-4">Create a New User</h1>  
                </div> 
      <Form onSubmit={Registration}>
        <Form.Group size="lg" controlId="email">
          <Form.Label style={changeColor} >Email</Form.Label>
          <Form.Control
            autoFocus
            name="Email"
            type="email"
            value={data.Email}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label style={changeColor} >Username</Form.Label>
          <Form.Control
            autoFocus
            name="userName"
            type="username"
            value={data.userName}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label style={changeColor} >Lastname</Form.Label>
          <Form.Control
            autoFocus
            type="lastName"
            name="lastName"
            value={data.lastName}
            onChange={onChange}
          />

        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label style={changeColor} >Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={data.password}
            onChange={onChange}
          />
        </Form.Group>
        <Button block size="lg" type="submit" onClick={()=>{
          
            validateForm()
        }}>
          Sign Up
        </Button>
{''}
<br/>

        <p className="forgot-password text-right color-white" style={changeColor} >
       You alredy have account? <a href="/">Login</a>
                </p>
      </Form>
      
    </div>
  );
}
export default withRouter(RegistrationForm)