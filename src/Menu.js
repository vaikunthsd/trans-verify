import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Menu = () => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <NavLink exact activeClassName="active" className="nav-link" to="/" >Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink activeClassName="active" className="nav-link" to="/sign-transcript" >Sign Transcript</NavLink>
    </li>
    <li className="nav-item">
      <NavLink activeClassName="active" className="nav-link" to="/verify-transcript" >Verify Transcript</NavLink>
    </li>
  </ul>
);

export default Menu;
