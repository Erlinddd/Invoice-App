import React,{useState,useEffect}from 'react'

import {Button,ButtonGroup,Fade} from 'react-bootstrap'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from './axios'
import { enGB } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

const marginBottom={
    marginBottom:"20px",
  marginLeft:"30px"};
   
function Faturat (props)  {

    const[data,setData]=useState([{}])
    const[faturabyDates,setfaturabyDates]=useState([])
    const [fatura,setFatura]=useState([])
    const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
    
    useEffect(() => {          
        const GetData = async () => {  
          const result = await 
          axiosInstance.get(`/fatura`);  
          setData(result.data); 
          console.log(result.data)
        };  
        GetData(); 
        
    },[])
      const getById=async(event)=>{
      let IdFatura = event.currentTarget.id.split('_')[1];
      const response=await 
      axiosInstance.get(`/fatura/` + IdFatura)
      setFatura(response.data)
      localStorage.setItem("FaturaEselektuar",JSON.stringify(response.data))
      console.log(response.data)
      //alert("get by id")
      props.history.push('/faturaCard/'+IdFatura)
    }
    
    const deleteFatura = (idFatura) => {  
      
axiosInstance.delete('/fatura/' + idFatura)  
        .then((result) => {  
       alert("Deleted succesfully") 
       props.history.push('/Welcome');

        });  
    };

    const onsubmit= async (e)=>{
      e.preventDefault()
      const response=await
      axiosInstance.get('/fatura/getbydates');
      setfaturabyDates(response.faturabyDates);
      console.log("datebtdates",response.data)

    }
 
    return ( 
     
        <div >
           Number of invoices :{data.length}
          <div>

      
         <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      //minimumDate={new Date()}
     
      minimumLength={1}
      format='dd MMM yyyy'
      locale={enGB}
    >
      {({startDateInputProps, endDateInputProps, focus }) => (
        <div className='date-range'>
          <input style={{marginLeft:"40px"}}
            className={'input' + (focus === START_DATE ? ' -focused' : '')}
            {...startDateInputProps}
            placeholder='Start date'
          />
          
          <span className='date-range_arrow' />
          <input  style={{marginLeft:"650px"}}
            className={'input' + (focus === END_DATE ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='End date'
          />
        </div>

      )}
    </DateRangePicker>
    <button onClick={onsubmit}>Click me</button>
    <br/>
    </div>
    
  {data.map((dat, index) => (

    

<form >
<div className="card text-center" style={marginBottom}>
  <div className="card-header">
   <h2>FaturaID: {dat.id}  </h2>
  </div>
  <div className="card-body">
    <h5 className="card-title"></h5>

    {/* <p className="card-text"><h3>Koha e faktures: {dat.data}</h3>  <h5>Bleresi: {data.length > 0 ? dat.bleresi.firstName : null}</h5></p> */}
    <p className="card-text"><h3>Koha e faktures: { moment(dat.data).format("YYYY-MM-DD hh:mm")}</h3>  <h5>Bleresi: { dat?.bleresi?.firstName}</h5></p>
   
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