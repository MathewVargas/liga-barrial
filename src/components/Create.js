import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {collection, addDoc } from 'firebase/firestore'
import { db, uploadFile } from '../firebaseconfig/firebase'
import { async } from '@firebase/util'


const Create = () => {
    const [nombre_equip, setNombre] = useState('')
    const [imagen_equip, setImagen] = useState('')
    const [abreviatura, setAbreviatura] = useState('')
    const [fundacion, setFundacion] = useState('')
    const [categoria, setCategoria] = useState('maxima');
    const [gc, setGC] = useState(0);
    const [gd, setGD] = useState(0);
    const [gf, setGF] = useState(0);
    const [pe, setPE] = useState(0);
    const [pg, setPG] = useState(0);
    const [pj, setPJ] = useState(0);
    const [pp, setPP] = useState(0);
    const [puntos, setPuntos] = useState(0);
    const [isEditable, setIsEditable] = useState(false);
    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
      };

    const navigate = useNavigate()

    const [file, setFile] = useState(null)


    const equiposCollection = collection(db, "Equipos")
    const store = async (e) =>{
        e.preventDefault()
        const result = await uploadFile(file);
        await addDoc(equiposCollection, {nombre_equip: nombre_equip, imagen_equip: result, abreviatura: abreviatura, fundacion: fundacion, categoria: categoria, gc: 0, gd: 0, gf: 0, pe:0, pg: 0, pj: 0, pp: 0, puntos: 0 })
        navigate('/maximaAd')
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Crear Equipo</h1>
                <form onSubmit={store}>

                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                        value={nombre_equip}
                        onChange={(e)=> setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Abreviatura</label>
                        <input
                        value={abreviatura}
                        onChange={(e)=> setAbreviatura(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Fundacion</label>
                        <input
                        value={fundacion}
                        onChange={(e)=> setFundacion(e.target.value)}
                        type="date"
                        className='form-control'
                        ></input>

                    </div>

                    <div className="mb-3">
                        <label className="form-label">Categoría</label>
                        <input
                            value={categoria}
                            onChange={(e)=> setCategoria(e.target.value)}
                            type="text"
                            className="form-control"
                            readOnly // Desactiva la edición del campo
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