// import React from 'react'
import Logo from "/src/assets/logo.png"
import user from "/src/assets/addd.png"
import home from "/src/assets/dashboard.png"
import users from "/src/assets/users.png"
import circle from "/src/assets/addd.png"
import { ManageContext } from "./ManageProperty"
import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const manageContext = useContext(ManageContext)
    if (!manageContext) return ("No content")

    const {activepage, setActivePage} = manageContext

    const isActive = (path: string) => {
  
        return location.pathname === path;
    };
const handleClick=()=>{
  navigate("/adminPage")

}
const handleManageClick =()=>{
    setActivePage("All Properties")
    navigate("/adminPage/manage-property")
}
  return (
   <div style={{
    width: "260px",
    // height: "12px",
    borderRightWidth: "1px",
    backgroundColor: "#FFFFFF",
    position:"relative",
    borderRightColor: "#BAB9B9",
    
   }}>
     <div  style={{
            display: "flex",
            gap: "4px",
            padding: "20px",
            width: "260px",
            height: "76px",
            alignItems: "center"
            }}>


      <div style={{
        width: "162.22px",
        height: "46px",
        gap: "10.22px",
        display: "flex",
        alignItems: "center"
      }}>
    
           <img  src={Logo} onClick={()=>navigate("/")} alt="Arrow Logo" />
          <div style={{
             fontFamily: 'Manrope',
             fontWeight: 700,
             fontStyle: " bold",
             fontSize: "17.89px",
             letterSpacing: "0%",
             lineHeight: "100%",
         }}>
              <h1 className="text-[#1A3C34]"> NestFinder Pro</h1>
          </div>
      </div> 
    </div>

    <div style={{
        display: "flex",
        flexDirection: "column",
        width: "260px",
        height: "212px",
        top: "91px",
        gap: "24px"
    }}>
        <div style={{
            display: "flex",
            width: "260px",
            height: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
            gap: "10px"
        }}>

            <h1 style={{
                fontFamily: "lato",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "24px",
                letterSpacing: "0px",
                verticalAlign: "middle",
                color: "#4F887B"
            }}>MAIN MENU</h1>
        </div>

        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "260px",
            height: "164px",
            gap: "20px"
        }}>

            <div onClick={handleClick } style={{
                display: "flex",
                width: "260px",
                height: "42px",
                paddingTop: "9px",
                paddingRight: "16px",
                paddingBottom: "9px",
                paddingLeft: "16px",
                gap: "8px",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: isActive("/adminPage")? "#1A3C34" : "#FFFFFF",
                color: isActive("/adminPage") ? "#FFFFFF" : "#4F887B"
            }}>
                <img className="w-6 h-6" src={home} alt="" />
                <h1 style={{
                    fontFamily: "lato",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22px",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    color: "#4F887B"
                }}>Dashboard</h1>
            </div>

            <div onClick={()=> navigate("/adminPage/add-property")} style={{
                display: "flex",
                width: "260px",
                height: "42px",
                paddingTop: "9px",
                paddingRight: "16px",
                paddingBottom: "9px",
                paddingLeft: "16px",
                gap: "8px",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: isActive("/adminPage/add-property")? "#1A3C34" : "#FFFFFF",
                color: isActive("/adminPage/add-property") ? "#FFFFFF" : "#4F887B"
            }}>
                <img className="w-6 h-6 " src={circle} alt="" />
                <h1 style={{
                    fontWeight: 400,
                    fontFamily: "lato",
                    fontSize: "16px",
                    lineHeight: "22px",
                    letterSpacing: "0px",
                     verticalAlign: "middle",
                     color: "#4F887B"
                }}>Add Property</h1>
            </div>

            <div onClick={handleManageClick} style={{
                display: "flex",
                width: "260px",
                height: "42px",
                paddingTop: "9px",
                paddingRight: "16px",
                paddingBottom: "9px",
                paddingLeft: "16px",
                gap: "8px",
                borderRadius: "6px",
                cursor: "pointer",
                 backgroundColor: isActive("/adminPage/manage-property")? "#1A3C34" : "#FFFFFF",
                color: isActive("/adminPage/manage-property")? "#4F887B" : "#FFFFFF"
            }}>
                <img className="w-6 h-6" src={user} alt="" />
                <h1
                style={{
                    fontFamily: "lato",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22px",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    color: "#4F887B"
                }}>Manage Property</h1>
            </div>
              
        </div>
        
    </div>

     <div className="flex items-center absolute bottom-8 left-5">
        <img src={users} alt="" />
        <button onClick={()=>navigate("/login")} className="text-[#FF0000]">logout</button>
     </div>
   </div>
  )
}

export default Sidebar