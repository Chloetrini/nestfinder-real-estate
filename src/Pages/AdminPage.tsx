import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Components/AdminPage/SideBar';
import Dashboard from '../Components/AdminPage/DashBoard';
import ManageContent from '../Components/AdminPage/ManageContent[1]';
import { AddPropertyContent } from '../Components/AdminPage/AddPropertyContent[1]';

const AdminPage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      
       <Sidebar />

       
       <main className='flex-1 h-full overflow-y-auto bg-[#F3F4F6]'>
         <Routes>
            <Route index element={<Dashboard />} /> {/* This is the default (/admin) */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-property" element={<AddPropertyContent />} />
            <Route path="manage-property" element={<ManageContent />} />
           
         </Routes>
       </main>
    </div>
  );
}

export default AdminPage;