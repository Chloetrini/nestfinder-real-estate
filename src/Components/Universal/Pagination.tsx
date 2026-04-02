

interface Pagination{
   totalPosts: number
   postPerPage: number
   currentPage: number;
  setCurrentPage: (page: number) => void;
   
  
}

const Pagination = ({totalPosts, postPerPage, setCurrentPage, currentPage}:Pagination) => {
    
    let pages = []
    const totalPages = Math.ceil(totalPosts / postPerPage)
  for (let i = 1; i <= totalPages ; i++) {
    pages.push(i)
    
  }
  
   const previous = currentPage ===1
   const next = currentPage ===totalPages
   const handlePrevious=()=>{
    if (currentPage > 1) {
      setCurrentPage(currentPage -1)
    }
   }
   const handleNext=()=>{
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
   }
  
  return (

    
    <div className="flex justify-between items-center mt-4 mb-7 h-[42px]  mx-auto container p">
      <div>
        <button 
        onClick={handlePrevious}
        
        className={`w-[105px] h-[42px] rounded-[8px] py-[10px] pr-[12px] pl-[8px] flex gap-1 text-white  ${previous ?"bg-[#AEAEAE]" :"bg-[#1A3C34]"}`} ><img src="/src/assets/prev.png" alt="" />Previous</button>
      </div>

       <div className="space-x-[12px]">
            {
        pages.map((page , id)=>{
          const color = page === currentPage
        return <button className="w-[36px] h-[36px] rounded-[4px] p-[10px] border-[1px]" onClick={()=>setCurrentPage(page)} style={{
              
              backgroundColor: color? "#1A3C34" : "#ffffff",
              color: color? "#ffffff" : "#7A7978"
            }}
            key={id}>{page}</button>

        })
        
        
        }
       </div>
       <div>
        <button 
        onClick={handleNext}
        className={`w-[105px] h-[42px] rounded-[8px] py-[10px] pr-[12px] pl-[8px] flex  flex-row-reverse text-white gap-1 ${next ?"bg-[#AEAEAE]" :"bg-[#1A3C34]"}`} ><img src="/src/assets/next.png" alt="" />Next</button>
      </div>
       
    </div>
  )
}

export default Pagination