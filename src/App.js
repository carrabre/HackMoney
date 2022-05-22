// import logo from './logo.svg';
import React,{useState,useContext} from 'react';
import './App.css';
import Home from './components/home';
import {BrowserRouter as Router,Route,Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import MasterForm from './components/MasterForm';
import Bonds from './components/Bond';
import PopupModal from './components/Popup';
import Dbps from './components/Dbptop';
import Graphmodal from './components/Graph';
import Graph2 from './components/Graph2';
import AddLiquidity from './components/addLiquidity'
import { Container } from "react-bootstrap";
localStorage.setItem("theme", "dark");



function App(props) {
  return (

    
    <Router>
    <div className="App">
      <Container>

        
  <Routes>
    <> 
      <Route path='/' state={props.address} element={<Home/>}></Route>
      <Route path='/home' state={props.address} element={<Home/>}></Route>
      <Route path='/bonds'state={props.address}  element={<Bonds/>}></Route> 
      <Route path='/form'state={props.address}  element={<MasterForm/>}></Route>
      <Route path='/popup'state={props.address}  element={<PopupModal/>}></Route>
      <Route path='/topbutton'state={props.address} element={<Dbps/>}></Route>
      <Route path='/bargraph'state={props.address}  element={<Graphmodal/>}></Route>
      <Route path='/bargraph2'state={props.address}  element={<Graph2/>}></Route>
      <Route path='/addliquidity'state={props.address}  element={<AddLiquidity/>}></Route>
    </>
  </Routes>
  </Container>
   </div>
</Router>
  );
}

export default App;
