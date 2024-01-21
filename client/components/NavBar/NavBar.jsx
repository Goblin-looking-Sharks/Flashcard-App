import React from 'react';

const NavBar = () => {
  // Create handler function for onClick (will need to make a fetch request)
  const handleClick = async () => {
    await fetch('http://localhost:3000/');
  };

  return (
    <div>
      <ul>
        <li>
          <a href='/' onClick={handleClick}>
            Home
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
