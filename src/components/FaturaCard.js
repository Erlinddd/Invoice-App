import React,{useState,useEffect,useContext} from 'react'
import {Card,Form,Table,Button,ButtonGroup} from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'

const FaturaCard = (props)  =>{
 

const [fat,setFat]=useState({"id":0,"data":"","idBleresi":0,"faturaArtikullis":[],"bleresi":""})
useEffect(()=>{
  var faturaEselektuar=JSON.parse(localStorage.getItem("FaturaEselektuar"))
  console.log(fat)
  setFat(faturaEselektuar)
  // alert(faturaEselektuar.id)  
},[])

function printFatura(){
window.print();
}
    return ( 
        
        <div>
          
          
          
  
            <Card className="text-center">
            <Card.Header>Fatura u krijua nga:<Form.Label style={{marginLeft:"2px"}}>  
              {localStorage.getItem("user")} </Form.Label> </Card.Header>
  <Card.Header>FaturaId:<Form.Label>{fat.id} </Form.Label> </Card.Header>

  <Card.Header>Bleresi:<Form.Label>{fat.bleresi.firstName} </Form.Label> </Card.Header>
  <Card.Header>Data:<Form.Label>{moment(fat.data).format("YYYY-MM-DD hh:mm")} </Form.Label>
   </Card.Header>
   

  <Card.Body>
    <Card.Title>
      
      </Card.Title>
    <Card.Text>
     <p id="demo"></p>
    </Card.Text>
    <Table bordered hover striped variant="white">
<thead>
<tr>
  <th>Artikulli</th>
  <th>Sasia</th>
  <th>Cmimi</th>
  <th>Vlera</th>
</tr>
</thead>


<tbody>
{fat.faturaArtikullis.map(item => {  
 return <tr key={item.id}>  
 <td>{item.artikulli}</td>  
 <td>{item.sasia}</td>  
 <td>{item.cmimi}</td>  
 <td>{item.vlera}</td>  
 


  
</tr>  
 })}  


</tbody>
               </Table>
  </Card.Body>
  <ButtonGroup>
<Button onClick={printFatura}>Printo Faturen</Button>
</ButtonGroup>
</Card> 



              
        </div>
      
        );

}
 
export default FaturaCard;