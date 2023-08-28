import './App.css';
import Show from './components/Show';

import { BrowserRouter, Route, Routes, useLocation  } from 'react-router-dom'; 
import Edit from './components/Edit';
import Create from './components/Create';
import Sidebar from './components/Sidebar';
import Categorias from './components/Categorias'
import EquiposMaxima from './components/MaximaEquipos'
import EquiposPrimera from './components/PrimeraEquipos'
import CrearPrimera from './components/CrearEquipoPrimera'
import CrearSegunda from './components/CrearEquipoSegunda'
import EquiposSegunda from './components/SegundaEquipos'
import EditarPrimera from './components/EditPrimera'
import EditarSegunda from './components/EditSegunda'
import Jornadas from './components/Jornadas'
import MaximaJornadas from './components/MaximaJornadas'
import CrearJornadaMax from './components/CrearJornadaMax'
import CrearJornadaPrimera from './components/CrearJornadaPrimera'
import CrearJornadaSegunda from './components/CrearJornadaSegunda'
import PrimeraJornadas from './components/jornadasPrimera';
import SegundaJornadas from './components/SegundaJornadas'
import EditJornadaMax from './components/EditJornadaMax';
import EditJornadaPrimera from './components/EditJornadaPrimera';
import EditJornadaSegunda from './components/EditJornadaSegunda';
import TablaMaxima from './components/TablaMaxima';
import Tablas from './components/Tablas';
import TablaPrimera from './components/TablaPrimera';
import TablaSegunda from './components/TablaSegunda';
import EditTablaSegunda from './components/EditTablaSegunda'
import EditTablaPrimera from './components/EditTablaPrimera'
import EditTablaMaxima from './components/EditTablaMaxima'
import JugadoresMaxima from './components/JugadoresMaxima'
import JugadoresPrimera from './components/JugadoresPrimera'
import Jugadores from './components/Jugadores'
import JugadoresSegunda from './components/JugadoresSegunda'
import CrearJugador from './components/CrearJugadorMaxima'
import CrearJugadorPrimera from './components/CrearJugadorPrimera'
import CrearJugadorSegunda from './components/CrearJugadorSegunda'
import EquipMaxima from './components/EquipMax'
import EquipPrim from './components/EquipPrim'
import EquipSeg from './components/EquipSeg'
import EditJugadorMax from './components/EditJugador'
import EditJugadorPrimera from './components/EditJugadorPrimera'
import EditJugadorSegunda from './components/EditJugadorSegunda'
import { Login } from './components/Login';
import { Register } from "./components/Register";
import { AuthProvider } from './context/AuthContext';



function App() {
  const showSidebar = window.location.pathname !== '/';

  return (
    <div className="App">
<AuthProvider>
<BrowserRouter>
<Routes>
          <Route path="/" element={<Login />} />
        </Routes>

        {showSidebar && (
          
          <Sidebar>
            
            <Routes>
            <Route path="/register" element={<Register />} />
            <Route path='/create' element={<Create></Create>}></Route>
            <Route path='/maximaAd' element={<EquiposMaxima></EquiposMaxima>}></Route>
            <Route path='/primeraAd' element={<EquiposPrimera></EquiposPrimera>}></Route>
            <Route path='/segundaAd' element={<EquiposSegunda></EquiposSegunda>}></Route>
            <Route path='/jugadoresMax/:nombreEquipo' element={<JugadoresMaxima></JugadoresMaxima>}></Route>
            <Route path='/jugadoresPrim/:nombreEquipo' element={<JugadoresPrimera></JugadoresPrimera>}></Route>
            <Route path='/jugadoresSeg/:nombreEquipo' element={<JugadoresSegunda></JugadoresSegunda>}></Route>
            <Route path='/maxim' element={<EquipMaxima></EquipMaxima>}></Route>
            <Route path='/prim' element={<EquipPrim></EquipPrim>}></Route>
            <Route path='/seg' element={<EquipSeg></EquipSeg>}></Route>
            <Route path='/jugadores' element={<Jugadores></Jugadores>}></Route>
            <Route path='/crearprimera' element={<CrearPrimera></CrearPrimera>}></Route>
            <Route path='/maximajornadas' element={<MaximaJornadas></MaximaJornadas>}></Route>
            <Route path='/primerajornadas' element={<PrimeraJornadas></PrimeraJornadas>}></Route>
            <Route path='/segundajornadas' element={<SegundaJornadas></SegundaJornadas>}></Route>
            <Route path='/crearsegunda' element={<CrearSegunda></CrearSegunda>}></Route>
            <Route path='/crearjugadorMax' element={<CrearJugador></CrearJugador>}></Route>
            <Route path='/crearjugadorPrim' element={<CrearJugadorPrimera></CrearJugadorPrimera>}></Route>
            <Route path='/crearjugadorSeg' element={<CrearJugadorSegunda></CrearJugadorSegunda>}></Route>
            <Route path='/categorias' element={<Categorias></Categorias>}></Route>
            <Route path='/TablaMaxima' element={<TablaMaxima></TablaMaxima>}></Route>
            <Route path='/TablaPrimera' element={<TablaPrimera></TablaPrimera>}></Route>
            <Route path='/TablaSegunda' element={<TablaSegunda></TablaSegunda>}></Route>
            <Route path='/Tablas' element={<Tablas></Tablas>}></Route>
            <Route path='/jornadas' element={<Jornadas></Jornadas>}></Route>
            <Route path='/crearJornadaMax' element={<CrearJornadaMax></CrearJornadaMax>}></Route>
            <Route path='/crearJornadaPrimera' element={<CrearJornadaPrimera></CrearJornadaPrimera>}></Route>
            <Route path='/crearJornadaSegunda' element={<CrearJornadaSegunda></CrearJornadaSegunda>}></Route>
            <Route path='/edit/:id' element={<Edit></Edit>}></Route>
            <Route path='/editJornadaMax/:id' element={<EditJornadaMax></EditJornadaMax>}></Route>
            <Route path='/editJugadorMax/:id' element={<EditJugadorMax></EditJugadorMax>}></Route>
            <Route path='/editJugadorPrimera/:id' element={<EditJugadorPrimera></EditJugadorPrimera>}></Route>
            <Route path='/editJugadorSegunda/:id' element={<EditJugadorSegunda></EditJugadorSegunda>}></Route>
            <Route path='/editTablaMaxima/:id' element={<EditTablaMaxima></EditTablaMaxima>}></Route>
            <Route path='/editTablaSegunda/:id' element={<EditTablaSegunda></EditTablaSegunda>}></Route>
            <Route path='/editTablaPrimera/:id' element={<EditTablaPrimera></EditTablaPrimera>}></Route>
            <Route path='/editJornadaPrimera/:id' element={<EditJornadaPrimera></EditJornadaPrimera>}></Route>
            <Route path='/editJornadaSegunda/:id' element={<EditJornadaSegunda></EditJornadaSegunda>}></Route>
            <Route path='/editprimera/:id' element={<EditarPrimera></EditarPrimera>}></Route>
            <Route path='/editsegunda/:id' element={<EditarSegunda></EditarSegunda>}></Route>
            </Routes>
          </Sidebar>
        )}
      </BrowserRouter>

</AuthProvider>





    </div>
  );
}

export default App;
