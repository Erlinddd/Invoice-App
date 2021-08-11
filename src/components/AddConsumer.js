import React from 'react'
import {Card,Form,Button,Col} from 'react-bootstrap'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import {withRouter,useHistory} from 'react-router-dom';
import MyToast from './myToast'
import {useState,useEffect} from 'react'
import axiosInstance from './axios'

const AddConsumer = (props) => {
    const [consumer, setConsumer] = useState({ FirstName: '', LastName: '', Street: '', City: '', PostalCode: '', Contact: '',RajoniId:'' });  

    const InsertConsumer = (e) => {  
            e.preventDefault();  
            debugger;  
            const data = { FirstName:consumer.FirstName, LastName: consumer.LastName, Street: consumer.Street, City:consumer.City, PostalCode: consumer.PostalCode, Contact: consumer.Contact,RajoniId:consumer.RajoniId };  
            axiosInstance.post("/bleresi", data)  
              .then((result) => {  
                props.history.push('/lista/bleresi')
            
              });  
          };  

          const onChange = (e) => {  
            debugger;
                e.persist();  
              
                setConsumer({...consumer,[e.target.name]: e.target.value});  
              }
              
             const  rajoniOnChange=(e)=>{
               debugger;
                setConsumer({...consumer,RajoniId:e.target.value})
              }
              

              let history = useHistory();

	function handleClick() {
		history.push('/lista/bleresi');
	}
            return (    
              <div class="container h-100">
              <div class="align-items-center h-100">
                <div class="col-12 mx-auto">

<Card className={"border border-dark bg-dark text-white"}>
<Card.Header>  <FontAwesomeIcon  style={{marginLeft:"20px"}} icon={faPlusSquare} />  Add Consumer</Card.Header>
<Form  onSubmit={InsertConsumer} id="artikulliFormId">
<Card.Body>
<Form.Row>

<Form.Group as={Col} controlId="formGridFirstName" >
<Form.Label>FirstName</Form.Label>
<Form.Control  value={consumer.FirstName} onChange={ onChange } autoComplete="off"  required name="FirstName" className="bg-dark text-white" type="text" placeholder="FirstName" />
</Form.Group>

<Form.Group as={Col} controlId="formGridLastName">
<Form.Label>LastName</Form.Label>
<Form.Control  value={consumer.LastName} onChange={ onChange }  required name="LastName" className="bg-dark text-white" type="text" placeholder="LastName" />
</Form.Group>

</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridStreet" >
<Form.Label>Street</Form.Label>
<Form.Control   value={consumer.Street} onChange={ onChange } required name="Street" className="bg-dark text-white" type="text" placeholder="Street" />

</Form.Group>

<Form.Group as={Col} controlId="formGridCity">

<Form.Label>City</Form.Label>
<Form.Control  value={consumer.City} onChange={ onChange } name="City" className="bg-dark text-white" type="text" placeholder="City" />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridPostalCode">
    <Form.Label>PostalCode</Form.Label>
   <Form.Control required autoComplete="off"  value={consumer.PostalCode} onChange={ onChange }
    type="text" name="PostalCode"
         className={"bg-dark text-white"}
   placeholder="PostalCode" />
     </Form.Group>

   <Form.Group as={Col} controlId="formGridContact">
     <Form.Label>Contact</Form.Label>
     <Form.Control required autoComplete="off"  value={consumer.Contact} onChange={ onChange } 
 type="text" name="Contact"
                                       
 className={"bg-dark text-white"}
  placeholder="Contact" />
  </Form.Group>
  </Form.Row>
  <div className=" bg-dark">
      <label className="mr-sm-8" for="inlineFormCustomSelect">Rajoni</label>
      <select className=" bg-dark text-white  custom-select mr-sm-8" id="inlineFormCustomSelect"  onChange={ rajoniOnChange }  >
      <option value="0">Select the rajon</option>
      <option value="1">Tetove</option>
        <option value="2">Struge</option>
        <option value="3">Shkup</option>
        
      </select>
    </div>

</Card.Body>
<Card.Footer style={{textAlign:"center"}}>
<Button  size="sm" variant="success" type="submit"
>
<FontAwesomeIcon icon={faSave} /> 
  {''}  Submit  </Button> {""}
   <Button onClick={() => setConsumer('')}  size="sm" variant="info" type="reset">
   <FontAwesomeIcon icon={faUndo}/> Reset
   </Button>{"  "}
   {""}
   <Button   onClick={handleClick} size="sm" variant="info" type="button">
   <FontAwesomeIcon icon={faList}/>  List
   </Button>

</Card.Footer>
</Form>
</Card>
     </div>
     </div>
     </div>
    );
}
 
export default withRouter(AddConsumer);