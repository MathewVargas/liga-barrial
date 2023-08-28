import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db, uploadFile } from "../firebaseconfig/firebase"


const EditTablaPrimera = () => {
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

            const product = doc(db, "Equipos", id)
            const data = { gc: gc, gd: gd, gf: gf, pe: pe, pg: pg, pj: pj, pp: pp, puntos: puntos}
            await updateDoc(product, data)
            navigate('/TablaPrimera')
   
        
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
            setGC(product.data().gc)
            setGD(product.data().gd)
            setGF(product.data().gf)
            setPE(product.data().pe)
            setPG(product.data().pg)
            setPJ(product.data().pj)
            setPP(product.data().pp)
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
                            disabled
                        />
                    </div>  

                    <div className='mb-3'>
                        <label className='form-label'>GC</label>
                        <input
                        value={gc}
                        onChange={(e)=> setGC(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>  

                    <div className='mb-3'>
                        <label className='form-label'>GD</label>
                        <input
                        value={gd}
                        onChange={(e)=> setGD(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>GD</label>
                        <input
                        value={gd}
                        onChange={(e)=> setGD(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>GF</label>
                        <input
                        value={gf}
                        onChange={(e)=> setGF(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>PE</label>
                        <input
                        value={pe}
                        onChange={(e)=> setPE(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>PG</label>
                        <input
                        value={pg}
                        onChange={(e)=> setPG(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>PJ</label>
                        <input
                        value={pj}
                        onChange={(e)=> setPJ(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>PP</label>
                        <input
                        value={pp}
                        onChange={(e)=> setPP(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Puntos</label>
                        <input
                        value={puntos}
                        onChange={(e)=> setPuntos(e.target.value)}
                        type="text"
                        className='form-control'
                        ></input>

                    </div>  
                    <button type='submit' className='btn btn-primary'>Update</button>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

export default EditTablaPrimera