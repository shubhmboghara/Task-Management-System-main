import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import Navabar from '../Navbar/Navabar';

function Viewusers() {
  const { user } = useAuth();
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const accents = [
    { label: 'ID', text: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Name', text: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Role', text: 'text-pink-600', bg: 'bg-pink-50' },
    { label: 'Email', text: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Mobile', text: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <>
      <Navabar />
      <div className="bg-[#f3f3f9] w-full min-h-screen flex flex-col items-center text-black">
        <div className="w-full max-w-6xl px-4 py-10 mt-10">
          {users.length === 0 ? (
            <h1 className="text-center text-gray-500 text-xl">No users found</h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {users.map((u, i) => (
                <div
                  key={i}
                  className="bg-[#f9fafb] border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition"
                >
                  <div
                    className={`inline-block ${accents[0].bg} px-2 py-1 rounded mb-3`}
                  >
                    <span className={`${accents[0].text} font-semibold`}>
                      ID: {u.username}
                    </span>
                  </div>

                  <div
                    className={`inline-block ${accents[1].bg} px-2 py-1 rounded mb-3`}
                  >
                    <span className={`${accents[1].text}`}>
                      Name: {u.name}
                    </span>
                  </div>

                  <div
                    className={`inline-block ${accents[2].bg} px-2 py-1 rounded mb-3`}
                  >
                    <span className={`${accents[2].text} font-medium`}>
                      Role: {u.role}
                    </span>
                  </div>

                  <div
                    className={`inline-block ${accents[3].bg} px-2 py-1 rounded mb-3`}
                  >
                    <span className={`${accents[3].text} text-sm`}>
                      Email: {u.email}
                    </span>
                  </div>

                  <div
                    className={`inline-block ${accents[4].bg} px-2 py-1 rounded`}
                  >
                    <span className={`${accents[4].text} text-sm`}>
                      Mobile: {u.mobileNumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Viewusers;
