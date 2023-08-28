import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc, orderBy, query, where} from 'firebase/firestore'
//import { db } from '../firebaseConfig/firebase'
import { db } from '../firebaseconfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const PrimeraEquipos = () => {
  //1 - configuramos los hooks
const [JornadasMax, setTabla] = useState([]);
const [equipos, setEquipos] = useState([]);

//2 - referenciamos a la DB firestore
const tablaCollection = collection(db, "jornadasPrimera");
const escudosCollection = collection(db, "Equipos");

//3 - Funcion para mostrar TODOS los docs
const getProducts = async ()   => {
    const data = await getDocs(tablaCollection);
    setTabla(
        data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
    );
}

const getEquipos = async () => {
    const data = await getDocs(escudosCollection);
    setEquipos(
        data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
    );
}
//4 - Funcion para eliminar un doc
const deleteProduct = async (id) => {
    const productDoc = doc(db, "jornadasPrimera", id)
    await deleteDoc(productDoc)
    getProducts()
   }
   //5 - Funcion de confirmacion para Sweet Alert 2
   const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar la jornada?',
      text: "No pdras revertir esto!",
      icon: 'advertencia',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteProduct(id)               
        Swal.fire(
          'Eliminado!',

        )
      }
    })    
  }

//6 - usamos useEffect
useEffect(() => {
    getProducts();
    getEquipos();
}, []);
  //7 - devolvemos vista de nuestro componente

  return (
    <div>
    <h1>Jornadas categoría Primera</h1>
    <br />
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/crearJornadaPrimera" className='btn btn-secondary mt-2 mb-2'>Crear nueva Jornada</Link>
          </div>
          <div className="card-container row">
            {JornadasMax.map((jornada) => (
              <div className="col" key={jornada.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Jornada: Fecha {jornada.jornada}</h5>
                    <div className="d-flex align-items-center justify-content-around">
                      <div className="text-center">
                        <img
                          src={
                            equipos.find(
                              (equipo) => equipo.nombre_equip === jornada.equipo1
                            )?.imagen_equip || "ruta/imagen/por/defecto"
                          }
                          alt="Equipo 1"
                          className="card-img-top" style={{ maxHeight: '100px', maxWidth: '100px' }}
                        />
                        <p className="card-text">{jornada.equipo1}</p>
                      </div>
                      <div className="text-center">
                          <h1 className="vs">VS</h1>
                        </div>
                      <div className="text-center">
                        <img
                          src={
                            equipos.find(
                              (equipo) => equipo.nombre_equip === jornada.equipo2
                            )?.imagen_equip || "ruta/imagen/por/defecto"
                          }
                          alt="Equipo 2"
                          className="card-img-top" style={{ maxHeight: '100px', maxWidth: '100px' }}
                        />
                        <p className="card-text">{jornada.equipo2}</p>
                      </div>
                    </div>
                    <p className="card-text">{jornada.cancha}</p>
                    <p className="card-text">
                      <span className="d-block">Fecha: {jornada.fecha}</span>
                      <span className="d-block">Hora: {jornada.hora}</span>
                    </p>

                    <div className="card-actions">
                      <Link to={`/editJornadaPrimera/${jornada.id}`} className="btn btn-light">
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <button onClick={() => confirmDelete(jornada.id)} className="btn btn-danger">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PrimeraEquipos;
