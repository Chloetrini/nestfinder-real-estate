interface Filter{
  location: {fullAddress:string}
	propertyType: string;
	details:{bedrooms: string}
	listing: string;
	minPrice: string;
	maxPrice: string;

}
interface SortProp{
    filteredPosts: number
    allPosts: number | undefined
    sortBy:string
   setSortBy: (value: string) => void;
  setApplyFilter: (filter:Filter) =>void
  filter: Filter
    
}




const Sort = ({allPosts, filteredPosts,setSortBy,sortBy, setApplyFilter ,filter}: SortProp) => {

  
  

// console.log(prices);

    const handleChange = (
    e: React.ChangeEvent< HTMLSelectElement>,
  ) => {
      setSortBy(e.target.value)
     setApplyFilter(filter)
  }
  
             
              
              
              
         

  return (
   <div className='font-[Manrope] mt-20 flex justify-between items-center mb-9  max-[321px]:px-7 md:px-6 lg:px:0  px-6 pad'>
    <div className='lg:text-[24px] text-[14px] md:text-[18px]  max-[321px]:text-[14px]'>
        <p>Showing <span>{filteredPosts} </span>of <span>{allPosts}</span> Properties</p>
    </div>

    <div className='text-[#656565]'>
        <div className="relative">
            <select name="sort" id="sort" value={sortBy} className='border w-[121px] max-[321px]:w-[100px] lg:w-[183px] h-[39px] px-[10px] pr-[32px] text-[12px] lg:text-[14px] rounded-[10px] max-[321px]:text-[10px] appearance-none bg-white cursor-pointer' onChange={handleChange}>
                <option value="" className='font-[400]'>Sort by default</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
                <option value="Discounted">Discounted</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-[10px] flex items-center">
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    </div>
</div>
  )
}

export default Sort