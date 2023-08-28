import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "./sidebar.css";


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
      {
        path: "/categorias",
        name: "Equipos",
        icon: <FaTh />,
      },
      {
        path: "/jornadas",
        name: "Jornadas",
        icon: <FaRegChartBar />,
      },
      {
        path: "/jugadores",
        name: "Jugadores",
        icon:  <FaUserAlt />,
      },
      {
        path: "/Tablas",
        name: "Tabla de posiciones",
        icon:  <FaThList />,
      },
      {
        path: "/register",
        name: "Registro",
        icon:  <FaUserAlt />,
      },

    ];
    
    return (
      <div className="custom-container">
        <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
            <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    );
  };
  

export default Sidebar;