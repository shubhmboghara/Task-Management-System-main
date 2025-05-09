import React, { useState } from 'react';
import { useTask } from '../../Context/TaskContext';
import Navbar from '../Navbar/Navabar';
import Taskinput from '../Taskinput/Taskinput';

function Tasklist() {
  const [editTask, setEditTask] = useState(null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null)
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || null)
  const [popup, setPopup] = useState("");

  const handleAdd = () => {
    if (editTask) return;
    const { ProjectName, title, ClientName, description, assignedTo, status, deadline } = newtask;

    if (!ProjectName.trim() || !title.trim() || !ClientName.trim() || !description.trim()
      || !status.trim() || !deadline) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    if (deadline < today) {
      setErrorMessage('Due Date cannot be in the past.');
      return;
    }

    setErrorMessage('');
    addTask({ ...newtask, id: Date.now() });
    setNewtask({ ProjectName: '', title: '', ClientName: '', description: '', assignedTo: [], status: 'NEW', deadline: '', Priority: "" });
    setShowForm(false);
  };

  const {
    totalTasks,
    pendingTasks,
    completedTasks,
    deletedTasksCount,
    tasks,
    addTask,
    updateTask,
    removeTask,
  } = useTask();

  const today = new Date().toISOString().split('T')[0];
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [editTaskId, setEditTaskId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputClass =
    'w-full p-2 mb-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500';

  const initialForm = {
    ProjectName: '',
    title: '',
    ClientName: '',
    description: '',
    assignedTo: [],
    deadline: '',
    status: '',
    Priority: '',
  };
  const [form, setForm] = useState(initialForm);

  const openEdit = (task) => {
    setEditTask(task);
    setEditTaskId(task.id);
    setForm({ ...task });
    setShowForm(true);
  };
   const getPriorityClass = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-500';
      case 'medium':
        return 'bg-yellow-100 text-yellow-500';
      case 'low':
        return 'bg-green-100 text-green-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };
const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'inprogress':
        return 'bg-blue-100 text-blue-500';
      case 'completed':
        return 'bg-green-100 text-green-500';
      case 'pending':
        return 'bg-yellow-100 text-yellow-500';
      case 'new':
        return 'bg-purple-100 text-purple-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };
  const handleAddOrUpdate = () => {
    const {
      ProjectName,
      title,
      ClientName,
      description,
      assignedTo,
      deadline,
      status,
      Priority,
    } = form;

    if (
      !ProjectName.trim() ||
      !title.trim() ||
      !ClientName.trim() ||
      !description.trim() ||
      !deadline ||
      !Priority
    ) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    if (deadline < today) {
      setErrorMessage('Deadline cannot be in the past.');
      return;
    }
    setErrorMessage('');

    const normalizedAssigned = Array.isArray(assignedTo)
      ? assignedTo
      : assignedTo.trim()
        ? [assignedTo.trim()]
        : [];

    const payload = {
      ...form,
      assignedTo: normalizedAssigned,
      id: editTaskId || Date.now(),
    };
 
    if (editTaskId) {
      updateTask(payload);
      setPopup('Task updated successfully!');
    } else {
      addTask(payload);
      setPopup('Task added successfully!');
    }

    setErrorMessage("");
    setForm(initialForm);
    setEditTaskId(null);
    setShowForm(false);
  };

  React.useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  return (
    <>
      <Navbar />
      <div className="bg-[#f3f3f9] w-full min-h-screen text-white p-10">
        {popup && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {popup}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-15  border-[#e9ebec]  ">
          {[
            { label: 'Total Tasks', value: totalTasks, icon: '📋' },
            { label: 'Pending Tasks', value: pendingTasks, icon: '⏳' },
            { label: 'Completed Tasks', value: completedTasks, icon: '✅' },
            { label: 'Deleted Tasks', value: deletedTasksCount, icon: '🗑️' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-[#ffff] text-[#212529] rounded-md p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-sm text-[#495057] font-medium">{label}</h2>
                <div className="bg-blue-100 text-blue-500 p-2 rounded-full">{icon}</div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold">{value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full my-20 bg-[#ffff] rounded-2xl text-[#212529] ">
          <div className="flex justify-between items-center p-5">
            <h2 className="text-xl font-semibold">All Tasks</h2>
            <button
              className="bg-indigo-600 text-white rounded py-2 px-4 transform hover:scale-110 transition-transform duration-300"
              onClick={() => {
                setShowForm(!showForm);
                setEditTaskId(null);
                setForm(initialForm);
                setErrorMessage('');
              }}
              disabled={!!editTaskId}
            >           + Create Task

            </button>
          </div>
          <div className="border- border-gray-600" />

          <Taskinput
            showForm={showForm}
            setShowForm={setShowForm}
            form={form}
            setForm={setForm}
            inputClass={inputClass}
            errorMessage={errorMessage}
            today={today}
            users={users}
            editTaskId={editTaskId}
            handleAddOrUpdate={handleAddOrUpdate}
          />
          <div className="px-5 pb-5 overflow-x-auto">
            <table className="min-w-full text-left text-white  w-full  ">
              <thead>
                <tr className=" border-b-2  border-[#e9ebec] text-[#878A99] bg-[#f3f6f9] p-10 ">
                  {[
                    'ID',
                    'Project',
                    'Title',
                    'Client',
                    'Assigned To',
                    'Deadline',
                    'Status',
                    'Priority',
                    'Actions',
                  ].map(head => (
                    <th
                      key={head}
                      className="px-4 py-2 text-sm text-gray-400 m-50"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {tasks.map(task => (
                  <tr
                    key={task.id}
                    className=" border-b-2  border-[#e9ebec] ">
                    <td className="px-4 py-2 text-[#33416E]">#{task.id}</td>
                    <td className="px-4 py-2 text-[#33416E]">{task.ProjectName}</td>
                    <td className="px-4 py-2 text-[#212529]">{task.title}</td>
                    <td className="px-4 py-2 text-[#212529]">{task.ClientName}</td>
                    <td className="px-4 py-2 flex space-x-1">
                      <td className="px-4 py-2 text-[#212529]">
                        {Array.isArray(task.assignedTo)
                          ? task.assignedTo.join(', ')
                          : task.assignedTo || 'Unassigned'}
                      </td>
                    </td>
                    <td className="px-4 py-2 text-[#212529]">{task.deadline}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 ${getStatusClass(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded-full 
                         ${getPriorityClass(task.Priority)}`}>
                        {task.Priority}
                      </span>
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => openEdit(task)}
                        className="text-indigo-400 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          removeTask(task.id);
                          setPopup('Task deleted successfully!');
                        }}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasklist;
