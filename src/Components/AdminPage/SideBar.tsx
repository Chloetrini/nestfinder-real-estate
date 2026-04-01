// import React from 'react'
import Logo from "/src/assets/logo.svg"
import user from "/src/assets/property.svg"
import home from "/src/assets/home.svg"
import circle from "/src/assets/property.svg"
import { ManageContext } from "./ManageProperty"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
    const navigate = useNavigate()
    const manageContext = useContext(ManageContext)
    if (!manageContext) return ("No content")

    const {activepage, setActivePage} = manageContext

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

            <div onClick={()=> setActivePage("Dashboard")} style={{
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
                backgroundColor: activepage === "Dashboard"? "#1A3C34" : "#FFFFFF",
                color: activepage === "Dashboard" ? "#FFFFFF" : "#4F887B"
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

            <div onClick={()=> setActivePage("Add Property")} style={{
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
                backgroundColor: activepage === "Add Property"? "#1A3C34" : "#FFFFFF",
                color: activepage === "Add Property" ? "#FFFFFF" : "#4F887B"
            }}>
                <img className="w-[19.25px] h-[19.25px] pt-[1.38px] pl-[1.38px] bg-[#4F887B]" src={circle} alt="" />
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

            <div onClick={()=> setActivePage("All Properties")} style={{
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
                 backgroundColor: activepage === "All Properties"? "#1A3C34" : "#FFFFFF",
                color: activepage === "All Properties" ? "#4F887B" : "#FFFFFF"
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

     <div className="flex items-center gap-3 absolute bottom-6 left-5">
        <img src="/src/assets/users.svg" alt="" />
        <button onClick={()=>navigate("/login")} className="text-[#FF0000]">logout</button>
     </div>
   </div>
  )
}

export default Sidebar