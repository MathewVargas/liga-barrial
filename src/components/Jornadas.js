import React from 'react';
import imageJornadas from '../img/cal.png';
import imagePrimera from '../img/prim.png';
import imageSegunda from '../img/seg.png';
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
      <div>
        <h1>Jornadas por categoría</h1>
        <br />
  
        <div className="row">
          <div className="col">
            <div className="card">
              <Link to="/maximajornadas" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black' }}>Máxima</h5>
                  <img className="card-img-top" src={imageJornadas} alt="Máxima" />
                  <p className="card-text" style={{ color: 'black' }}>Jornadas categoria maxima San Carlos</p>
                </div>
              </Link>
            </div>
          </div>
  
          <div className="col">
            <div className="card">
              <Link to="/primerajornadas" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black' }}>Primera</h5>
                  <img className="card-img-top" src={imageJornadas} alt="Primera" />
                  <p className="card-text" style={{ color: 'black' }}>Jornadas categoria primera San Carlos</p>
                </div>
              </Link>
            </div>
          </div>
  
          <div className="col">
            <div className="card">
              <Link to="/segundajornadas" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black' }}>Segunda</h5>
                  <img className="card-img-top" src={imageJornadas} alt="Segunda" />
                  <p className="card-text" style={{ color: 'black' }}>Jornadas categoria segunda San Carlos</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Dashboard;
