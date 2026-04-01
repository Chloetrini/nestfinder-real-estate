import  { useContext } from 'react'
import Sidebar from '../Components/AdminPage/SideBar'
import Dashboard from '../Components/AdminPage/DashBoard'
import ManageContent from '../Components/AdminPage/ManageContent[1]'
import { ManageContext } from '../Components/AdminPage/ManageProperty'
import { AddPropertyContent } from '../Components/AdminPage/AddPropertyContent[1]'

const AdminPage = () => {
const manageContext = useContext(ManageContext)
 if (!manageContext) {
  return <p>Loading....</p>
 }

 const {activepage} = manageContext
  return (
    <div className='flex'>
       <Sidebar/>
       {activepage === "Dashboard" && <Dashboard/>} {(activepage === "Add Property" || activepage === "Update Property") && <AddPropertyContent />}
         <div>             {(activepage === "All Properties" || 
          activepage === "For Sale" || 
          activepage === "For Rent" || 
          activepage === "Featured" || 
          activepage === "Draft") && <ManageContent/>}


           

          </div>

    </div>
  )
}

export default AdminPage