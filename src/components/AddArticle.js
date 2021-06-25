import React, { Component } from 'react'
import {Card,Form,Button,Col} from 'react-bootstrap'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import {withRouter} from 'react-router-dom';
import MyToast from './myToast'


  class AddArticle extends Component {
    
    constructor(props) {
        super(props) 
           
        this.state = this.initialState
        this.state.show=false;
        this.artikulliChange=this.artikulliChange.bind(this);
        this.submitArtikulli=this.submitArtikulli.bind(this);
        this.artikulliList=this.artikulliList.bind(this);
        this.updateArticle=this.updateArticle.bind(this);
   
    }
    initialState={
            id:0,
            emri:'',
            cmimi:'',
            sasia:'',
            vlera:'',
    } 
    
    componentDidMount(){
       const {id}=this.props.match.params
        if(id){
            this.artikulliById(id);   
        }
    }

    artikulliById=(id)=>{
        if (this.props.match && this.props.match.params.id){
        axios.get('https://localhost:44362/api/artikulli/'+ id)
        .then(response=>{
            if(response.data!=null){
                this.setState(
                    response.data
         )
      }
        }).catch ((error)=>{
            console.error("error:"+error)  
        });
    }}

    submitArtikulli(event){
       
        event.preventDefault()
        
        axios.post("https://localhost:44362/api/artikulli", this.state,{ crossDomain: true })
      .then(response => {
       if(response.data != null){
        console.log(response.data)

           this.setState({"show":true})
           setTimeout(() => this.setState({"show":false}), 3000);
           setTimeout(() => this.artikulliList(),2000)
       } else {
        this.setState({"show":false })
       }
      
      }).catch ((error)=>{
        console.error("error:"+error)
    
    });

    
    }

    updateArticle(event){
        event.preventDefault()
        axios.put(`https://localhost:44362/api/artikulli/${this.state.id}`, this.state)
      .then(response => {
       if(response.data != null){
        console.log(response.data)

           this.setState({"show":true})
        

           setTimeout(() => this.setState({"show":false}), 3000);
           setTimeout(() => this.artikulliList(),2000)
       } else {
        this.setState({"show":false })
       }
      
      }).catch ((error)=>{
        console.error("error:"+error)
    
    });

    }
   
    resetArtikulli=()=>{
        this.setState(()=>this.initialState)
    }

artikulliChange = event => { 
    if (event.target.name == "emri") {
        this.setState({ [event.target.name]: event.target.value })
    }
    else {
        this.setState({ [event.target.name]: parseInt(event.target.value) })
    }
    
}

artikulliList = (props) => {return this.props.history.push(`/lists`)};
    
    render() {
        return (
            <div>
 <div style={{"display":this.state.show ? "block" : "none"}}>
<MyToast show = {this.state.show} message={this.state.id ? "Artikulli ndryshoj me sukses" : "Artikulli u shtua me sukses"} type = {"success"}/>
 </div>
  <Card className={"border border-dark bg-dark text-white"}>

<Card.Header>  <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />    {this.state.id ? "Ndrysho artikuj":"Shto Artikuj"}  </Card.Header>
<Form   onReset={this.resetArtikulli} onSubmit={this.state.id ? this.updateArticle : this.submitArtikulli} id="artikulliFormId">
<Card.Body>
    <Form.Row>
    <Form.Group as={Col} controlId="formGridArtikulli" >

<Form.Label>Artikulli</Form.Label>
<Form.Control autoComplete="off" value={this.state.emri} onChange={this.artikulliChange} required name="emri" className="bg-dark text-white" type="text" placeholder="Article name" />
</Form.Group>

<Form.Group as={Col} controlId="formGridCmimi">
<Form.Label>Cmimi</Form.Label>
<Form.Control required  className="bg-dark text-white" name="cmimi" type="number" placeholder="Price" 
value={this.state.cmimi} onChange={this.artikulliChange}
/>
</Form.Group>

</Form.Row>
<Form.Row>
<Form.Group as={Col} controlId="formGridSasia" >
<Form.Label>Sasia</Form.Label>
<Form.Control 
value={this.state.sasia} onChange={this.artikulliChange}
required name="sasia" className="bg-dark text-white" type="Number" placeholder="Quantity" />

</Form.Group>
<Form.Group as={Col} controlId="formGridVlera">
<Form.Label>Vlera</Form.Label>
<Form.Control value={this.state.vlera} onChange={this.artikulliChange} name="vlera" className="bg-dark text-white" type="number" placeholder="Value" />

</Form.Group>

    </Form.Row>
    </Card.Body>
<Card.Footer style={{textAlign:"center"}}>
    <Button  size="sm" variant="success" type="submit"
    >
    <FontAwesomeIcon icon={faSave} /> 
      {''}  {this.state.id ? "Update":"Submit"}   </Button> {""}

       <Button  size="sm" variant="info" type="reset">
       <FontAwesomeIcon icon={faUndo}/> Reset
       </Button>{"  "}

       {""}

       <Button onClick={this.artikulliList.bind()} size="sm" variant="info" type="button">
       <FontAwesomeIcon icon={faList}/>  List
       </Button>

    </Card.Footer>
    </Form>
    </Card>
         </div>
        )
    }
}


export default withRouter (AddArticle)