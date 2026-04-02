import agent from "/src/assets/agent.png"

import AgentForm from "./AgentForm"

const CardComponent = () => {

  <AgentForm/>
  
  return (
    <div className="font-Manrope  flex flex-col justify-evenly bg-[#FFFFFF] w-[387px] h-[281px] rounded-[10px] border-1 border-[#918F8F]
    pl-5 mb-10">

        <h2 className="text-2xl">Agent Detail</h2>
        <div className="flex">
            <img  className="w-15 h-15 rounded-full" src={agent} alt="" />
            
            <div className="flex flex-col items-center justify-center ml-4">
              <h1>Victoria Sebastian</h1>
              <p>Real Estate Agent</p>
            </div>
        </div>
      
        <div className="flex w-[344px] h-[49px] bg-[#1A3C34] items-center justify-center rounded-[10px] text-white">
          <img className="w-5 h-5 mx-2" src="/src/assets/call.png" alt="" />
          <a href="#"> Call Agent</a>
        </div>
        
        
    </div>
  )
}

export default CardComponent