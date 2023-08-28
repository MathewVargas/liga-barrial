import React from 'react';
import imageMaxima from '../img/max.png';
import imagePrimera from '../img/prim.png';
import imageSegunda from '../img/seg.png';
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
      <div>
        <h1>Tabla de posiciones por categoría</h1>
        <br />
  
        <div className="row">
          <div className="col">
            <div className="card">
              <Link to="/TablaMaxima" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black' }}>Máxima</h5>
                  <img className="card-img-top" src={imageMaxima} alt="Máxima" />
                  <p className="card-text" style={{ color: 'black' }}></p>
                </div>
              </Link>
            </div>
          </div>
  
          <div className="col">
            <div className="card">
              <Link to="/TablaPrimera" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black' }}>Primera</h5>
                  <img className="card-img-top" src={imagePrimera} alt="Primera" />
                  <p className="card-text" style={{ color: 'black' }}></p>
                </div>
              </Link>
            </div>
          </div>
  
          <div className="col">
            <div className="card">
              <Link to="/TablaSegunda" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black' }}>Segunda</h5>
                  <img className="card-img-top" src={imageSegunda} alt="Segunda" />
                  <p className="card-text" style={{ color: 'black' }}></p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Dashboard;
