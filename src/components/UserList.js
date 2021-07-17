import React from 'react'
import { Card,Table,Button,ButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MyToast from './myToast'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import {withRouter,useHistory,useParams} from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

const UserList = (props) => {
    const [data, setData] = useState([]);
   
    
    useEffect(() => {          
            const GetData = async () => {  
              const result = await axios.get('https://localhost:44362/api/bleresi');  
              setData(result.data); 
              console.log(result.data)
            };  
            GetData(); 
        },[])

       

        const deleteConsumer = (id) => {  
              axios.delete('https://localhost:44362/api/bleresi/' + id,{
                headers:{
                  "Authorization":'Bearer'+localStorage.getItem("token")
                }
              })  
                .then((result) => {  
               alert("Deleted succesfully") 
               props.history.push('/bleresi')

                });  
            };  
       function Click(){
     props.history.push('/bleresi',3000)
          }
         
          
    return (
        <div className="App">
          <Card className={"border border-dark bg-dark text-white"}>
           <Card.Header>  
               <Button   variant="secondary" size="lg" block onClick={Click}> <FontAwesomeIcon icon={faPlus} /> Add Consumer</Button>
           </Card.Header>
           <Card.Body>     
           <h6>Number of consumer:{data.length}  </h6>         
    <Table bordered hover striped variant="dark">
       <thead>
<tr>
  <th>Firstname</th>
  <th>Lastname</th>
  <th>Street</th>
  <th>City</th>
  <th>PostalCode</th>
  <th>Contact</th>
  <th>Edit/Delete</th>
</tr>
</thead>


<tbody>
{data.map(item => {  
 return <tr key={item.id}>  
 <td>{item.firstName}</td>  
 <td>{item.lastName}</td>  
 <td>{item.street}</td>  
 <td>{item.city}</td>  
  <td>{item.postalCode}</td>  
  <td>{item.contact}</td>   
<td>  
<ButtonGroup>
    <Link className="btn btn-lg btn-outline-primary" to={`/editt/bleresi/${item.id}`}><FontAwesomeIcon icon={faEdit} /></Link>{' '}
 
      <Button size="lg" onClick={() => { deleteConsumer(item.id) }}  className="btn btn-lg btn-outline-danger" style={{marginLeft:"5px"}} >   <FontAwesomeIcon icon={faTrash} /></Button>
  </ButtonGroup>
 </td>  
</tr>  
 })}  


</tbody>
               </Table>
           </Card.Body>
       </Card>
        </div>
      );
}
 
export default withRouter (UserList);