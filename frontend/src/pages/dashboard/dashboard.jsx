import { useState } from "react";
import DashboardHome from "./dashboardhome";
import Matricula from "../matricula/matricula";
import Resibos from "../resibos/resibos";
import Calendario from "../calendario/calendario";
import Notas from "../nota/notas";
import PlanStudio from "../plan_studio/plan_studio";
import Asistencia from "../asistencia/asistencia";
import PerfilEstudiante from "../perfil_studiante/perfil_estudiante";   
import { LuLayoutDashboard } from "react-icons/lu";
import { TbMenu2 } from "react-icons/tb";
import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2";
import { TbCalendarTime } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";
import { IoMdBook } from "react-icons/io";
import { MdPersonOutline } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { IoSchoolOutline } from "react-icons/io5";



function Dashboard() {

    const [isSidebarOpen, setIsSidebarOPen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard', 'matricula', 'resibo');

    function renderContent() {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardHome />;
            case 'matricula':
                return <Matricula />;
            case 'resibo':
                return <Resibos/>;  
            case 'calendario':
                return <Calendario/>;  
            case 'notas':
                return <Notas/>;    
            case 'plan_studio':
                return <PlanStudio/>;   
            case 'asistencia':
                return <Asistencia/>;  
            case 'perfil_estudiante':
                return <PerfilEstudiante/>;           
            default:
                 break;
        }
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOPen(false)}></div>
            )}
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-white transform transition-transform md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : "-translate-x-full"}`}>
                
                <div className="p-6 text-xl font-bold text-indigo-400">
                    Escuela de manejo
                </div>

                <nav className="mt-4 px-4 space-y-2">

                    <button
                        onClick={() => { setActiveTab('dashboard'); setIsSidebarOPen(false) }}
                        className={`w-full flex items-center p-3 space-x-3 rounded-xl  ${activeTab === 'dashboard'
                            ? 'bg-blue-100 text-blue-500 font-bold'
                            : 'text-gray-600 hover:bg-blue-50'
                            }`}
                    >
                        <LuLayoutDashboard size={'1.5rem'} />
                        <span>Dashboard</span>
                    </button>

                    <button
                        onClick={() => { setActiveTab('matricula'); setIsSidebarOPen(false) }}
                        className={`w-full flex items-center p-3 space-x-3 rounded-xl ${activeTab === 'matricula'
                            ? 'bg-blue-100 text-blue-500 font-bold'
                            : 'text-gray-600 hover:bg-blue-50'
                            }`}
                    >
                        <FiUserPlus size={'1.5rem'} />
                        <span>Matrículas</span>
                    </button>

                    <button
                        onClick={() => { setActiveTab('resibo'); setIsSidebarOPen(false) }}
                        className={`w-full flex items-center p-3 space-x-3 rounded-xl ${activeTab === 'resibo'
                            ? 'bg-blue-100 text-blue-500 font-bold'
                            : 'text-gray-600 hover:bg-blue-50'
                            }`}
                    >
                        <HiOutlineDocumentCurrencyDollar size={'1.5rem'} />
                        <span>Recibos</span>
                    </button>

                
                    <button
                        onClick={() => { setActiveTab('calendario'); setIsSidebarOPen(false) }}
                        className={`w-full flex items-center p-3 space-x-3 rounded-xl ${activeTab === 'calendario'
                            ? 'bg-blue-100 text-blue-500 font-bold'
                            : 'text-gray-600 hover:bg-blue-50'
                            }`}
                    >
                        <TbCalendarTime size={'1.5rem'} />
                        <span>Calendario instructor</span>
                    </button>

                     <button
                        onClick={() => { setActiveTab('notas'); setIsSidebarOPen(false) }}
                        className={`w-full flex items-center p-3 space-x-3 rounded-xl ${activeTab === 'notas'
                            ? 'bg-blue-100 text-blue-500 font-bold'
                            : 'text-gray-600 hover:bg-blue-50'
                            }`}
                    >
                        <IoSchoolOutline size={'1.5rem'} />
                        <span>Notas</span>
                    </button>

                    <button
                        onClick={() => { setActiveTab('plan_studio'); setIsSidebarOPen(false) }}
                        className={`w-full flex items-center p-3 space-x-3 rounded-xl ${activeTab === 'plan_studio'
                            ? 'bg-blue-100 text-blue-500 font-bold'
                            : 'text-gray-600 hover:bg-blue-50'
                            }`}
                    >
                        <IoMdBook size={'1.5rem'}/>
                        <span>Plan de Estudio</span>
                    </button>



                     <button
                        onClick={() => { setActiveTab('asistencia'); setIsSidebarOPen(false) }}
                        className={`w-full flex items-center p-3 space-x-3 rounded-xl ${activeTab === 'asistencia'
                            ? 'bg-blue-100 text-blue-500 font-bold'
                            : 'text-gray-600 hover:bg-blue-50'
                            }`}
                    >
                        <LuClipboardCheck size={'1.5rem'}/>
                        <span>Asistencia</span>
                    </button>

                     <button
                        onClick={() => { setActiveTab('perfil_estudiante'); setIsSidebarOPen(false) }}
                        className={`w-full flex items-center p-3 space-x-3 rounded-xl ${activeTab === 'perfil_estudiante'
                            ? 'bg-blue-100 text-blue-500 font-bold'
                            : 'text-gray-600 hover:bg-blue-50'
                            }`}
                    >
                        <MdPersonOutline size={'1.5rem'}/>
                        <span>Perfil del Estudiante</span>
                    </button>

                </nav>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden ">
        {/* Header */  }
               {!isSidebarOpen && (
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsSidebarOPen(true)}
                            className="fixed top-4 right-4 z-50 text-white p-4  active:scale-95 transition-all duration-200"
                        >
                            <span className="text-xl text-black"><TbMenu2 /></span>
                        </button>
                    </div>
                )}
                            
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {renderContent()}
                </main>

            </div>
        </div>
    );
}

export default Dashboard;