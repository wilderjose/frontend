// src/components/MatriculaForm.jsx
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { IoMdClose } from "react-icons/io";

function MatriculaForm({ onSave, initialData, onCancel }) {
    const navigate = useNavigate();
     const [activeTab, setActiveTab] = useState('MatriculaForm');

    const initialState = {
        nombre: '',
        apellido: '',
        edad: '',
        sexo: '',
        nacionalidad: '',
        fecha_nacimiento: '',
        cedula: '',
        direccion: '',
        correo_electronico: '',
        telefono_movil: '',
        nivel_educativo: '',
        profesion_u_oficio: '',
        en_caso_de_emrgencia: '',
        telefono_emergencia: '',
        modalidad: '',
        horario: '',
        tipo_pago: '',
        tipo_curso: '',
        categoria: '',
        apariconia: ''
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setForm({
                nombre: initialData.nombre || '',
                apellido: initialData.apellido || '',
                edad: initialData.edad || '',
                sexo: initialData.sexo || '',
                nacionalidad: initialData.nacionalidad || '',
                fecha_nacimiento: initialData.fecha_nacimiento || '',
                cedula: initialData.cedula || '',
                direccion: initialData.direccion || '',
                correo_electronico: initialData.correo_electronico || '',
                telefono_movil: initialData.telefono_movil || '',
                nivel_educativo: initialData.nivel_educativo || '',
                profesion_u_oficio: initialData.profesion_u_oficio || '',
                en_caso_de_emrgencia: initialData.en_caso_de_emrgencia || '',
                telefono_emergencia: initialData.telefono_emergencia || '',
                modalidad: initialData.modalidad || '',
                horario: initialData.horario || '',
                tipo_pago: initialData.tipo_pago || '',
                tipo_curso: initialData.tipo_curso || '',
                categoria: initialData.categoria || '',
                apariconia: initialData.apariconia || ''
            });
        }
    }, [initialData]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }

    function validateForm() {
        const newErrors = {};
        if (!form.nombre) newErrors.nombre = 'Requerido';
        if (!form.apellido) newErrors.apellido = 'Requerido';
        if (!form.edad) newErrors.edad = 'Requerido';
        if (!form.sexo) newErrors.sexo = 'Requerido';
        if (!form.cedula) newErrors.cedula = 'Requerido';
        if (!form.correo_electronico) {
            newErrors.correo_electronico = 'Requerido';
        } else if (!/\S+@\S+\.\S+/.test(form.correo_electronico)) {
            newErrors.correo_electronico = 'Correo inválido';
        }
        if (!form.telefono_movil) newErrors.telefono_movil = 'Requerido';
        if (!form.modalidad) newErrors.modalidad = 'Requerido';
        if (!form.horario) newErrors.horario = 'Requerido';
        if (!form.tipo_pago) newErrors.tipo_pago = 'Requerido';
        if (!form.tipo_curso) newErrors.tipo_curso = 'Requerido';
        if (!form.categoria) newErrors.categoria = 'Requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) {
            Swal.fire({ title: 'Error de validación', text: 'Por favor completa todos los campos requeridos', icon: 'error' });
            return;
        }
        const token = localStorage.getItem("token");
        const isEditing = !!initialData?.id;
        const url = isEditing
            ? `http://127.0.0.1:8000/api/matricula/${initialData.id}/`
            : "http://127.0.0.1:8000/api/matricula/";
        const method = isEditing ? "PUT" : "POST";
        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (response.ok) {
                if (onSave) onSave(data);
                if (!isEditing) setForm(initialState);
                Swal.fire({
                    title: isEditing ? '¡Matrícula actualizada!' : '¡Matrícula guardada!',
                    text: 'Exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => navigate("/dashboard/matricula"));
            } else {
                const errorMessage = typeof data === 'object' ? Object.values(data).flat().join(', ') : data;
                Swal.fire({ title: 'Error', text: errorMessage || 'Error al guardar', icon: 'error' });
            }
        } catch (error) {
            Swal.fire({ title: 'Error de conexión', text: 'No se pudo conectar con el servidor', icon: 'error' });
        }
    }

    const inputClass = (field) =>
        `w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors[field] ? 'border-red-400' : 'border-gray-300'}`;

    const selectClass = (field) =>
        `w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors[field] ? 'border-red-400' : 'border-gray-300'}`;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-30 overflow-y-auto py-8 px-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-5 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {initialData?.id ? 'Editar Matrícula' : 'Nueva Matrícula'}
                    </h2>
                    <button
                        type="button"
                        onClick={onCancel || (() => navigate("/"))}
                        className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none"
                    >
                        <IoMdClose />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">

                    {/* Información Personal */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-4">Información Personal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Nombre *</label>
                                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className={inputClass('nombre')} />
                                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Apellido *</label>
                                <input type="text" name="apellido" value={form.apellido} onChange={handleChange} className={inputClass('apellido')} />
                                {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Cédula de Identidad *</label>
                                <input type="text" name="cedula" value={form.cedula} onChange={handleChange} placeholder="000-0000000-0" className={inputClass('cedula')} />
                                {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Fecha de Nacimiento</label>
                                <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} className={inputClass('fecha_nacimiento')} />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Edad *</label>
                                <input type="text" name="edad" value={form.edad} onChange={handleChange} className={inputClass('edad')} />
                                {errors.edad && <p className="text-red-500 text-xs mt-1">{errors.edad}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Sexo *</label>
                                <select name="sexo" value={form.sexo} onChange={handleChange} className={selectClass('sexo')}>
                                    <option value="">Seleccionar</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                                {errors.sexo && <p className="text-red-500 text-xs mt-1">{errors.sexo}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Nacionalidad</label>
                                <input type="text" name="nacionalidad" value={form.nacionalidad} onChange={handleChange} className={inputClass('nacionalidad')} />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Nivel Educativo</label>
                                <select name="nivel_educativo" value={form.nivel_educativo} onChange={handleChange} className={selectClass('nivel_educativo')}>
                                    <option value="">Seleccionar</option>
                                    <option value="Primaria">Primaria</option>
                                    <option value="Secundaria">Secundaria</option>
                                    <option value="Universidad">Universidad</option>
                                    <option value="Profesional">Profesional</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-700 mb-1">Profesión u Oficio</label>
                                <input type="text" name="profesion_u_oficio" value={form.profesion_u_oficio} onChange={handleChange} className={inputClass('profesion_u_oficio')} />
                            </div>
                        </div>
                    </div>

                    {/* Información de Contacto */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-4">Información de Contacto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Teléfono *</label>
                                <input type="text" name="telefono_movil" value={form.telefono_movil} onChange={handleChange} placeholder="+1 809-555-1234" className={inputClass('telefono_movil')} />
                                {errors.telefono_movil && <p className="text-red-500 text-xs mt-1">{errors.telefono_movil}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Email *</label>
                                <input type="email" name="correo_electronico" value={form.correo_electronico} onChange={handleChange} className={inputClass('correo_electronico')} />
                                {errors.correo_electronico && <p className="text-red-500 text-xs mt-1">{errors.correo_electronico}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-700 mb-1">Dirección</label>
                                <input type="text" name="direccion" value={form.direccion} onChange={handleChange} className={inputClass('direccion')} />
                            </div>
                        </div>
                    </div>

                    {/* Contacto de Emergencia */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-4">Contacto de Emergencia</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Nombre de contacto</label>
                                <input type="text" name="en_caso_de_emrgencia" value={form.en_caso_de_emrgencia} onChange={handleChange} className={inputClass('en_caso_de_emrgencia')} />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Teléfono de emergencia</label>
                                <input type="text" name="telefono_emergencia" value={form.telefono_emergencia} onChange={handleChange} className={inputClass('telefono_emergencia')} />
                            </div>
                        </div>
                    </div>

                    {/* Información del Curso */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-4">Información del Curso</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Modalidad *</label>
                                <select name="modalidad" value={form.modalidad} onChange={handleChange} className={selectClass('modalidad')}>
                                    <option value="">Seleccionar</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Extraordinario">Extraordinario</option>
                                </select>
                                {errors.modalidad && <p className="text-red-500 text-xs mt-1">{errors.modalidad}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Horario *</label>
                                <select name="horario" value={form.horario} onChange={handleChange} className={selectClass('horario')}>
                                    <option value="">Seleccionar</option>
                                    <option value="8AM A 10AM">8AM a 10AM</option>
                                    <option value="10AM A 12PM">10AM a 12PM</option>
                                    <option value="12PM A 02PM">12PM a 2PM</option>
                                    <option value="04PM A 06PM">4PM a 6PM</option>
                                </select>
                                {errors.horario && <p className="text-red-500 text-xs mt-1">{errors.horario}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Tipo de Curso *</label>
                                <select name="tipo_curso" value={form.tipo_curso} onChange={handleChange} className={selectClass('tipo_curso')}>
                                    <option value="">Seleccionar</option>
                                    <option value="Curso_avanzado">Avanzado</option>
                                    <option value="Reforzamiento">Reforzamiento</option>
                                </select>
                                {errors.tipo_curso && <p className="text-red-500 text-xs mt-1">{errors.tipo_curso}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Categoría *</label>
                                <select name="categoria" value={form.categoria} onChange={handleChange} className={selectClass('categoria')}>
                                    <option value="">Seleccionar</option>
                                    <option value="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="A3">A3</option>
                                </select>
                                {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Tipo de Pago *</label>
                                <select name="tipo_pago" value={form.tipo_pago} onChange={handleChange} className={selectClass('tipo_pago')}>
                                    <option value="">Seleccionar</option>
                                    <option value="Pago_completo">Pago Completo</option>
                                    <option value="Anticipo">Anticipo</option>
                                    <option value="Beneficio">Beneficio</option>
                                </select>
                                {errors.tipo_pago && <p className="text-red-500 text-xs mt-1">{errors.tipo_pago}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">¿Cómo nos conoció?</label>
                                <select name="apariconia" value={form.apariconia} onChange={handleChange} className={selectClass('apariconia')}>
                                    <option value="">Seleccionar</option>
                                    <option value="Redes_Sociales">Redes Sociales</option>
                                    <option value="Referido">Referido</option>
                                    <option value="Sitio_Web">Sitio Web</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onCancel || (() => navigate("/dashboard/MatriculaPage"))}
                            className="px-5 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            {initialData?.id ? 'Actualizar Matrícula' : 'Guardar Matrícula'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MatriculaForm;