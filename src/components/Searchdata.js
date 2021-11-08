import React, { Component } from 'react'  
import moment from 'moment'
import axios from "axios";  
import {withRouter} from 'react-router-dom'
import {Button,ButtonGroup,Fade} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axiosInstance from './axios'
import DatePicker from "react-datepicker";    
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";    
import {Link} from 'react-router-dom'
import { debuggerStatement } from '@babel/types';
import DynamicChart from './chart';
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export class Searchdata extends Component {  
constructor(props) {  
super(props)  

this.state = {  
    columnDefs:[
  {headerName:"firstName",field:"firstname"},
  {headerName:"lastName",field:"lastname"},
    ],
faturadate: [],  
startdate: '' ,  
enddate:'',
fatura:'',
rowData:null,
}  
}  
Changedate = (e) => {    
this.setState({    
startdate: e    
});    
};  
enddate = (e) => {    
this.setState({    
enddate: e    
});    
};  
componentDidMount() {  
debugger;
axiosInstance.get('/fatura').then(response => {  
console.log('faturat',response.data);  
this.setState({  
faturadate: response.data  
});  
});  
}  



getById=async(event)=>{
let IdFatura = event.currentTarget.id.split('_')[1];
const response=await 
axiosInstance.get(`/fatura/` + IdFatura)
this.setState(response.data)
localStorage.setItem("FaturaEselektuar",JSON.stringify(response.data))
console.log(response.data)

return this.props.history.push('/faturaCard/'+IdFatura)
}


onsubmit = (e) => {    
debugger;  

e.preventDefault();
var startDate =  this.state.startdate.getFullYear() + "-" + (this.state.startdate.getMonth() + 1) + "-" + this.state.startdate.getDate();
var endDate =  this.state.enddate.getFullYear() + "-" + (this.state.enddate.getMonth() + 1) + "-" +  this.state.enddate.getDate();
axiosInstance.get(`/fatura/GetByDates${'?from=' + startDate + '&to=' + endDate}`).then(response => {  
console.log('getbydates',response.data);  
this.setState({  
faturadate: response.data  
})
});  
}    

deleteFatura = (idFatura) => {  
axiosInstance.delete('/fatura/' + idFatura)  
.then((result) => {  
alert("Deleted succesfully") 
return this.props.history.push('/Welcome');

});  
};


render() {  
return (  
<div className="text-white">  
<div className="row text-white " >  

</div>  
<form onSubmit={this.onsubmit}>  
<div className="row hdr text-white " >  
<div className="col-sm-3 form-group text-white ">  </div>  
<div className="col-sm-3 form-group text-white ">  
<DatePicker className="form-control"    required
        selected={this.state.startdate}  dateFormat="yyyy-MM-dd"    placeholderText="Select Date" showPopperArrow={false}    
        onChange={this.Changedate}    
/>    
</div>  
<div className="col-sm-3 form-group">  
<DatePicker className="form-control"    required
        selected={this.state.enddate}  dateFormat="yyyy-MM-dd"  placeholderText="Select Date" showPopperArrow={false}    
        onChange={this.enddate}    
/>    
</div>  
<div className="col-sm-3 form-group">  
    <button type="submit" className="btn btn-success" >Search</button>  
</div>  
</div>  
</form>  
<table className="table">  
<thead className="thead-dark">  
<tr>  
    <th scope="col">Id</th>  
    <th scope="col">Cosumer</th>  
    <th scope="col">Date</th>  
    <th scope="col">Print the invoice</th>
    <th scope="col">Delete the invoice</th>
    
</tr>  
</thead>  
<tbody>  
{  
this.state.faturadate.length===0 ?
    <tr align="center">
      <td colSpan="6" className="text-white"> There are no invoice to show between selected date </td>
    </tr> :
this.state.faturadate.map((p, index) => {  
return  <tr key={index}>  
    <th className="text-white" scope="row">{p.id}</th>  
    <td  className="text-white">{p?.bleresi?.firstName}</td>  
    <td  className="text-white" >{ moment(p.data).format("YYYY-MM-DD hh:mm")}</td>  
<td  className="text-white" ><Link  onClick={this.getById}  id={"btn_"+p.id} className="btn btn-lg btn-outline-primary text-white" >Printo Fakturen</Link>{' '}</td>
<td><ButtonGroup>
<Button size="lg"  onClick={() => { this.deleteFatura(p.id) }} className="btn btn-lg btn-outline-danger" style={{marginLeft:"5px"}} >  <FontAwesomeIcon icon={faTrash} /></Button>
</ButtonGroup></td>
</tr>  
})   
}  

</tbody>  
</table>  

<DynamicChart/>

</div>  
)  
}  
}  

export default withRouter (Searchdata)  
