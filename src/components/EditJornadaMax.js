import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {collection, getDoc, updateDoc, doc, orderBy, query, where, getDocs } from "firebase/firestore"
import { db, uploadFile } from "../firebaseconfig/firebase"
import { async } from '@firebase/util'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const Edit = () => {
    const [cancha, setCacha] = useState('Cancha 1')
    const [equipo1, setEquipo1] = useState('')
    const [equipo2, setEquipo2] = useState('')
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [fecha_hora, setFecha_Hora] = useState(null);
    const [jornada, setJornada] = useState(0)



    const navigate = useNavigate()    
    const {id} = useParams()
    const [file, setFile] = useState(null)

    // Función para guardar la fecha y hora en Firestore
    const guardarFechaHora = () => {
        const fechaObj = new Date(`${fecha}T${hora}`);
        const timestamp = firebase.firestore.Timestamp.fromDate(fechaObj);
        setFecha_Hora(timestamp);
    };

    const update = async (e) => {
        e.preventDefault()

            const product = doc(db, "jornadasmaxima", id)
            const data = {cancha: cancha, equipo1:equipo1, equipo2:equipo2, fecha: fecha, hora: hora, jornada:jornada}
            await updateDoc(product, data)
            //console.log(result)
            navigate('/maximajornadas')
   
        
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "jornadasmaxima", id) )
        if(product.exists()) {
            //console.log(product.data())
            setCacha(product.data().cancha)    
            setEquipo1(product.data().equipo1)
            setEquipo2(product.data().equipo2)
            //const fechaHora = product.data().fecha_hora.toDate();
            //const fecha = fechaHora.toLocaleDateString();
            //const hora = fechaHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
            setFecha(product.data().fecha);
            setHora(product.data().hora);
        
        
            setJornada(product.data().jornada)
        }else{
            console.log('El producto no existe')
        }
    }
    const [equipos, setEquipos] = useState([]);
    const equiposCollection = collection(db, "Equipos");
    const q1 = query(equiposCollection, where("categoria", "==", "maxima"), orderBy("puntos", "desc"));

    //3 - Funcion para mostrar TODOS los docs
    const getEquipos = async () => {
        const data = await getDocs(q1);
        setEquipos(
            data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
        );
    }


    useEffect( () => {
        getProductById(id)
        getEquipos();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar Jornada</h1>
                 <form onSubmit={update}>
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
                            type="text"
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

export default Edit