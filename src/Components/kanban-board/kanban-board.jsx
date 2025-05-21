import React, { useState, useEffect } from 'react';
import { useTask } from '../../Context/TaskContext';
import { motion } from 'framer-motion';
import Taskinput from '../Taskinput/Taskinput';
import ScrollContainer from 'react-indiana-drag-scroll';


function ErrorToast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}

export default function KanbanBoard() {
  const statuses = ['Unassigned', 'TO DO', 'Inprogress', 'In Reviews', 'completed', 'NEW'];

  const today = new Date().toISOString().split('T')[0];
  const [storedUsers] = useState(JSON.parse(localStorage.getItem('users') || '[]'));
  const [adminuser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [user] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const users = Array.isArray(storedUsers) ? storedUsers : storedUsers ? [storedUsers] : [];

  const { tasks, addTask, updateTask, removeTask, moveTaskToColumn } = useTask();

  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newtask, setNewtask] = useState({
    ProjectName: '',
    title: '',
    ClientName: '',
    description: '',
    assignedTo: [],
    status: 'NEW',
    deadline: '',
    Priority: ''
  });

  const [popup, setPopup] = useState("");

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  useEffect(() => {
    if (editTask) {
      setNewtask({ ...editTask });
      setShowForm(true);
    }
  }, [editTask]);

  const toastError = msg => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleMoveTask = (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (
      newStatus !== 'Unassigned' &&
      (!Array.isArray(task.assignedTo) || task.assignedTo.length === 0)
    ) {
      toastError('❌ Please assign this task first using the Edit button.');
      return;
    }

    moveTaskToColumn(taskId, newStatus);
  };

  const handleAddOrUpdate = () => {
    console.log('handleAddOrUpdate called', newtask);
    const { ProjectName, title, ClientName, description, assignedTo, status, deadline } = newtask;
    if (!ProjectName.trim() || !title.trim() || !ClientName.trim() || !description.trim() || !deadline) {
      toastError('Please fill out all fields.');
      return;
    }
    if (deadline < today) {
      return;
    }
    if (!assignedTo || assignedTo.length === 0) {
      newtask.status = 'Unassigned';
    }

    if (editTask) {
      updateTask(editTask.id, { ...newtask });
      setEditTask(null);
      setPopup('Task updated successfully!');
    } else {
      addTask({ ...newtask, id: Date.now() });
      setPopup('Task added successfully!');
    }

    setNewtask({
      ProjectName: '',
      title: '',
      ClientName: '',
      description: '',
      assignedTo: [],
      status: 'NEW',
      deadline: '',
      Priority: ''
    });
    setShowForm(false);
    setErrorMessage("")
  };

  const countColor = status => ({
    Unassigned: 'bg-[#0AB39C]',
    'TO DO': 'bg-[#3577F1]',
    Inprogress: 'bg-[#F7B84B]',
    'In Reviews': 'bg-[#299CDB]',
    completed: 'bg-[rgb(10,179,156)]',
    NEW: 'bg-[rgb(10,179,156)]'
  }[status] || 'bg-gray-500');

  return (
    <div className="p-4 bg-[#f3f3f9]  min-h-screen mt-10">

      <div className="fixed left-1/2 transform -translate-x-1/2 z-50 space-y-2 top-4 sm:top-4 sm:bottom-auto bottom-auto">
        {popup && (
          <div className="bg-green-600 text-white px-4 py-2 rounded shadow-lg">
            {popup}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-600 text-white px-4 py-2 rounded shadow-lg mt-15">
            {errorMessage}
          </div>
        )}
      </div>




      <h1 className="text-3xl font-bold text-[#2a2f3a]">Welcome {user.name}</h1>


      {adminuser?.role === 'admin' && (
        <div className="mb-4 text-left">
          <button
            className="bg-[#3b5de7] px-4 py-2 rounded text-white font-semibold hover:bg-[#2f4fc0] transition-all my-5"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Task'}
          </button>
        </div>
      )}

      <Taskinput
        showForm={showForm}
        setShowForm={setShowForm}
        form={newtask}
        setForm={setNewtask}
        errorMessage={errorMessage}
        today={today}
        users={users}
        editTaskId={editTask?.id}
        handleAddOrUpdate={handleAddOrUpdate}
      />

      <ScrollContainer
        className="w-full h-[calc(100vh-200px)] overflow-x-auto overflow-y-hidden custom-scroll mt-0"
        vertical={false}
        hideScrollbars={false}
      >
        <div className="flex  px-4 py-2 h-7 ] ">
          {statuses.map(status => (
            <div key={status} className="flex-shrink-0 w-88 p-4 rounded-xl  ">
              <div className="flex justify-between items-center mb-2  ">
                <h2 className="text-lg font-semibold text-[#303a4b]">
                  {status}
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded mx-2 text-white ${countColor(
                      status
                    )}`}
                  > {tasks.filter(t => t.status === status).length}
                  </span>
                </h2>
              </div>

              <ScrollContainer
                className="h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrolltask space-y-4 scrollbar-track-transparent"
                vertical={true}
                hideScrollbars={false}
              >
                <div className="space-y-4 ">
                  {tasks
                    .filter(
                      t =>
                        t.status === status &&
                        (adminuser.role === 'admin' ||
                          (Array.isArray(t.assignedTo) &&
                            t.assignedTo.includes(user.username)))
                    )
                    .map(task => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white p-4 rounded-xl shadow border border-[#dbe2fa] space-y-2 my-10"
                      >
                        <h4 className="font-semibold text-lg text-[#212529] ">{task.title}</h4>
                        <p className="text-sm ext-gray-500">{task.description}</p>
                        <p className="text-sm text-[#6c757d] mt-1">
                          Assigned to:{' '}
                          {task.assignedTo.length
                            ? task.assignedTo.join(', ')
                            : '—'}
                        </p>
                        <div className="mt-3 space-x-1">
                          {statuses
                            .filter(s =>
                              s !== task.status &&
                              (adminuser?.role === "admin" || s !== "Unassigned")

                            )
                            .map(s => (
                              <button
                                key={s}
                                className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white px-2 py-1 rounded-full shadow-sm transition-all"
                                onClick={() => handleMoveTask(task.id, s)}
                              >
                                {s}
                              </button> 


                            ))}
                        </div>
                        {adminuser.role === 'admin' && (
                          <div className="mt-3 flex space-x-2">
                            <button
                              className="text-blue-400 text-xs underline"
                              onClick={() => setEditTask(task)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-400 text-xs underline"
                              onClick={() => { removeTask(task.id); setPopup('Task deleted successfully!'); }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                </div>
              </ScrollContainer>
            </div>

          ))}
        </div>
      </ScrollContainer>
    </div>
  );
}