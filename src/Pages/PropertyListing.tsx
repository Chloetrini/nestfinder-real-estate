import { useMemo, useState ,type FC} from 'react';
import { CircleLoader } from 'react-spinners';

import { useFetch } from '../Hooks/useFetch';
import Button from '../Components/Universal/Button';
import Pagination from '../Components/Universal/Pagination';
import PropertyHeader from '../Components/PropertyListing/PropertyHeader';
import Sort from '../Components/PropertyListing/Sort';
import { useNavigate } from 'react-router-dom';


interface Property {
	id: number;
	propertyName: string;
	image: string;
	location: string;
	size: string;
	bedrooms: number;
	bathrooms: number;
	price: string;
	discount: any;
	sale: string;
	PropertyType: string;
}
interface Filter {
	location: string;
	propertyType: string;
	bedrooms: string;
	listing: string;
	minPrice: string;
	maxPrice: string;
}
interface PropertyProps {
	isLoggedIn: boolean;
	setShowModal: (show: boolean) => void
}

const PropertyPage:FC<PropertyProps> = ({isLoggedIn,setShowModal}) => {
	const navigate = useNavigate();
	const { results, isLoading } = useFetch<Property[]>(
		'/src/Components/Universal/property.json',
	);
	const [applyFilter, setApplyFilter] = useState<Filter | null>();
	const [filter, setFilter] = useState<Filter>({
		location: '',
		propertyType: '',
		bedrooms: '',
		listing: '',
		minPrice: '',
		maxPrice: '',
	});
	const [sortBy, setSortBy] = useState<string>('');

	// console.log(applyFilter?.location);

	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, _setPostPerPage] = useState(12);
	const filteredResults = useMemo(() => {
		if (!results) return [];
		if (!applyFilter) return results;

		return results
			.filter((filtered) => {
				const location = applyFilter.location
					? filtered.location
							.toLowerCase()
							.includes(applyFilter.location.toLowerCase())
					: true;
				const property = applyFilter.propertyType
					? filtered.PropertyType === applyFilter.propertyType
					: true;
				const bedrooms = applyFilter.bedrooms
					? filtered.bedrooms === Number(applyFilter.bedrooms)
					: true;

				const sale = applyFilter.listing
					? filtered.sale === applyFilter.listing
					: true;
				const price = Number(filtered.price.replace(/[^0-9]/g, ''));
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
						Number(a.price.replace(/[^0-9]/g, '')) -
						Number(b.price.replace(/[^0-9]/g, ''))
					);
				}
				if (sortBy === 'highToLow') {
					return (
						Number(b.price.replace(/[^0-9]/g, '')) -
						Number(a.price.replace(/[^0-9]/g, ''))
					);
				}
				if (sortBy === "Discounted") {
            
            return Number(b.discount.replace(/[^0-9]/g, "")) - Number(a.discount.replace(/[^0-9]/g, "")) ;
        }
				return 0;
			});
	}, [results, applyFilter, sortBy]);

	if (isLoading) {
		return (
			<div className='flex justify-center font-bold h-screen items-center '>
				{/* <h1 >LOADING.........</h1> */}
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
		// typescript needs help knowing that name is a key of user
		const inputFieldName = name as keyof Filter;
		setFilter({ ...filter, [inputFieldName]: value });
		setApplyFilter(filter);
	};
	const handleClear = () => {
		setFilter({
			location: '',
			propertyType: '',
			bedrooms: '',
			listing: '',
			minPrice: '',
			maxPrice: '',
		});
		setSortBy('');
		setApplyFilter(filter);
	};

	return (
		<div>
			<div className='font-Manrope '>
				
				<PropertyHeader />
			</div>

			<div className='flex flex-col items-center justify-center md:w-[1200px] w-screen mx-auto container'>
				<div className=' flex flex-col relative z-10 items-center justify-center '>
					<div className='flex flex-col lg:flex-row shadow-2xl  lg:h-[123px] lg:py-[27px] lg:px-[16px] gap-[21px] lg:w-full mb-9 mt-9 items-center rounded-[10px] w-[399px] h-[463px] py-[12px] px-[24px]  text-[#656565] selectdiv'>
						<div className='w-[366px] lg:w-[183px] h-[69px] select'>
							<label htmlFor='location' className='flex items-center'>
								<img src='/src/assets/MapPin.svg' alt='' />
								Location
							</label>
							<select
								name='location'
								id='location'
								value={filter.location}
								onChange={handleChange}
								className='w-[366px] lg:w-[183px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] select '>
								<option value=''>All Cities</option>
								<option value='Ogun'>Ogun</option>
								<option value='Plateau'>Plateau</option>
								<option value='Lagos'>Lagos</option>
								<option value='Abuja'>Abuja</option>
								<option value='Oyo'>Oyo</option>
								<option value='Osun'>Osun</option>
							</select>
						</div>
						<div className='flex gap-[21px] w-[366px] items-center  justify-center selectdiv'>
							<div className='w-[183px] h-[69px] select'>
								<label
									htmlFor='propertyType'
									className='flex items-center  gap-1 '>
									<img src='/src/assets/HouseLine.svg' alt='' />
									Property Type
								</label>
								<select
									name='propertyType'
									value={filter.propertyType}
									onChange={handleChange}
									id='propertyType'
									className='lg:w-[183px] w-[162px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] select '>
									<option value=''>Property type</option>
									<option value='House'>House</option>
									<option value='Residential'>Residential</option>
									<option value='Apartment'>Apartment</option>
								</select>
							</div>
							<div className='w-[366px] lg:w-[183px] h-[69px] select'>
								<label htmlFor='bedrooms' className='flex items-center  gap-1'>
									<img src='/src/assets/Bed.svg' alt='' />
									No of Bedrooms
								</label>
								<select
									name='bedrooms'
									value={filter.bedrooms}
									onChange={handleChange}
									id=''
									className='lg:w-[183px] w-[162px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] select'>
									<option value=''>Bedrooms</option>
									<option value='1'>1</option>
									<option value='2'>2</option>
									<option value='3'>3</option>
									<option value='4'>4</option>
								</select>
							</div>
						</div>

						<div className='w-[366px] lg:w-[183px] h-[69px] select'>
							<label htmlFor='listing' className='flex items-center  gap-1'>
								<img src='/src/assets/listing.svg' alt='' />
								Status list
							</label>
							<select
								name='listing'
								onChange={handleChange}
								id=''
								value={filter.listing}
								className='w-[366px] lg:w-[183px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] select'>
								<option value=''>Status</option>
								<option value='For Rent'>For Rent</option>
								<option value='For Sale'>For Sale</option>
							</select>
						</div>
						<div className='w-[366px] lg:w-[183px] h-[69px] items-center'>
							<label htmlFor='price' className='flex items-center  gap-1'>
								<img src='/src/assets/CurrencyNgn.svg' alt='' />
								Price
							</label>
							<div className='flex gap-[6px]'>
								<input
									type='number'
									placeholder='min'
									className='w-[180px] lg:w-[96px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px]'
									id='minPrice'
									name='minPrice'
									min='1000000'
									step='1000000'
									max='8000000'
									onChange={handleChange}
									value={filter.minPrice}
								/>

								<input
									type='number'
									placeholder='max'
									className='w-[180px] lg:w-[96px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px]'
									id='maxPrice'
									name='maxPrice'
									min='1000000'
									step='1000000'
									max='8000000'
									onChange={handleChange}
									value={filter.maxPrice}
								/>
							</div>
						</div>
						<button
							onClick={() => setApplyFilter(filter)}
							className=' w-[366px] lg:w-[95px] h-[49px] bg-[#1A3C34] rounded-[10px] py-[12px] px-[24px] mt-2 text-white'>
							Apply
						</button>
					</div>
					<div className='w-full'>
						<Sort
							allPosts={results?.length}
							filteredPosts={filteredResults?.length}
							setSortBy={setSortBy}
							sortBy={sortBy}
							setApplyFilter={setApplyFilter}
							filter={filter}
						/>
					</div>

					{filteredResults.length > 0 ? (
						<div className='grid grid-cols-1  lg:grid-cols-3 gap-y-[55px] gap-x-[20px]  w-full middle max-w-full'>
							{currentProperty.map((result, id) => {
								return (
									<div
										key={id}
										className='w-[387px] h-[549px] shadow-2xl text-start flex flex-col items-center justify-center rounded-bl-[20px] rounded-br-[20px] relative mx-auto container '>
										<img className='h-[322px]' src={result.image} alt='' />
										<div className='h-[227px] p-5 flex flex-col gap-[19px]'>
											<h3 className='text-[#0A1916] font-bold text-[20px] '>
												{result.propertyName}
											</h3>
											<div className='flex items-center'>
												<img
													className='h-4.5 w-4.5'
													src='/src/assets/MapPin.svg'
													alt=''
												/>
												<p>{result.location}</p>
											</div>
											<div className='flex items-center gap-[10px]'>
												<div className='flex items-center gap-1'>
													<img
														className='h-4.5 w-4.5'
														src='/src/assets/mdi_set-square.svg'
														alt=''
													/>
													<p>{result.size}</p>
												</div>
												<div className='flex items-center gap-1'>
													<img
														className='h-4.5 w-4.5'
														src='/src/assets/Vector.svg'
														alt=''
													/>
													<p>
														{result.bedrooms} <span>Beds</span>
													</p>
													{}
												</div>
												<div className='flex items-center gap-1'>
													<img
														className='h-4.5 w-4.5'
														src='/src/assets/Bathtub.svg'
														alt=''
													/>
													<p>{result.bathrooms} Baths </p>
												</div>
											</div>
											<div className='flex items-center gap-[53px]'>
												<Button onClick={() => isLoggedIn? navigate(`/property/${result.id}`) : setShowModal(true)} />
												<p className='text-[25px]'>{result.price}</p>
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
						<div className='flex flex-col items-center justify-center gap-2 h-[803.69px]'>
							<div className='flex flex-col items-center justify-center gap-[82px]'>
								<img
									className='w-[714px] h-[578.69px]'
									src='/src/assets/image 8.svg'
									alt=''
								/>
								<div className='flex items-center flex-col'>
									<div className='flex items-center gap-1'>
										<img src='/src/assets/error.svg' alt='' />
										<p className='text-[#FF0000]'>
											We couldn't find any properties matching your search
											criteria
										</p>
									</div>
									<p>Try other filters</p>
								</div>
							</div>

							<button
								onClick={handleClear}
								className='w-[146px] h-[49px] rounded-[10px] py-[12px] px-[24px] bg-[#1A3C34] text-white'>
								Clear Filters
							</button>
						</div>
					)}

					<div className='w-full'>
						<Pagination
							totalPosts={filteredResults.length}
							postPerPage={postPerPage}
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyPage;
