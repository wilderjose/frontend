// src/pages/MatriculaPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MatriculaForm from "../../components/MatriculaForm";
import { FcPrint } from "react-icons/fc";
import { AiOutlineDelete } from "react-icons/ai";

function MatriculaPage() {
    const navigate = useNavigate();
    const [matriculas, setMatriculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingMatricula, setEditingMatricula] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchMatriculas();
    }, []);

    const fetchMatriculas = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://127.0.0.1:8000/api/matricula/", {
                headers: {
                    "Authorization": `Token ${token}`
                }
            });
            const data = await response.json();
            setMatriculas(data);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error", "No se pudieron cargar las matrículas", "error");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/matricula/${id}/`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                });

                if (response.ok) {
                    Swal.fire("Eliminado", "La matrícula ha sido eliminada", "success");
                    fetchMatriculas();
                } else {
                    Swal.fire("Error", "No se pudo eliminar la matrícula", "error");
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire("Error", "Error de conexión", "error");
            }
        }
    };

    const handleEdit = (matricula) => {
        setEditingMatricula(matricula);
        setShowForm(true);
    };

    const handleSave = () => {
        fetchMatriculas();
        setShowForm(false);
        setEditingMatricula(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingMatricula(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl text-gray-600">Cargando matrículas...</div>
            </div>
        );
    }

   return (
  <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Matrícula de Estudiantes
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Registro y gestión de nuevas matrículas
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <span className="mr-2 text-lg">+</span>
            Nueva Matrícula
          </button>
        )}
      </div>

      {showForm ? (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {editingMatricula ? "Editar Matrícula" : "Registrar Nueva Matrícula"}
            </h2>
            <button
              onClick={handleCancel}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              ✕ Cancelar
            </button>
          </div>

          <MatriculaForm onSave={handleSave} initialData={editingMatricula} />
        </div>
      ) : (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Buscar por nombre o cédula..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pl-11 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Apellido
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Cédula
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Curso
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Teléfono
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {matriculas.length > 0 ? (
                  matriculas.map((matricula) => (
                    <tr key={matricula.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{matricula.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {matricula.nombre}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {matricula.apellido}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {matricula.cedula}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {matricula.tipo_curso === "Curso_avanzado"
                          ? "Avanzado"
                          : "Reforzamiento"}{" "}
                        - {matricula.categoria}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {matricula.telefono_movil}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(matricula)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                          >
                            
                          </button>
                          <button
                            onClick={() => handleDelete(matricula.id)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            <AiOutlineDelete/>
                          </button>

                          <button 
                            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                             <FcPrint/>
                            
                          </button>


                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-10 text-center text-sm text-gray-500">
                      No hay matrículas registradas. Haz clic en "Nueva Matrícula" para comenzar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default MatriculaPage;