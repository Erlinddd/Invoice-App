import React, { Component } from 'react'
import {Navbar,Nav} from 'react-bootstrap'
// import Logo from '../logo123.png'

import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faList, faPlusCircle,} from '@fortawesome/free-solid-svg-icons';
 

class NavigationBar extends Component {
    render() {
        return (
            <div>
                 <Navbar bg="dark" variant="dark"  >
                     <Link to="/Welcome" className="navbar-brand">

                     FaturaApp
                     </Link>
                
                 <Nav className="mr-auto">
     
                 {/* <Link to="/add" className="nav-link" > <FontAwesomeIcon icon={faPlusCircle} size="lg"  /> {'  '} Artikuj</Link>
                 <Link to="/bleresi" className="nav-link" > <FontAwesomeIcon icon={faPlusCircle}  size="lg" /> {'  '} Bleres</Link> */}

                  <Link to="/lists" className="nav-link" > <FontAwesomeIcon icon={faList} size="lg"  /> {'  ' } Lists of Article</Link>                  
                  <Link to="/lista/bleresi" className="nav-link"> <FontAwesomeIcon icon={faList}  size="lg" />  {'  '}Lista of Consumer</Link>

            
             
                      </Nav>
            
                 </Navbar>
             
                
            </div>
        )
    }
}

export default NavigationBar
