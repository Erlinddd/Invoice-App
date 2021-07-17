import React,{useState} from 'react'

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import {Container,Row,Col} from 'react-bootstrap'
import Footer from './components/Footer'
import AddArticle from './components/AddArticle';
import ArticleLists from './components/ArticleLists';
import {BrowserRouter as Router,Switch,Route,Redirect,location,useLocation} from 'react-router-dom'
import UserList from './components/UserList';
import AddConsumer from './components/AddConsumer';
import EditConsumer from './components/EditConsumer';
import Faturat from './components/Faturat';
import FaturaCard from './components/FaturaCard';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import ArticleListDDL  from './components/ArticleListDDL';
import NotFound from './components/NotFound';
import ThemeContextProvider from './context/ThemeContextProvider';

const App=({props})=> {
  
  
  const marginTop={
marginTop:"20px"

  };
const nav={
 marginBottom:"30px"
}

 return (

  

    <Router >
  
          <Container>
            <Row>
              <Col lg={12} style={marginTop}>
               <Switch>
              
             

               <Route  exact path="/" component={Login} >
                 <Login/>
               </Route>
            

         

               <Route path="/Registration">
            <RegistrationForm/>
          </Route>
          
          <div style={nav}>
           

        
        
              <NavigationBar/>
      
         
              <br/>
              <br/>
              <br/>
          <Route path="/bleresi">
            <AddConsumer />
          </Route>
        
          <Route path="/faturaCard/:id">
            <FaturaCard />
          </Route>
         
    
          <Route path="/add">
            <AddArticle />
          </Route>   
          <Route path="/lists" component={ArticleLists}>
         
          </Route>
          <Route  path="/edit/:id">
            <AddArticle />
          </Route>
          <Route   path="/Welcome">
            <Welcome />
         
          </Route>


         
          <Route   path="/faturat">
            <Faturat />
          </Route>

          <Route   path="/lista/bleresi">
            <UserList />
          </Route>
          <Route  path="/editt/bleresi/:id">
            <EditConsumer />
          </Route>
         
       
          
          </div>
   
          <Route  component={NotFound} /> 
               </Switch>
          
              </Col>
            </Row>
           
      
          </Container>
        

    </Router>
    
  );
}

export default App;
