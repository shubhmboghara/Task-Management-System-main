import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import Login from '../Login/Login'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navabar from '../Navbar/Navabar'
import Tasklist from '../Tasklist/Tasklist'
import KanbanBoard from '../kanban-board/kanban-board'

function Dashboard() {
    const { user, Logout } = useAuth()
    const navigate = useNavigate("")
    const handleLogout = () => {
        console.log("Logout clicked");

        Logout()
        navigate('/login')
    }


    return (
        <>
            <Navabar />

            <div className=" bg-[#f3f3f9] min-h-screen w-full flex flex-col text-[#f1f5f9]  ">

                <div className="bg-[#f3f3f9] w-full min-h-screen flex flex-col text-white mt-15">
                    <KanbanBoard />


                </div>
            </div>
        </>
    )
}

export default Dashboard