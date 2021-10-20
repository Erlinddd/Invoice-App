import React, { Component,createContext } from 'react'
import Select from 'react-select'
import axios from 'axios'
//import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Table,Button,Alert} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from 'react-router-dom';
import MyToast from './myToast'
import {motion} from 'framer-motion'
import axiosInstance from './axios'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import * as ReactBootStrap from 'react-bootstrap'

toast.configure();

export const MyContext=createContext();


 class ArticleListDDL extends Component {
  

constructor(props){
super(props)
this.state = {
items : [],
selectedItems:[],
consumer:[],
selectedConsumer:'',
data:new Date(),
totalInvoiceValue:0,
validated:false,

}



this.onEdit=this.onEdit.bind(this)
this.state.show=false

this.submitData=this.submitData.bind(this)
}


onChangeHandler=(e)=>{
  this.setState({[e.target.name]:e.target.value})
  
}



onChange=data=>{
  this.setState({data:data})
  
}

onEdit = (id, sasia) => {

var stateCopy = [...this.state.selectedItems];
//var stateCopy = this.state.selectedItems;
var obj = stateCopy.find(x=>x.value === id);
obj.sasia = sasia;
obj.vlera = sasia * obj.cmimi;

this.setState({selectedItems:stateCopy}, ()=>{
  this.getTotal();
})
// this.setState(prevState=>({
//   value:prevState.value.map(
//     obj=>(obj.id === id ?Object.assign(obj):obj)
//   )
// }))
console.log("produkti i ndryshuar",this.state.selectedItems);
}




async getArtikujt(e){

const res = await axiosInstance.get(`/artikulli`)
const data = res.data
const options = data.map(d => ({
"value" : d.id,
"label" : d.emri,
"sasia":d.sasia=1,
"cmimi":d.cmimi,
"vlera":d.sasia*d.cmimi
}))

this.setState({items: options})
this.setState({loading:true});
}

handleChange(e){

this.setState({selectedItems:e}, ()=>{
  this.getTotal();
 
});


}

componentDidMount(){
this.getArtikujt()
this.getConsumer()

}

faturaList = (props) => {return this.props.history.push(`/faturat`)};


submitData = ()=> {
  
  //event.preventDefault()
  
  let selectedItems=this.state.selectedItems;
  let selectedConsumer=this.state.selectedConsumer;
  let data=this.state.data;
  console.log("artikulli i selektuar :",this.state.selectedItems,"klienti i selektuar",this.state.selectedConsumer)
debugger;
  if(this.state.selectedItems.length === 0  ){
    alert("You must select the article")
    return;
  }
 if(isNaN(selectedConsumer) || selectedConsumer === ""){
   alert("You must select the customer")
   return;
 }
  

  var mySelectedItems = this.state.selectedItems.map(item => {
    return { Artikulli: item.label, Sasia: item.sasia, Cmimi:item.cmimi, Vlera: item.vlera };
  
  });
 
  var myState = {
    "Fatura":{
        "IdBleresi":this.state.selectedConsumer,
        "Data":this.state.data
    },
    "artikullis": mySelectedItems
 }
  axios.post('https://localhost:44362/api/fatura',myState)
  .then(response=>{
    console.log(response);
    this.setState({"show":true})
           setTimeout(() => this.setState({"show":false}), 3000);
           setTimeout(() => this.faturaList(),2000) 
           
  })
  .catch(error=>{
    console.log(error)
  })
}



async getConsumer(e) {
  axiosInstance.get(`/bleresi`)
.then(res => {
  const consumer = res.data;
  console.log("tdhenat e blersit",res)
  this.setState({ consumer });
})
}

getTotal() {
  //menyra klasike
  // var total = 0;
  // for (var i=0; i< this.state.selectedItems.length; i++) {
  //   total += this.state.selectedItems[i].cmimi * this.state.selectedItems[i].sasia;
  // }
  var total = this.state.selectedItems.reduce(function (accumulator, currentValue) {
        //the return value of the function is stored in an accumulator
          return accumulator + (currentValue.cmimi * currentValue.sasia)
  }, 0);
  this.setState({totalInvoiceValue: total});
}


render() {
  
 
const {items,selectedItems,consumer,selectedConsumer,data}=this.state;
return ( 
  <div>
  
  {this.state.loading ?    <form > 
    
    {/* <ReactBootStrap.Spinner animation="border" /> */}
    <motion.div
    // initial={{oppacity:0}}
    // animate={{oppacity:1}}
    // transition={{delay:1.5,duration:1.5}}
    initial={{x:'-100vh'}}
    animate={{x:0}}
    transition={{type:'spring',stiffness:120}}
    >
        
  
  <div>
  
  
  
    <div style={{"display":this.state.show ? "block" : "none"}}>
      
      <MyToast show = {this.state.show} message={ "Fatura u regjistrua me sukses"}   type = {"success"}/>
       </div>
   
    <Alert variant="success">
   
    <Alert.Heading>
      <h6> Create an Invoice  </h6>        
  
  <div className="date">
  
      <h6 style={{float:"right"}} >Select the Date <DatePicker date={data} onDateChange={this.onChange} locale={enGB} dateFormat="YYYY-MM-D HH:m"
     timeFormat="HH:mm">
        {({ inputProps, focused }) => (
          <input
            className={'input' + (focused ? ' -focused' : '')}
            {...inputProps}
          />
        )}
      </DatePicker></h6>
  </div>
  
      </Alert.Heading>
    
      <hr/>
      <p>Select the consumer</p>
      
      <select required  className="form-control slct"  value={selectedConsumer}  onChange={e => { this.setState({selectedConsumer: parseInt(e.target.value)}) }}  >
      
      <option value="" >Select from the list</option>
      { this.state.consumer.map((person,id) =>  <option key={id}  value={person.id}> {person.firstName} {person.lastName} </option> )} 
    </select>{''}
     
     
     
  
      {''}
      <hr/>
      
      <p>Select the article</p>
      
      <Select  options={this.state.items}  value={selectedItems} placeholder="Select article from the list... "  onChange={this.handleChange.bind(this)} isMulti  />  
  
      
  {/* //<p>You have selected <strong>{this.state.emri}</strong> whose id is <strong>{this.state.id}</strong></p> */}
  <Table striped bordered hover>
  <thead>
  <tr>
  <th>ID</th>
  <th>Name</th>
  <th>Quantity</th>
  <th>Price</th>
  <th>Value</th>
  
  
  
  </tr>
  </thead>
  <tbody>
  {
    
     this.state.selectedItems.map((item) => (
  <tr key={item.value}>
  <td>{item.value}</td>
  <td>{item.label}</td>
  
  <td>
    <input id={item.value} type="text"  className="form-control" value={item.sasia} onChange={(event) => { 
    if (event.target.value === "") event.target.value = 0; this.onEdit(parseInt(event.target.id), parseFloat(event.target.value))} }>
  
    </input>
    </td>
  
  <td>{item.cmimi}</td>
  <td id="total">{item.sasia * item.cmimi } </td>
  
  </tr>
  
        ))
    } 
   
  </tbody>
  
  </Table>
  
  <p style={{marginLeft:"820px"}}  >Vlera totale: {this.state.totalInvoiceValue}</p>
    </Alert>
   
    <Button  onClick={this.submitData}
     variant="primary" size="lg"  block >
  Submit 
  </Button>{' '}
  
  
  
  
    
  {/* </div>
  </div>
  
  
  </div> */}
  </div>
  </motion.div>
  </form>
     :  <ReactBootStrap.Spinner animation="border" />} 
 
</div>
)
}
}
export default React.memo(withRouter(ArticleListDDL));