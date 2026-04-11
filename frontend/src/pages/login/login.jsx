import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ CORRECTO (dentro del componente)

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);

        Swal.fire({
          title: '¡Éxito!',
          text: 'Login exitoso 🚀',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate("/dashboard"); // ✅ REDIRECCIÓN CORRECTA
        });

      } else {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas ❌',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }

    } catch (error) {
      console.error(error);

      Swal.fire({
        title: 'Error',
        text: 'Error en el servidor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 h-115 flex flex-col">
        
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin} className="space-y-12">

          <div>
            <label className="block text-sm text-gray-600">Usuario</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-pink-400"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Contraseña</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-pink-400"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="bg-gradient-to-r from-yellow-400 to-blue-500 text-white py-3 rounded-xl w-full font-bold">
            Ingresar
          </button>

        </form>
      </div>
    </div>
  );
}