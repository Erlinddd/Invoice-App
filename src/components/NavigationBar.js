import React, { Component } from 'react'
import {Navbar,Nav,Button,Container} from 'react-bootstrap'
// import Logo from '../logo123.png'
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faList, faSignOut,} from '@fortawesome/free-solid-svg-icons';
import {motion}  from 'framer-motion'

class NavigationBar extends Component {
    constructor(props){
       
        super(props) 
        this.artikulliList=this.artikulliList.bind(this);
       
    }

    
    artikulliList = (props) => {
        localStorage.clear()
        return this.props.history.push(`/`)};
    render() {
     
        return (
            
            <motion.div 
            initial={{y:-250}}
            animate={{y:-7}}
            transition={{type:'spring',stiffness:100}}>
          
                <Navbar bg="light" expand="lg">
  <Container>
     <Link to="/Welcome" className="navbar-brand">

                     FaturaApp
                     </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
         <Link to="/lists" className="nav-link" > <FontAwesomeIcon icon={faList} size="lg"  /> {'  ' } Lists of Article</Link>                  
                  <Link to="/lista/bleresi" className="nav-link"> <FontAwesomeIcon icon={faList}  size="lg" />  {'  '}Lists of Costumer</Link>
                  <Link to="/faturat" className="nav-link"> <FontAwesomeIcon icon={faList}  size="lg" />  {'  '}Lists of reports</Link>
   <Button  variant="info" >Hello {localStorage.getItem("user")}</Button> 
                     
                      <Button style={{marginLeft:"5px"}} variant="secondary"   onClick={this.artikulliList}> Log Out</Button>
     
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
            </motion.div>
        )
    }
}

export default withRouter( NavigationBar)
