import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Components/AdminPage/SideBar';
import Dashboard from '../Components/AdminPage/DashBoard';
import ManageContent from '../Components/AdminPage/ManageContent[1]';
import { AddPropertyContent } from '../Components/AdminPage/AddPropertyContent[1]';

const AdminPage = () => {
  return (
    <div className='flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden w-full bg-[#F3F4F6]'>
      
       <Sidebar />
      
       <main className='flex-1 w-full h-full overflow-y-auto pb-24 lg:pb-0'>
  
         <div className='w-full max-w-[1440px] mx-auto container flex flex-col items-center justify-start'>
            <div className='w-full'>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="add-property" element={<AddPropertyContent />} />
                    <Route path="edit-property" element={<AddPropertyContent />} />
                    <Route path="manage-property" element={<ManageContent />} />
                </Routes>
            </div>
         </div>

       </main>
    </div>
  );
}

export default AdminPage;