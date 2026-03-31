import  { useContext } from 'react'
import Sidebar from '../Components/AdminPage/SideBar[1]'
import Dashboard from '../Components/AdminPage/DashBoard'
import ManageContent from '../Components/AdminPage/ManageContent[1]'
import { ManageContext } from '../Components/AdminPage/ManageProperty'
import { AddPropertyContent } from '../Components/AdminPage/AddPropertyContent[1]'

const DashBoard = () => {
const manageContext = useContext(ManageContext)
 if (!manageContext) {
  return <p>Loading....</p>
 }

 const {activepage} = manageContext
  return (
    <div className='flex'>
       <Sidebar/>
         <div>             {(activepage === "All Properties" || 
          activepage === "For Sale" || 
          activepage === "For Rent" || 
          activepage === "Featured" || 
          activepage === "Draft") && <ManageContent/>}


           {activepage === "Dashboard" && <Dashboard/>} {(activepage === "Add Property" || activepage === "Update Property") && <AddPropertyContent />}

          </div>

    </div>
  )
}

export default DashBoard