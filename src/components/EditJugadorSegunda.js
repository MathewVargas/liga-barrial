import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc, collection, query, where, getDocs, addDoc} from "firebase/firestore"
import { db, uploadFile } from "../firebaseconfig/firebase"


const Edit = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [numero, setNumero] = useState(0)
    const [foto, setFoto] = useState('')
    const [categoria, setCategoria] = useState('segunda');
    const [equipo, setEquipo] = useState('');
    const [goles, setGoles] = useState(0);

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
            const product = doc(db, "jugadores", id)
            const data = {nombre: nombre, foto: result, apellido: apellido, numero: numero, categoria: 'segunda', goles: 0, equipo: equipo }
            await updateDoc(product, data)
            console.log(result)
            navigate('/seg')

        }else{
            const product = doc(db, "jugadores", id)
            const data = {nombre: nombre, foto: foto, apellido: apellido, numero: numero, categoria: 'segunda', goles: 0, equipo: equipo }
            await updateDoc(product, data)
            navigate('/seg')
        }
        
    }

    const [equipos, setEquipos] = useState([]);
    const equiposCollection = collection(db, "Equipos");
    const q1 = query(equiposCollection, where("categoria", "==", "segunda"));
    //3 - Funcion para mostrar TODOS los docs
    const getEquipos = async () => {
        const data = await getDocs(q1);
        setEquipos(
            data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
        );
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "jugadores", id) )
        if(product.exists()) {
            //console.log(product.data())
            setNombre(product.data().nombre)    
            setApellido(product.data().apellido)
            setNumero(product.data().numero)
            setFoto(product.data().foto)
            setEquipo(product.data().equipo)
            setGoles(product.data().goles)
        }else{
            console.log('El producto no existe')
        }
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
                <h1>Editar Jugador</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setNombre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
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
                        <label className='form-label'>Número</label>
                        <input
                        value={numero}
                        onChange={(e)=> setNumero(e.target.value)}
                        type="number"
                        className='form-control'
                        ></input>

                    </div>


                    <div className='mb-3'>
                        <label className='form-label'>Foto</label>
                        <input
                            value={foto}
                            onChange={ (e)=> setFoto(e.target.value)} 
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

                    <div className='mb-3'>
                        <label className='form-label'>Equipo</label>
                        <select value={equipo} onChange={(e) => setEquipo(e.target.value)} className="form-control">
                        <option value="">Seleccionar equipo local</option>
                            {equipos.map((equipo) => (
                                <option key={equipo.id} value={equipo.nombre_equip}>
                                {equipo.nombre_equip}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Goles</label>
                        <input
                        value={goles}
                        onChange={(e)=> setGoles(e.target.value)}
                        type="number"
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

export default Edit