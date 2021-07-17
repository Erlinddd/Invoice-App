import React,{useState,useEffect,useRef, useContext}from 'react'
import  axios from 'axios'
import {Button,ButtonGroup,Fade} from 'react-bootstrap'
import FaturaCard from './FaturaCard';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
  
const marginBottom={
    marginBottom:"20px"};
   
function Faturat (props)  {

    const[data,setData]=useState([{}])
    const [fatura,setFatura]=useState([])
    
    useEffect(() => {          
        const GetData = async () => {  
          const result = await axios.get(`https://localhost:44362/api/fatura`);  
          setData(result.data); 
          console.log(result.data)
        };  
        GetData(); 
        
    },[])
    const getById=async(event)=>{
      let IdFatura = event.currentTarget.id.split('_')[1];
      const response=await axios.get(`https://localhost:44362/api/fatura/` + IdFatura)
      setFatura(response.data)
      localStorage.setItem("FaturaEselektuar",JSON.stringify(response.data))
      console.log(response.data)
      //alert("get by id")
      props.history.push('/faturaCard/'+IdFatura)
    }
    const deleteFatura = (idFatura) => {  
      axios.delete('https://localhost:44362/api/fatura/' + idFatura)  
        .then((result) => {  
       alert("Deleted succesfully") 
       props.history.push('/Welcome');

        });  
    };
 
    return ( 
     
        <div>
       
          
  {data.map((dat, index) => (

      

<form id="form1">
<div className="card text-center" style={marginBottom}>
  <div className="card-header">
   <h2>FaturaID: {dat.id} </h2>
  </div>
  <div className="card-body">
    <h5 className="card-title"></h5>
    <p className="card-text"><h3>Koha e faktures: {dat.data}</h3>  <h5>bleresId:{dat.idBleresi}</h5></p>
   
   {/* <Link>
   <Button onClick={ getById }
    id={"btn_"+dat.id} to={`/faturaCard/${dat.id}`} className="btn btn-primary" type="button">Printo fakturen </Button>
   
</Link> */}
   
<Link  onClick={getById}  id={"btn_"+dat.id} className="btn btn-lg btn-outline-primary" >Printo Fakturen</Link>{' '}

<ButtonGroup>
          <Button size="lg"  onClick={() => { deleteFatura(dat.id) }}className="btn btn-lg btn-outline-danger" style={{marginLeft:"5px"}} >   <FontAwesomeIcon icon={faTrash} /></Button>
          </ButtonGroup>

          
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    


  </div>
  
</div>
</form>

  ))}

 
 
    </div>
   

    );
}
 
export default withRouter (Faturat);