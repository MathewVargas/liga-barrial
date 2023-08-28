import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {collection, addDoc,  orderBy, query, where, getDocs} from 'firebase/firestore'
import { db, uploadFile, uploadFoto } from '../firebaseconfig/firebase'
import { async } from '@firebase/util'


const Create = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [numero, setNumero] = useState(0)
    const [foto, setFundacion] = useState('')
    const [categoria, setCategoria] = useState('primera');
    const [equipo, setEquipo] = useState('');
    const [goles, setGoles] = useState(0);
    
    const [isEditable, setIsEditable] = useState(false);
    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
      };

    const navigate = useNavigate()

    const [file, setFile] = useState(null)


    const jugadoresCollection = collection(db, "jugadores")
    const store = async (e) =>{
        e.preventDefault()
        const result = await uploadFoto(file);
        await addDoc(jugadoresCollection, {nombre: nombre, foto: result, apellido: apellido, numero: numero, categoria: 'primera', goles: 0, equipo: equipo })
        navigate('/prim')
    }

    const [equipos, setEquipos] = useState([]);
    const equiposCollection = collection(db, "Equipos");
    const q1 = query(equiposCollection, where("categoria", "==", "primera"));


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
                <h1>Crear Jugador</h1>
                <form onSubmit={store}>

                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                        value={nombre}
                        onChange={(e)=> setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Apellido</label>
                        <input
                        value={apellido}
                        onChange={(e)=> setApellido(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Equipo</label>
                        <select value={equipo} onChange={(e) => setEquipo(e.target.value)} className="form-control">
                        <option value="">Seleccionar equipo </option>
                            {equipos.map((equipo) => (
                                <option key={equipo.id} value={equipo.nombre_equip}>
                                {equipo.nombre_equip}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="mb-3">
                        <label className="form-label">Número</label>
                        <input
                            value={numero}
                            onChange={(e)=> setNumero(e.target.value)}
                            type="text"
                            className="form-control"
                           // readOnly // Desactiva la edición del campo
                        />
                    </div>


                    <div className='mb-3'>
                        <label className='form-label'>Imagen</label>
                        <input
                        //value={imagen_equip}
                        //onChange={(e)=> setImagen(e.target.value)}
                        onChange={e => setFile(e.target.files[0])}
                        type="file"
                        className='form-control'
                        ></input>

                    </div>
                    <button type='submit' className='btn btn-primary'>Guardar</button>

                </form>
            </div>

        </div>

    </div>
  )
}

export default Create