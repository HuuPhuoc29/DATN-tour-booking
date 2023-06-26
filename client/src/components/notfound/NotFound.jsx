import "./notfound.css";
import React from 'react';

const NotFoundPage = () => {
  return (
    <div id="container" className="nfContainer">
      <div className="nfContent">
        <h1 className="nfTitle">404 - Page Not Found</h1>
        <p className="nfMessage">Oops! The page you are looking for does not exist.</p>
        <p className="nfP">The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved.</p>
        <a className="nfHome-link" href="/">Go back to Home</a>
      </div>
      <div className="illustration"></div>
    </div>
  );
};

export default NotFoundPage;