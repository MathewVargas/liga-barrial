import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {collection, addDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db, uploadFile } from '../firebaseconfig/firebase'
import { async } from '@firebase/util'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const Create = () => {
    const [cancha, setCacha] = useState('Cancha 1')
    const [equipo1, setEquipo1] = useState('')
    const [equipo2, setEquipo2] = useState('')
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [fecha_hora, setFecha_Hora] = useState(null);
    const [jornada, setJornada] = useState(0)
    const handleCanchaChange = (e) => {
        setCacha(e.target.value);
      };

    // Función para guardar la fecha y hora en Firestore
    const guardarFechaHora = () => {
        const fechaObj = new Date(`${fecha}T${hora}`);
        const timestamp = firebase.firestore.Timestamp.fromDate(fechaObj);
        setFecha_Hora(timestamp);
    };

    const navigate = useNavigate()

    const [file, setFile] = useState(null)


    const tablaCollection = collection(db, "jornadasPrimera");
    const store = async (e) =>{
        e.preventDefault()
        const result = await uploadFile(file);
        await addDoc(tablaCollection, {cancha: cancha, equipo1:equipo1, equipo2:equipo2, fecha: fecha, hora: hora, jornada:jornada })
        navigate('/primerajornadas')
    }

    const [equipos, setEquipos] = useState([]);
    const equiposCollection = collection(db, "Equipos");
    const q1 = query(equiposCollection, where("categoria", "==", "primera"), orderBy("puntos", "desc"));

    //3 - Funcion para mostrar TODOS los docs
    const getEquipos = async () => {
        const data = await getDocs(q1);
        setEquipos(
            data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
        );
    }
//6 - usamos useEffect
useEffect(() => {
    getEquipos();
}, []);
  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Crear Equipo</h1>
                <form onSubmit={store}>

                    <div className='mb-3'>
                        <label className='form-label'>Cancha</label>
                        <select value={cancha} onChange={(e)=> setCacha(e.target.value)} className="form-control">
                            <option value="Cancha 1">Cancha 1</option>
                            <option value="Cancha 2">Cancha 2</option>
                        </select>

                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Equipo Local </label>
                        <select value={equipo1} onChange={(e) => setEquipo1(e.target.value)} className="form-control">
                        <option value="">Seleccionar equipo local</option>
                            {equipos.map((equipo) => (
                                <option key={equipo.id} value={equipo.nombre_equip}>
                                {equipo.nombre_equip}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Equipo Visitante</label>
                        <select value={equipo2} onChange={(e) => setEquipo2(e.target.value)} className="form-control">
                        <option value="">Seleccionar equipo visitante</option>
                            {equipos.map((equipo) => (
                                <option key={equipo.id} value={equipo.nombre_equip}>
                                {equipo.nombre_equip}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="mb-3">
                        <label className="form-label">Fecha</label>
                        <input
                            value={fecha}
                            onChange={(e)=> setFecha(e.target.value)}
                            type="date"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Hora</label>
                        <input
                            value={hora}
                            onChange={(e)=> setHora(e.target.value)}
                            type="time"
                            className="form-control"
                        />
                    </div>



                    <div className='mb-3'>
                        <label className='form-label'>Jornada</label>
                        <input
                        value={jornada}
                        onChange={(e)=> setJornada(e.target.value)}
                        type="number"
                        className='form-control'
                        ></input>

                    </div>
                    <button type='submit' className='btn btn-primary' onClick={guardarFechaHora}>Guardar</button>

                </form>
            </div>

        </div>

    </div>
  )
}

export default Create