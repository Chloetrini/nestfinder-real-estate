import prev from "/src/assets/prev.png"
import nextt from "/src/assets/next.png"

interface Pagination {
  totalPosts: number
  postPerPage: number
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({ totalPosts, postPerPage, setCurrentPage, currentPage }: Pagination) => {
  let pages = []
  const totalPages = Math.ceil(totalPosts / postPerPage)
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  const previous = currentPage === 1
  const next = currentPage === totalPages
  
  const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); }
  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); }

  return (
    <div className="flex flex-nowrap justify-between items-center mt-4 mb-7 h-[42px] mx-auto container gap-1 md:gap-4">
      <div>
        <button 
          onClick={handlePrevious}
          className={`w-[75px] md:w-[105px] h-[42px] rounded-[8px] py-[10px] flex items-center justify-center gap-1 text-white text-[12px] md:text-[14px] ${previous ? "bg-[#AEAEAE]" : "bg-[#1A3C34]"}`}
        >
          <img src={prev} alt="" className="w-3 md:w-auto" />
          <span>{window.innerWidth < 768 ? "Prev" : "Previous"}</span>
        </button>
      </div>

      <div className="flex flex-nowrap space-x-[6px] md:space-x-[12px]">
        {pages.map((page, id) => {
          const color = page === currentPage
          return (
            <button 
              className="w-[30px] md:w-[36px] h-[30px] md:h-[36px] rounded-[4px] border-[1px] text-[12px] md:text-[14px] flex items-center justify-center" 
              onClick={() => setCurrentPage(page)} 
              style={{
                backgroundColor: color ? "#1A3C34" : "#ffffff",
                color: color ? "#ffffff" : "#7A7978"
              }}
              key={id}
            >
              {page}
            </button>
          )
        })}
      </div>

      <div>
        <button 
          onClick={handleNext}
          className={`w-[75px] md:w-[105px] h-[42px] rounded-[8px] py-[10px] flex flex-row-reverse items-center justify-center text-white gap-1 text-[12px] md:text-[14px] ${next ? "bg-[#AEAEAE]" : "bg-[#1A3C34]"}`}
        >
          <img src={nextt} alt="" className="w-3 md:w-auto" />
          <span>Next</span>
        </button>
      </div>
    </div>
  )
}

export default Pagination