import React, { useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import Navabar from '../Navbar/Navabar'
import KanbanBoard from '../kanban-board/kanban-board'

function Admin_Panel() {

  const { users } = useAuth()
  const [subject ,setSubject] =useState()
  const [date,setDate] = useState()
  const [emp_name,setEmp_name] =useState()
  const [category,setCategory] =useState()
  const [description,setDescription] = useState()

  
  const  handleSubmit  = (e) => { 
    e.preventDefault()
   }

  return (
    <>
      <Navabar />


      <div className="bg-[#f3f3f9] w-full min-h-screen text-white p-10">


      <KanbanBoard />

        

      </div >
    </>
  )
}

export default Admin_Panel