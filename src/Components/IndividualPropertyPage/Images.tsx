// import React from 'react'
import image1 from "/src/assets/image1.svg"
import image2 from "/src/assets/image2.svg"
import image3 from "/src/assets/image3.svg"
import image4 from "/src/assets/image4.svg"
import image5 from "/src/assets/image5.svg"

const Images= () => {
  return ( 
   
        
   
<div className="flex lg:flex-row flex-col gap-4 p-5 md:p-0">
    <div>
    <img src={image1} alt="" />
    </div>
    <div className=" grid grid-cols-2 gap-4">
    <img src={image2} alt="" />
    <img src={image4} alt="" />
    <img src={image3} alt="" />
    <img src={image5} alt="" />
    </div>
</div>
   

  )
}

export default Images