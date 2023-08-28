import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc, orderBy, query, where} from 'firebase/firestore'
//import { db } from '../firebaseConfig/firebase'
import { db } from '../firebaseconfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const TablaMaxima = () => {
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
                <th>Imagen</th>
                <th>GC</th>
                <th>GD</th>
                <th>GF</th>
                <th>PE</th>
                <th>PG</th>
                <th>PJ</th>
                <th>PP</th>
                <th>Puntos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              { equipos.map( (equipo) => (
                <tr key={equipo.id}>
                  <td>{equipo.nombre_equip}</td>
                  <td>{equipo.abreviatura}</td>
                  <td><img src= {equipo.imagen_equip} width="50" height="50"></img></td>
                  <td>{equipo.gc}</td>
                  <td>{equipo.gd}</td>
                  <td>{equipo.gf}</td>
                  <td>{equipo.pe}</td>
                  <td>{equipo.pg}</td>
                  <td>{equipo.pj}</td>
                  <td>{equipo.pp}</td>
                  <td>{equipo.puntos}</td>
                  <td>
                    <Link to={`/editTablaPrimera/${equipo.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
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

export default TablaMaxima;
