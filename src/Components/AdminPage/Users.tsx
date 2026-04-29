import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/api";
import Modal from "../Universal/Modal";
import previous from '../../assets/prev.png'
import { useNavigate } from "react-router-dom";


interface Users {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified:boolean
  createdAt: string;
}


const Users: React.FC = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modal, setModal] = useState<{
        show: boolean;
        type: "success" | "error";
        message: string;
    }>({ show: false, type: "success", message: "" });
    const navigate = useNavigate()
    
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getAllUsers();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteUser(id);
      if (result.success) {
        setUsers(prev => prev.filter(e => e._id !== id)
    );
        setModal({ show: true, type: "success", message: "User deleted!" });
      }
    } catch (error) {
      setModal({ show: true, type: "error", message: "Failed to delete User" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-[#023337] text-[18px]">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#F3F4F6] pb-24 lg:pb-10 min-h-screen">
      {/* NavBar */}
      <nav className="bg-white px-4 lg:px-10 h-[76px] flex items-center border-b border-[#BAB9B9]">
        <div className="flex items-center gap-3">
            <button className="rounded-full bg-[#023337] w-11 h-7 pl-2 content-center hover:scale-105 transition" 
            onClick={()=>{navigate("/adminPage")}}>
                <img src={previous} alt="back icon" className="w-4" />
            </button>
            <h1 className="font-['Lato'] font-bold text-[20px] lg:text-[22px] text-[#023337]">Users</h1>
        </div>

      </nav>

      <div className="px-4 lg:px-10 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col  justify-between items-start md:items-start mb-8 gap-4">
          <div>
            <h2 className="font-bold text-[20px] lg:text-[22px] text-[#023337] font-['Lato']">Manage Users</h2>
            <p className="text-[14px] text-[#000000] font-['Lato']">
              {users.length} total users
            </p>
          </div>
 
        {/* Table/Card Container */}
        <div className="bg-white rounded-[8px] overflow-hidden w-full">
          {users.length === 0 ? (
            <div className="py-20 text-center text-[#75928B]">
              <p>No users yet.</p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE: Hidden on mobile */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#B1FFED] h-[56px]">
                      <th className="text-[15px] font-medium w-[300px] text-[#023337] px-4 text-left">Email</th>
                      <th className="text-[15px] font-medium  w-[200px] text-[#023337] px-4 text-left">Status</th>
                      <th className="text-[15px] font-medium w-[200px] text-[#023337] px-4 text-left">Role</th>
                      <th className="text-[15px] font-mediumw  text-[#023337] px-4 text-left">Registration Date</th>
                      <th className="text-[15px] font-medium  text-[#023337] px-4 text-left">Delete</th>

                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                    <tr key={user._id} className="h-[70px]">
                     <td className="px-4 py-4 font-bold text-[#0A1916] text-[14px]">{user.email}</td>
                     <td className={`px-4 py-4 text-[14px] ${user.isVerified ? "text-green-400" : "text-amber-500"}`}>
                      {user.isVerified === true ? "Verified" : "Unverified"}
                     </td>
                     <td className="px-4 py-4 text-[#403F3F] text-[14px]">
                      <span className="flex items-center gap-1">
                        {user.role === "admin" ? "Admin" : "User"}
                        {user.role === "admin" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#F59E0B"
                            className="w-4 h-4 inline-block"
                          >
                            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        )}
                      </span>
                      </td>
                     <td className="px-4 py-4 text-[#403F3F] text-[14px]">{formatDate(user.createdAt)}</td>
                     <td className="px-4 py-4 text-nowrap">
                      <button
                        onClick={() => user.role !== "admin" && handleDelete(user._id)}disabled={user.role === "admin"}
                        className={`font-normal text-[14px] ${
                          user.role === "admin"
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-[#FF0000] hover:underline cursor-pointer"
                        }`}
                      >
                        Delete User
                      </button>
                    </td>
                  </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE LIST: Visible on mobile, hidden on desktop */}
              <div className="lg:hidden flex flex-col divide-y divide-gray-100">
                {users.map((user) => (
                <div key={user._id} className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-[#0A1916] text-[16px]">{user.email}</p>
                <p className={`py-4 text-[14px] ${user.isVerified ? "text-green-400" : "text-amber-300"}`}>
                  {user.isVerified === true ? "Verified" : "Unverified"}
                </p>
                <p className="text-[12px] text-[#75928B]">{formatDate(user.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[13px] text-gray-500">
                {user.role === "admin" ? "Admin" : "User"}
              </span>
              {user.role === "admin" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#F59E0B"
                  className="w-4 h-4"
                >
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )}
            </div>
            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                onClick={() => user.role !== "admin" && handleDelete(user._id)}
                disabled={user.role === "admin"}
                className={`text-[14px] font-medium ${
                  user.role === "admin"
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-[#FF0000] cursor-pointer"
                }`}
              >
                Delete User
              </button>
            </div>
          </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal({ ...modal, show: false })}
        />
      )}
    </div>
    </div>
  );
};

export default Users