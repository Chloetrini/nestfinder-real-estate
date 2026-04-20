import { useMemo, useState ,type FC} from 'react';
import { CircleLoader } from 'react-spinners';

import { useFetch } from '../Hooks/useFetch';
import Button from '../Components/Universal/Button';
import Pagination from '../Components/Universal/Pagination';
import PropertyHeader from '../Components/PropertyListing/PropertyHeader';
import Sort from '../Components/PropertyListing/Sort';
import { useNavigate } from 'react-router-dom';
import size from "/src/assets/sqaure.png"
import location from "/src/assets/location.png"
import bed from "/src/assets/bed.png"
import bath from "/src/assets/bath.png"
import home from "/src/assets/houseline.png"
import listing from "/src/assets/listing.png"
import price from "/src/assets/price.png"
import error from "/src/assets/error.png"
import clear from "/src/assets/clear.png"
import { useAuth } from '../context/AuthContext';
import HeaderNavBar from '../Components/Universal/HeaderNavBar';
import Footer from '../Components/Universal/Footer';

interface Property {
    id: number;
    propertyName: string;
    image: string;
    location: {fullAddress:string}
    details:{size: number;
    bedrooms: number;
    bathrooms: number;}
    price: number;
    discount: any;
    sale: string;
    PropertyType: string;
}
interface Filter {
    location: {fullAddress:string}
    propertyType: string;
    details:{bedrooms: string}
    listing: string;
    minPrice: string;
    maxPrice: string;
}

const PropertyPage:FC = () => {
     const {setShowModal, isLoggedIn}=useAuth()
    const navigate = useNavigate();
    const { results, isLoading } = useFetch<Property[]>(
        '/data/properties.json',
    );
    const [applyFilter, setApplyFilter] = useState<Filter | null>();
    const [filter, setFilter] = useState<Filter>({
        location: {fullAddress:""},
        propertyType: '',
        details:{bedrooms: ""},
        listing: '',
        minPrice: '',
        maxPrice: '',
    });
    const [sortBy, setSortBy] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, _setPostPerPage] = useState(12);
    const filteredResults = useMemo(() => {
        if (!results) return [];
        if (!applyFilter) return results;

        return results
            .filter((filtered) => {
                const location = applyFilter.location.fullAddress
                    ? filtered.location.fullAddress
                            .toLowerCase()
                            .includes(applyFilter.location.fullAddress.toLowerCase())
                    : true;
                const property = applyFilter.propertyType
                    ? filtered.PropertyType === applyFilter.propertyType
                    : true;
                const bedrooms = applyFilter.details.bedrooms
                    ? filtered.details.bedrooms === Number(applyFilter.details.bedrooms)
                    : true;

                const sale = applyFilter.listing
                    ? filtered.sale === applyFilter.listing
                    : true;
                const price = Number(filtered.price);
                const minPrice = applyFilter.minPrice
                    ? price >= Number(applyFilter.minPrice)
                    : true;
                const maxPrice = applyFilter.maxPrice
                    ? price <= Number(applyFilter.maxPrice)
                    : true;

                return location && property && bedrooms && sale && minPrice && maxPrice;
            })
            .sort((a, b) => {
                if (sortBy === 'lowToHigh') {
                    return (
                        Number(a.price) -
                        Number(b.price)
                    );
                }
                if (sortBy === 'highToLow') {
                    return (
                        Number(b.price) -
                        Number(a.price)
                    );
                }
                if (sortBy === "Discounted") {
            
            return Number(b.discount) - Number(a.discount) ;
        }
                return 0;
            });
    }, [results, applyFilter, sortBy]);

    if (isLoading) {
        return (
            <div className='flex justify-center font-bold h-screen items-center '>
                <CircleLoader size={40} color={'green'} />
            </div>
        );
    }
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentProperty = filteredResults?.slice(firstPostIndex, lastPostIndex);

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
) => {
    const { name, value } = e.target;

    if (name === 'location') {
        setFilter({ 
            ...filter, 
            location: { fullAddress: value } 
        });
    } else if (name === 'bedrooms') {
        setFilter({ 
            ...filter, 
            details: { ...filter.details, bedrooms: value } 
        });
    } else {
        const inputFieldName = name as keyof Filter;
        setFilter({ ...filter, [inputFieldName]: value });
    }
};

    const handleClear = () => {
        const emptyFilter = {
            location: {fullAddress:""},
            propertyType: '',
            details:{bedrooms: ""},
            listing: '',
            minPrice: '',
            maxPrice: '',
        };
        
        setFilter(emptyFilter);
        setApplyFilter(emptyFilter);
        setSortBy('');
        setCurrentPage(1);
    };

    return (
        <div className='overflow-x-hidden'>
            <HeaderNavBar/>
    
            <PropertyHeader />
        

            <div className='flex flex-col items-center justify-center md:max-w-[1200px] w-full mx-auto container '>
                <div className=' flex flex-col relative z-10 items-center justify-center  '>
                    
                    {/* FILTER BAR SECTION */}
                    <div className='flex flex-col lg:flex-row shadow-2xl bg-white lg:h-[123px] lg:max-w-[1200px] lg:py-[27px] lg:px-[30px] lg:justify-between w-full mb-9 mt-9 items-center lg:items-end rounded-[10px] max-w-full h-auto  py-[12px] px-[8px] gap-[21px] lg:gap-4 text-[#656565] selectdiv mx-4 lg:mx-0' style={{width: 'calc(100% - 2rem)'}} >

                        <div className='w-[366px] lg:w-[180px] xl:w-[220px] h-[69px] select'>
                            <label htmlFor='location' className='flex items-center gap-1 mb-1'>
                                <img src={location} alt='' />
                                Location
                            </label>
                            <select
                                name='location'
                                id='location'
                                value={filter.location.fullAddress}
                                onChange={handleChange}
                                className='w-full h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] select '>
                                <option value=''>All Cities</option>
                                <option value='Ogun'>Ogun</option>
                                <option value='Plateau'>Plateau</option>
                                <option value='Lagos'>Lagos</option>
                                <option value='Abuja'>Abuja</option>
                                <option value='Oyo'>Oyo</option>
                                <option value='Osun'>Osun</option>
                            </select>
                        </div>
                        <div className='flex gap-[13px] w-full items-center max-w-[366px] justify-center lg:contents selectdiv'>
                            <div className='w-full lg:w-[180px] xl:w-[210px] h-[69px] select'>
                                <label
                                    htmlFor='propertyType'
                                    className='flex items-center  gap-1 mb-1 '>
                                    <img src={home} alt='' />
                                    Property Type
                                </label>
                                <select
                                    name='propertyType'
                                    value={filter.propertyType}
                                    onChange={handleChange}
                                    id='propertyType'
                                    className='w-full h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] select '>
                                    <option value=''>Property type</option>
                                    <option value='House'>House</option>
                                    <option value='Residential'>Residential</option>
                                    <option value='Apartment'>Apartment</option>
                                </select>
                            </div>
                            <div className='w-full lg:w-[170px] xl:w-[200px] h-[69px] select'>
                                <label htmlFor='bedrooms' className='flex items-center  gap-1 mb-1'>
                                    <img src={bed} alt='' />
                                    No of Bedrooms
                                </label>
                                <select
                                    name='bedrooms'
                                    value={filter.details.bedrooms}
                                    onChange={handleChange}
                                    id=''
                                    className='w-full h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] select'>
                                    <option value=''>Bedrooms</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                </select>
                            </div>
                        </div>

                        <div className='w-[366px] lg:w-[160px] xl:w-[190px] h-[69px] select'>
                            <label htmlFor='listing' className='flex items-center  gap-1 mb-1'>
                                <img src={listing} alt='' />
                                Status list
                            </label>
                            <select
                                name='listing'
                                onChange={handleChange}
                                id=''
                                value={filter.listing}
                                className='w-full h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] select'>
                                <option value=''>Status</option>
                                <option value='For Rent'>For Rent</option>
                                <option value='For Sale'>For Sale</option>
                            </select>
                        </div>
                        <div className='w-[366px] lg:w-[190px] xl:w-[230px] h-[69px] items-center'>
                            <label htmlFor='price' className='flex items-center  gap-1 mb-1'>
                                <img src={price} alt='' />
                                Price
                            </label>
                            <div className='flex gap-[6px]'>
                                <input
                                    type='number'
                                    placeholder='min'
                                    className='w-full lg:w-[96px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] min-w-0'
                                    id='minPrice'
                                    name='minPrice'
                                    min='1000000'
                                    step='1000000'
                                    onChange={handleChange}
                                    value={filter.minPrice}
                                />

                                <input
                                    type='number'
                                    placeholder='max'
                                    className='w-full lg:w-[96px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] min-w-0'
                                    id='maxPrice'
                                    name='maxPrice'
                                    min='1000000'
                                    step='1000000'
                                    onChange={handleChange}
                                    value={filter.maxPrice}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => { setApplyFilter(filter); setCurrentPage(1); }}
                            className=' w-[366px] lg:w-[100px] xl:w-[120px] h-[39px] bg-[#1A3C34] rounded-[10px] text-white lg:mb-[0px] font-semibold'>
                            Apply
                        </button>
                    </div>

                    {/* SORT SECTION - Hidden when 0 results */}
                    {filteredResults.length > 0 && (
                        <div className='w-full px-8 md:px-0'>
                            <Sort
                                allPosts={results?.length}
                                filteredPosts={filteredResults?.length}
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                setApplyFilter={setApplyFilter}
                                filter={filter}
                            />
                        </div>
                    )}

                    {/* PROPERTY CARDS */}
                    {filteredResults.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[55px] gap-x-[20px]  w-full middle px-8 md:px-0 justify-items-center'>
                            {currentProperty.map((result, id) => {
                                return (
                                    <div
                                        key={id}
                                        className='w-full max-w-[387px] max-h-[549px] shadow-2xl text-start flex flex-col items-center justify-center rounded-bl-[20px] rounded-br-[20px] relative mx-auto container '>
                                        <img className='h-[322px]' src={result.image} alt='' />
                                        <div className='h-[227px] p-5 flex flex-col gap-[19px] '>
                                            <h3 className='text-[#0A1916] font-bold text-[20px] '>
                                                {result.propertyName}
                                            </h3>
                                            <div className='flex items-center gap-1'>
                                                <img
                                                    className='h-4 w-3'
                                                    src={location}
                                                    alt=''
                                                />
                                                <p>{result.location.fullAddress}</p>
                                            </div>
                                            <div className='flex items-center gap-[10px]'>
                                                <div className='flex items-center gap-1'>
                                                    <img
                                                        className='h-4 w-4'
                                                        src={size}
                                                        alt=''
                                                    />
                                                    <p>{result.details.size}</p>
                                                </div>
                                                <div className='flex items-center gap-1'>
                                                    <img
                                                        className='h-4 w-4'
                                                        src={bed}
                                                        alt=''
                                                    />
                                                    <p>
                                                        {result.details.bedrooms} <span>Beds</span>
                                                    </p>
                                                </div>
                                                <div className='flex items-center gap-1'>
                                                    <img
                                                        className='h-4 w-4'
                                                        src={bath}
                                                        alt=''
                                                    />
                                                    <p>{result.details.bathrooms} Baths </p>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-[53px]'>
                                                <Button onClick={() => isLoggedIn? navigate(`/property/${result.id}`) : setShowModal(true)} />
                                                <p className='text-[25px]'><span>₦</span>{result.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className={`absolute w-[112px] h-[49px] px-[24px] py-[12px] rounded-[10px]
                     ${(Number(result.discount.replace(/[^0-9]/g, "") <= 20) ? 'bg-green-500' : (Number(result.discount.replace(/[^0-9]/g, "") <= 30) ? 'bg-[#F4A261]' : 'bg-red-500' ))}
                     ${(result.discount === "") ? 'hidden' : 'block'} bg-[#F4A261] text-white top-2 right-2`}>{result.discount}</div>
                                        </div>
                                    
                                );
                            })}
                        </div>
                    ) : (
                        /* ERROR SECTION - Updated as requested */
                        <div className='flex flex-col items-center justify-center gap-[40px] h-[803.69px] w-full'>
                            <img
                                className='w-full max-w-[500px] lg:max-w-[600px] h-auto object-contain'
                                src={clear}
                                alt=''
                            />
                            <div className='flex items-center flex-col w-full'>
                                <div className='flex items-center md:gap-2 gap-1  justify-center'>
                                    <img src={error} alt='' className='w-5 h-5' />
                                    <p className='text-[#FF0000] font-medium text-center text-[16px] lg:text-[20px] w-full'>
                                        We couldn't find any properties matching your search criteria
                                    </p>
                                </div>
                                <p className='text-[#656565] text-[14px] lg:text-[16px]'>Try other filters</p>
                            </div>

                            <button
                                onClick={handleClear}
                                className='w-[146px] h-[49px] rounded-[10px] py-[12px] px-[24px] bg-[#1A3C34] text-white'>
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {filteredResults.length > 0 && (
                        <div className='w-full px-9 md:px-0 my-14'>
                            <Pagination
                                totalPosts={filteredResults.length}
                                postPerPage={postPerPage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default PropertyPage;
