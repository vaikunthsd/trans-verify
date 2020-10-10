import React from 'react';
import { DrizzleContext } from "drizzle-react";

const MyContainer = ({Component}) => (
  <DrizzleContext.Consumer>
    {({drizzle, drizzleState, initialized}) => {
      if(!initialized) {
        return 'Loading...';
      }
      return (
        <Component drizzle={drizzle} drizzleState={drizzleState} />
      );
    }}
  </DrizzleContext.Consumer>
);

export default MyContainer;
