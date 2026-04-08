import agent from "/src/assets/agent.png"
import call from "/src/assets/call.png"
import AgentForm from "./AgentForm"

interface agentForm{
  agentName:string;
  agentPhone: string
}
const CardComponent = ({agentName, agentPhone}:agentForm) => {

  <AgentForm/>
  
  return (
    <div className="font-Manrope  flex flex-col justify-evenly bg-[#FFFFFF] w-full lg:w-[387px] h-[281px] rounded-[10px] border-1 border-[#918F8F]
    p-4 mb-10">

        <h2 className="text-2xl">Agent Detail</h2>
        <div className="flex">
            <img  className="w-15 h-15 rounded-full" src={agent} alt="" />
            
            <div className="flex flex-col justify-center ml-4">
              <h1>{agentName}</h1>
              <p>Real Estate Agent</p>
            </div>
        </div>
      
        <div className="flex w-full  h-[49px] bg-[#1A3C34] items-center justify-center rounded-[10px] text-white">
          <img className="w-5 h-5 mx-2" src={call} alt="" />
          <a href={`tel:${agentPhone}`}> Call Agent</a>
        </div>
        
        
    </div>
  )
}

export default CardComponent