import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc, orderBy, query, where} from 'firebase/firestore'
//import { db } from '../firebaseConfig/firebase'
import { db } from '../firebaseconfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Dashboard = () => {
  //1 - configuramos los hooks
  const [equipos, setEquipos] = useState( [] )
  const [resultado, setResultado] = useState('');

  const handleClick = () => {
    const resultado = 'valor del resultado'; // Aquí debes establecer el valor real del resultado
    setResultado(resultado);
  };

  //2 - referenciamos a la DB firestore
  const equiposCollection = collection(db, "Equipos")
  const q1 = query(equiposCollection, where("categoria", "==", "maxima"), orderBy("puntos", "desc"));


  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async ()   => {
   const data = await getDocs(q1)
   //console.log(data.docs)
   setEquipos(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(products)
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
   const productDoc = doc(db, "Equipos", id)
   await deleteDoc(productDoc)
   getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteProduct(id)               
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })    
  }
  //6 - usamos useEffect
  useEffect( () => {
    getProducts()
    // eslint-disable-next-line
  }, [] )
  //7 - devolvemos vista de nuestro componente

  return (
    <div>
    <h1>Equipos categoría Máxima</h1>
    <div className="container">
      <div className="row">
        {equipos.map((equipo) => (
          <div className="col-md-3 mb-4" key={equipo.id}>
            <Link to={`/jugadoresMax/${encodeURIComponent(equipo.nombre_equip)}`} className="card-link" style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-img-container">
                  <img src={equipo.imagen_equip} className="card-img-top custom-img" alt={equipo.nombre_equip} style={{ width: '100px', height: '100px' }} />
                </div>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black' }}>{equipo.nombre_equip}</h5>
                  <p className="card-text" style={{ color: 'black' }}>Categoría: {equipo.categoria}</p>
                  <p className="card-text" style={{ color: 'black' }}>Fundación: {equipo.fundacion}</p>
                  
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
