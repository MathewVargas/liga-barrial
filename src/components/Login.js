import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";
//import './estilo.css'

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/categorias");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/categorias");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError('We sent you an email. Check your inbox')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{
      backgroundColor: "#293854 ",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>

<br></br>
<br></br>
<div className="container site-section max-w-xs" style={{ maxWidth: "600px", backgroundColor: "#293854" }}>
  <h2 className="text-center mb-4" style={{ color: 'white'}}>Inicio de sesión</h2>

  {error && <Alert message={error} />}

  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="d-flex flex-column align-items-center mb-2">
      <br />
      <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleChange}
        className="my-input form-control1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="email@gmail.com"
      />
    </div>
    <div className="d-flex flex-column align-items-center mb-2">
      <label htmlFor="password" className="text-gray-700 text-sm font-bold mb-2">Contraseña</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={handleChange}
        className="my-input form-control1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="*************"
      />
    </div>
    <br />

    <div className="flex items-center justify-between text-center">
      <button
        className="my-button"
        type="submit"
        
      >
        Ingresar
      </button>
      <a
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#!"
        onClick={handleResetPassword}
      >
        Olvidó su contraseña?
      </a>
    </div>
    <br />
  </form>

  <button
    onClick={handleGoogleSignin}
    className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
  >
    Google login
  </button>


</div>

    </div>

  );
}
