import React, { useState, useEffect } from 'react'
import { Link, useParams   } from 'react-router-dom'
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
  const { nombreEquipo } = useParams();


  //2 - referenciamos a la DB firestore
  const equiposCollection = collection(db, "jugadores")
  const q1 = query(equiposCollection, where("equipo", "==", nombreEquipo));



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
   const productDoc = doc(db, "jugadores", id)
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
      <h1>Jugadores categoría Segunda</h1>
      <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/crearjugadorSeg" className='btn btn-secondary mt-2 mb-2'>Crear nuevo jugador</Link>    
          </div>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Equipo</th>
                <th>Número</th>
                <th># Goles</th>
                <th>Foto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              { equipos.map( (equipo) => (
                <tr key={equipo.id}>
                  <td>{equipo.nombre}</td>
                  <td>{equipo.apellido}</td>
                  <td>{equipo.equipo}</td>
                  <td>{equipo.numero}</td>
                  <td>{equipo.goles}</td>
                  <td><img src= {equipo.foto} width="50" height="50"></img></td>
                  <td>
                    <Link to={`/editJugadorSegunda/${equipo.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
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

export default Dashboard;
