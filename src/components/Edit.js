import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db, uploadFile } from "../firebaseconfig/firebase"


const Edit = () => {
    const [ nombre_equip, setNombre ] = useState('')
    const [ imagen_equip, setImagen ] = useState('')
    const [abreviatura, setAbreviatura] = useState('')
    const [fundacion, setFundacion] = useState('')
    const [categoria, setCategoria] = useState('');
    const [gc, setGC] = useState(0);
    const [gd, setGD] = useState(0);
    const [gf, setGF] = useState(0);
    const [pe, setPE] = useState(0);
    const [pg, setPG] = useState(0);
    const [pj, setPJ] = useState(0);
    const [pp, setPP] = useState(0);
    const [puntos, setPuntos] = useState(0);

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
      };

    const navigate = useNavigate()    
    const {id} = useParams()
    const [file, setFile] = useState(null)

    const update = async (e) => {
        e.preventDefault()
        const result = await uploadFile(file);
        if(file!=null){
            const product = doc(db, "Equipos", id)
            const data = {nombre_equip: nombre_equip, imagen_equip: result, abreviatura: abreviatura, fundacion: fundacion, categoria: categoria, gc: gc, gd: gd, gf: gf, pe: pe, pg: pg, pj: pj, pp: pp, puntos: puntos }
            await updateDoc(product, data)
            console.log(result)
            navigate('/maximaAd')

        }else{
            const product = doc(db, "Equipos", id)
            const data = {nombre_equip: nombre_equip, imagen_equip: imagen_equip, abreviatura: abreviatura, fundacion: fundacion, categoria: categoria, gc: gc, gd: gd, gf: gf, pe: pe, pg: pg, pj: pj, pp: pp, puntos: puntos}
            await updateDoc(product, data)
            navigate('/maximaAd')
        }
        
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "Equipos", id) )
        if(product.exists()) {
            //console.log(product.data())
            setNombre(product.data().nombre_equip)    
            setImagen(product.data().imagen_equip)
            setAbreviatura(product.data().abreviatura)
            setFundacion(product.data().fundacion)
            setCategoria(product.data().categoria)
            setPuntos(product.data().puntos)
        }else{
            console.log('El producto no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar Equipo</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre_equip}
                            onChange={ (e) => setNombre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
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
                        <select value={categoria} onChange={handleCategoriaChange} className="form-control">
                            <option value="maxima">maxima</option>
                            <option value="primera">primera</option>
                            <option value="segunda">segunda</option>
                        </select>
                    </div>


                    <div className='mb-3'>
                        <label className='form-label'>Imagen</label>
                        <input
                            value={imagen_equip}
                            onChange={ (e)=> setImagen(e.target.value)} 
                            type="text"
                            className='form-control'
                            disabled
                        />   
                        <br></br>
                        <input
                            //value={imagen_equip}
                            onChange={e => setFile(e.target.files[0])}
                            type="file"
                            className='form-control'
                            
                        />                 
                    </div>  
                    <button type='submit' className='btn btn-primary'>Update</button>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

export default Edit