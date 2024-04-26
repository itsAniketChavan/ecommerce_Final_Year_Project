// import React from "react";
// import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/logo.png";
// 
// const options = {
//   
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link5Text: "Login",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//    
//   link1AnimationTime:"0.3",
//   link2AnimationTime:"0.4",
//   link3AnimationTime:"0.5",
//   link4AnimationTime:"0.6",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
//   profileIconAnimationTime:"0.6",
//   searchIconAnimationTime:"0.6",
//   cartIconAnimationTime:"0.6",
// };
// 
// const Header = () => {
//   
//   return <ReactNavbar {...options} style={{ transition: "0.2s" }} />;
// };
// 
// export default Header;


import React from 'react';
import './Header.css'; // Import CSS file for styling
import logo from '../../../assests/images/logo.png'; 
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (

    
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
        <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <ul className="navbar-nav">
        <li className="nav-item">
            <a href="/">Home</a>
          </li>
          {/* <li className="nav-item">
            <a href="/login">Login</a>
          </li> */}
           {!isAuthenticated && (
            <li className="nav-item">
              <a href="/login">Login</a>
            </li>
          )}
           <li className="nav-item">
            <a href="/products">Products</a>
          </li>
          <li className="nav-item">
            <a href="/cart">Cart</a>
          </li>
          <li className="nav-item">
            <a href="/barcode">Barcode Scanner</a>
          </li>
          <li className="nav-item">
            <a href="/about">About</a>
          </li>
          <li className="nav-item">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
