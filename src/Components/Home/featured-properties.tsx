import { useNavigate } from 'react-router-dom';
import PropertyCard from '@/components/shared/property-card';
import { PropertyGridSkeleton } from '@/components/skeletons/property-card-skeleton';
import { useProperties } from '@/hooks/properties/use-properties';

const FeaturedProperties = () => {
    const navigate = useNavigate();
    const { data: results = [], isLoading, isError } = useProperties();

    return (
        <div className="bg-[#E4F0ED] dark:bg-[#10231f] px-4 md:px-8 flex flex-col justify-center items-center overflow-hidden">
            
            <div className="flex flex-col justify-center items-center gap-[18px] py-[40px] md:py-[73px]">
                <h1 className="font-Manrope font-[700] text-[24px] md:text-[42px] text-center text-[#131817] dark:text-gray-100 leading-tight">
                    Discover Our Featured Properties
                </h1>
                <p className="font-Inter font-[400] text-[14px] md:text-[18px] leading-[24px] md:leading-[30px] text-center text-[#535353] dark:text-gray-300 w-full max-w-[23rem] md:max-w-[40rem]">
                    Dive into our exquisite collection of our featured properties at Nest Finder Pro. Every corner whispers comfort and every detail is crafted with perfection
                </p>
            </div>

            {/* UPDATED GRID LOGIC: 2 columns at lg (1024px) and 3 columns only at xl (1280px) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-[30px] md:gap-y-[47px] lg:gap-y-[55px] gap-x-[20px] w-full max-w-[1240px] justify-items-center inbetween">
                {isLoading ? (
                    <div className="col-span-full w-full"><PropertyGridSkeleton count={3} /></div>
                ) : isError ? (
                    <p className="text-red-500 font-bold col-span-full py-10">We couldn't load properties right now.</p>
                ) : (
                    results.slice(0, 6).map((result, i) => (
                        <PropertyCard
                            index={i}
                            key={result._id}
                            property={result}
                            onView={() => (navigate(`/property/${result._id}`))}
                        />
                    ))
                )}
            </div>

            <div className="flex items-center justify-center my-[50px] md:my-[70px]">
                <button 
                    type="button" 
                    onClick={() => navigate("/properties")}
                    className="bg-[#1A3C34] dark:bg-[#24574a] py-[12px] px-[32px] rounded-[10px] font-Manrope font-[500] text-[#FFFFFF] text-[18px] hover:bg-[#264d43] dark:hover:bg-[#2d6a5a]  shadow-lg hover:bg-[#264d43] dark:hover:bg-[#2d6a5a] transition-all transform hover:scale-105"
                >
                    View All Properties
                </button>
            </div>
        </div>
    );
};

export default FeaturedProperties;