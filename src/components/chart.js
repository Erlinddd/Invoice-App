import React, { Component } from 'react'  
import axios from 'axios';  
import {Pie} from 'react-chartjs-2';  
export class DynamicChart extends Component {  
  
  constructor(props) {  
super(props);  
this.state = { Data: {} };  
}  
componentDidMount() {  
axios.get(`https://localhost:44362/api/bleresi`)  
.then(res => {  
console.log(res);  
const ipl = res.data;  
let region = [];  
console.log("reg",region)

ipl.forEach(record => {  
  debugger;
  region.push(record.rajoniId);  
  
});  
// const found=ipl.find(element=>element.rajoniId)
// console.log(found)
this.setState({  
Data: {  
labels: [
  "TETOVE","STRUGE","SHKUP",  
  
],
 
datasets: [  
{  
  label: 'Cunsomer by region',  
  data: region,  
  backgroundColor: [  
          "#3cb371",  
          "#0000FF",  
          "#9966FF",  
      
  ]  
}  
]  
}  
});  
})  
}  
render(){
  return (  
    <div className="container">  
        <h1>Consumer  By Region</h1>
        {/* <h3 style={{color:"Green"}}>TETOVE</h3>
        <h3 style={{color:"Blue"}}>TETOVE</h3>
        <h3 style={{color:"Purple"}} >TETOVE</h3> */}
   <Pie
//  width={3}
//  height={3}
          data={this.state.Data}
          options={{
            title:{
              display:true,
              text:'Consumer Region',
              fontSize:20,
              color:"white"
            },
            legend:{
              display:true,
              position:'right'
              
            }
          }}
        />
    </div>  
    )  
    
    } 
}
 

export default DynamicChart  