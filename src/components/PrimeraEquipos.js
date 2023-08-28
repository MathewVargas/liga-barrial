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
  const [equipos, setEquipos] = useState( [] )

  //2 - referenciamos a la DB firestore
  const equiposCollection = collection(db, "Equipos")
  const q1 = query(equiposCollection, where("categoria", "==", "primera"), orderBy("puntos", "desc"));


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
      title: '¿Eliminar el equipo?',
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
  useEffect( () => {
    getProducts()
    // eslint-disable-next-line
  }, [] )
  //7 - devolvemos vista de nuestro componente

  return (
    <div>
      <h1>Equipos categoría Primera</h1>
      <br></br>
      <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/crearprimera" className='btn btn-secondary mt-2 mb-2'>Crear nuevo equipo</Link>    
          </div>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Abreviatura</th>
                <th>Categoría</th>
                <th>Fundacion</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              { equipos.map( (equipo) => (
                <tr key={equipo.id}>
                  <td>{equipo.nombre_equip}</td>
                  <td>{equipo.abreviatura}</td>
                  <td>{equipo.categoria}</td>
                  <td>{equipo.fundacion}</td>
                  <td><img src= {equipo.imagen_equip} width="50" height="50"></img></td>
                  <td>
                    <Link to={`/editprimera/${equipo.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(equipo.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>


    </div>
  );
};

export default PrimeraEquipos;
