import React from 'react';
import { Link } from 'react-router-dom';

// this component is what renders the navigation bar at the top of page

const NavBar = () => {
  return (
    <nav className='NavBar'>
      <div className='menuDiv'>
        <ul className='menu'>
          <li>
            <Link className='logo' to='/'>
              {/* RENAME? */}
              coolcards
            </Link>
          </li>
          {/* Go over these and see if they need to be removed or edited */}
          <li>DISCOVER</li> 
          <li>INFO</li>
          <li>DECKS</li>
          <li>LOGIN</li>
        </ul>
      </div>

      <div>
        {/* Create functionality here */}
        <input className='searchBar' placeholder='SEARCH'></input>
      </div>
    </nav>
  );
};

export default NavBar;
