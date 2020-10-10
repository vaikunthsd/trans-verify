import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home'; 
import SignTranscript from './SignTranscript'; 
import VerifyTranscript from './VerifyTranscript';

export default ({ accounts, drizzle, drizzleState }) => (
  <div className="App">

    <BrowserRouter>
      <Menu />
      <Route exact path='/' component={Home}/>
      <Route 
        path='/sign-transcript' 
        render={routeProps => (
          <SignTranscript 
            {...routeProps} 
            drizzle={drizzle} 
            drizzleState={drizzleState}/>
        )}
      />
      <Route 
        path='/verify-transcript' 
        render={routeProps => (
          <VerifyTranscript 
            {...routeProps} 
            drizzle={drizzle} 
            drizzleState={drizzleState}/>
        )}
      />
    </BrowserRouter>

    {/*
    <VerifyRecord 
      drizzle={drizzle} 
      drizzleState={drizzleState}
    />

    <br />

    <GetRecord 
      drizzle={drizzle} 
      drizzleState={drizzleState}
    />

    <br />

    <AddRecord 
      drizzle={drizzle} 
      drizzleState={drizzleState}
    /> */}

  </div>
);
