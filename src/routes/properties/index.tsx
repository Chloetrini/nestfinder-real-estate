import { useEffect, useMemo, useState, type FC } from "react";
import { useSeo } from '@/hooks/use-seo'
import PropertyCard from "@/components/shared/property-card";
import Pagination from "@/components/ui/pagination";
import PropertyHeader from "@/components/property-listing/property-header";
import Sort from "@/components/property-listing/sort";
import { useNavigate, useSearchParams } from "react-router-dom";
import location from "@/assets/icons/location.png";
import bed from "@/assets/icons/bed.png";
import home from "@/assets/icons/houseline.png";
import listing from "@/assets/icons/listing.png";
import price from "@/assets/icons/price.png";
import clear from "@/assets/images/no-results.webp";
import HeaderNavBar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import error from "@/assets/icons/error.png"
import { useProperties } from "@/hooks/properties/use-properties";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import SearchBox from "@/components/search/search-box";
import { PropertyGridSkeleton } from "@/components/skeletons/property-card-skeleton";
import { allStates } from "@/constants/nigeria-states";

interface Filter {
  location: { fullAddress: string };
  propertyType: string;
  details: { bedrooms: string };
  listing: string;
  minPrice: string;
  maxPrice: string;
}

const PropertyPage: FC = () => {
  useSeo({ title: 'Properties for rent and sale', description: 'Browse homes for rent and sale across Nigeria. Filter by location, type, bedrooms and price.' })
  const navigate = useNavigate();

  const { data: results = [], isLoading, isError } = useProperties();

  // Every search and filter lives in the address bar (?q=lekki&type=Villa&beds=3...), so a search can be shared or bookmarked
  const [params, setParams] = useSearchParams();
  const fromUrl: Filter = {
    location: { fullAddress: params.get("state") ?? "" },
    propertyType: params.get("type") ?? "",
    details: { bedrooms: params.get("beds") ?? "" },
    listing: params.get("status") ?? "",
    minPrice: params.get("min") ?? "",
    maxPrice: params.get("max") ?? "",
  };
  const hasUrlFilter = Boolean(fromUrl.location.fullAddress || fromUrl.propertyType || fromUrl.details.bedrooms || fromUrl.listing || fromUrl.minPrice || fromUrl.maxPrice);

  const [applyFilter, setApplyFilter] = useState<Filter | null>(hasUrlFilter ? fromUrl : null);
  const [filter, setFilter] = useState<Filter>(fromUrl);
  const [query, setQuery] = useState<string>(params.get("q") ?? "");
  const deferredQuery = useDebouncedValue(query, 250); // the list waits for a short pause in typing
  const [sortBy, setSortBy] = useState<string>(params.get("sort") ?? "");
  const [currentPage, setCurrentPage] = useState(Number(params.get("page")) || 1);
  const [postPerPage, _setPostPerPage] = useState(12);

  // Keep the address bar in step with what is on screen
  useEffect(() => {
    const next = new URLSearchParams();
    if (deferredQuery.trim()) next.set("q", deferredQuery.trim());
    if (applyFilter?.location.fullAddress) next.set("state", applyFilter.location.fullAddress);
    if (applyFilter?.propertyType) next.set("type", applyFilter.propertyType);
    if (applyFilter?.details.bedrooms) next.set("beds", applyFilter.details.bedrooms);
    if (applyFilter?.listing) next.set("status", applyFilter.listing);
    if (applyFilter?.minPrice) next.set("min", applyFilter.minPrice);
    if (applyFilter?.maxPrice) next.set("max", applyFilter.maxPrice);
    if (sortBy) next.set("sort", sortBy);
    if (currentPage > 1) next.set("page", String(currentPage));
    setParams(next, { replace: true });
  }, [deferredQuery, applyFilter, sortBy, currentPage, setParams]);

  const filteredResults = useMemo(() => {
    if (!results) return [];
    const words = deferredQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const active: Filter = applyFilter ?? { location: { fullAddress: "" }, propertyType: "", details: { bedrooms: "" }, listing: "", minPrice: "", maxPrice: "" };
    const applyFilterSafe = active;

    return results
      .filter((filtered) => {
        // Search box: every word must appear in the name, address, city, state or type
        if (words.length) {
          const haystack = `${filtered.propertyName} ${filtered.location.fullAddress} ${filtered.location.city} ${filtered.location.state} ${filtered.propertyType} ${filtered.sale}`.toLowerCase();
          if (!words.every((w) => haystack.includes(w))) return false;
        }
        const applyFilter = applyFilterSafe;
        const locationMatch = applyFilter.location.fullAddress
          ? filtered.location.fullAddress
              .toLowerCase()
              .includes(applyFilter.location.fullAddress.toLowerCase())
          : true;

        // ---- BACKEND UPDATED: propertyType instead of PropertyType ----
        const property = applyFilter.propertyType
          ? filtered.propertyType === applyFilter.propertyType
          : true;

        // ---- BACKEND UPDATED: propertyDetails.bedrooms instead of details.bedrooms ----
        const bedrooms = applyFilter.details.bedrooms
          ? filtered.propertyDetails.bedrooms === Number(applyFilter.details.bedrooms)
          : true;

        const sale = applyFilter.listing
          ? filtered.sale === applyFilter.listing
          : true;

        const priceNum = Number(filtered.price);
        const minPrice = applyFilter.minPrice
          ? priceNum >= Number(applyFilter.minPrice)
          : true;
        const maxPrice = applyFilter.maxPrice
          ? priceNum <= Number(applyFilter.maxPrice)
          : true;

        return locationMatch && property && bedrooms && sale && minPrice && maxPrice;
      })
      .sort((a, b) => {
        if (sortBy === "lowToHigh") return Number(a.price) - Number(b.price);
        if (sortBy === "highToLow") return Number(b.price) - Number(a.price);
        if (sortBy === "Discounted") {
          // ---- BACKEND UPDATED: discount is a string like "10%" ----
          return (
            Number(b.discount.replace(/[^0-9]/g, "")) -
            Number(a.discount.replace(/[^0-9]/g, ""))
          );
        }
        return 0;
      });
  }, [results, applyFilter, sortBy, deferredQuery]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentProperty = filteredResults?.slice(firstPostIndex, lastPostIndex);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "location") {
      setFilter({ ...filter, location: { fullAddress: value } });
    } else if (name === "bedrooms") {
      setFilter({ ...filter, details: { ...filter.details, bedrooms: value } });
    } else {
      const inputFieldName = name as keyof Filter;
      setFilter({ ...filter, [inputFieldName]: value });
    }
  };

  const handleClear = () => {
    const emptyFilter = {
      location: { fullAddress: "" },
      propertyType: "",
      details: { bedrooms: "" },
      listing: "",
      minPrice: "",
      maxPrice: "",
    };
    setFilter(emptyFilter);
    setApplyFilter(null);
    setQuery("");
    setSortBy("");
    setCurrentPage(1);
  };

  // One removable chip per applied filter
  const removeFilter = (patch: Partial<Filter> | ((f: Filter) => Filter)) => {
    const update = (f: Filter): Filter => (typeof patch === "function" ? patch(f) : { ...f, ...patch });
    setFilter(update);
    setApplyFilter((f) => (f ? update(f) : f));
    setCurrentPage(1);
  };
  const money = (n: string) => `₦${Number(n).toLocaleString()}`;
  const chips = applyFilter
    ? [
        applyFilter.location.fullAddress && { key: "state", label: applyFilter.location.fullAddress, remove: () => removeFilter((f) => ({ ...f, location: { fullAddress: "" } })) },
        applyFilter.propertyType && { key: "type", label: applyFilter.propertyType, remove: () => removeFilter({ propertyType: "" }) },
        applyFilter.details.bedrooms && { key: "beds", label: `${applyFilter.details.bedrooms} bed`, remove: () => removeFilter((f) => ({ ...f, details: { bedrooms: "" } })) },
        applyFilter.listing && { key: "status", label: applyFilter.listing, remove: () => removeFilter({ listing: "" }) },
        applyFilter.minPrice && { key: "min", label: `from ${money(applyFilter.minPrice)}`, remove: () => removeFilter({ minPrice: "" }) },
        applyFilter.maxPrice && { key: "max", label: `up to ${money(applyFilter.maxPrice)}`, remove: () => removeFilter({ maxPrice: "" }) },
      ].filter((c): c is { key: string; label: string; remove: () => void } => Boolean(c))
    : [];

  return (
    <div className="dark:bg-[#0b1512] min-h-screen">
     
        <HeaderNavBar />
      
      
      <div className="font-Manrope z-0">
        <PropertyHeader />
      </div>

      <div className="flex flex-col items-center justify-center md:max-w-[1200px] w-full mx-auto container">
        <div className="flex flex-col relative z-10 items-center justify-center">

          {/* Search as you type */}
          <div className="relative z-30 w-full px-4 lg:px-0 mt-9 max-w-[1200px]">
            <SearchBox
              value={query}
              onChange={(v) => { setQuery(v); setCurrentPage(1); }}
              onSubmit={(v) => { setQuery(v); setCurrentPage(1); }}
              onSelect={(s) => {
                if (s.kind === "property") navigate(`/property/${s.id}`);
                else if (s.kind === "type") {
                  const next = { ...filter, propertyType: s.label };
                  setFilter(next); setApplyFilter(next); setQuery(""); setCurrentPage(1);
                } else { setQuery(s.label.split(",")[0]); setCurrentPage(1); }
              }}
            />
          </div>

          {/* Filter Bar */}
          <div className='flex flex-col lg:flex-row shadow-xl bg-white dark:bg-[#12201c] dark:ring-1 dark:ring-white/10 max-[321px]:w-[310px] lg:h-[123px] lg:max-w-[1200px] lg:py-[27px] lg:px-[30px] lg:justify-between lg:w-full mb-9 mt-9 items-center lg:items-end rounded-[10px] h-auto py-[12px] md:px-[8px] gap-[21px] lg:gap-4 text-[#656565] dark:text-gray-300 selectdiv mx-4 lg:mx-0 max-w-[398px] text-[13px] md:text-[16px] font-[Manrope]'>

            <div className='w-full max-[321px]:w-[310px] lg:w-[180px] xl:w-[220px] h-[69px] select px-3 lg:px-0'>
              <label htmlFor='location' className='flex items-center gap-1 mb-1'>
                <img className="dark:invert" src={location} alt='' />
                Location
              </label>
              {/* ---- BACKEND UPDATED: now shows all 36 Nigeria states ---- */}
              <div className="relative w-full">
                <select
                  name='location'
                  id='location'
                  value={filter.location.fullAddress}
                  onChange={handleChange}
                  className='w-full h-[39px] border-[1px] px-[10px] pr-[32px] rounded-[10px] text-[14px] appearance-none bg-white dark:bg-[#0b1512] dark:border-gray-600 dark:text-gray-100 cursor-pointer'>
                  <option value=''>All States</option>
                  {allStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-[10px] flex items-center">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className='flex gap-[13px] max-[321px]:w-[310px] w-full items-center lg:max-w-[366px] px-3 lg:px-0 justify-center lg:contents selectdiv'>
              <div className='w-full lg:w-[180px] xl:w-[210px] h-[69px] select'>
                <label htmlFor='propertyType' className='flex items-center gap-1 mb-1'>
                  <img className="dark:invert" src={home} alt='' />
                  Property Type
                </label>
                <div className="relative w-full">
                  <select
                    name='propertyType'
                    value={filter.propertyType}
                    onChange={handleChange}
                    id='propertyType'
                    className='w-full h-[39px] border-[1px] px-[10px] pr-[32px] rounded-[10px] text-[14px] appearance-none bg-white dark:bg-[#0b1512] dark:border-gray-600 dark:text-gray-100 cursor-pointer select'>
                    <option value=''>Property type</option>
                    <option value='House'>House</option>
                    <option value='Villa'>Villa</option>
                    <option value='Duplex'>Duplex</option>
                    <option value='Residential'>Residential</option>
                    <option value='Apartment'>Apartment</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-[10px] flex items-center">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='w-full lg:w-[170px] xl:w-[200px] h-[69px] select'>
                <label htmlFor='bedrooms' className='flex items-center gap-1 mb-1'>
                  <img className="dark:invert" src={bed} alt='' />
                  No of Bedrooms
                </label>
                {/* ---- BACKEND UPDATED: now shows 1-50 bedroom options ---- */}
                <div className="relative w-full">
                  <select
                    name='bedrooms'
                    value={filter.details.bedrooms}
                    onChange={handleChange}
                    className='w-full h-[39px] border-[1px] px-[10px] pr-[32px] rounded-[10px] text-[14px] appearance-none bg-white dark:bg-[#0b1512] dark:border-gray-600 dark:text-gray-100 cursor-pointer select'>
                    <option value=''>Bedrooms</option>
                    {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={String(num)}>{num}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-[10px] flex items-center">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full max-[321px]:w-[310px] lg:w-[180px] xl:w-[220px] h-[69px] select px-3 lg:px-0'>
              <label htmlFor='listing' className='flex items-center gap-1 mb-1'>
                <img className="dark:invert" src={listing} alt='' />
                Status list
              </label>
              <div className="relative w-full">
                <select
                  name='listing'
                  onChange={handleChange}
                  value={filter.listing}
                  className='w-full h-[39px] border-[1px] px-[10px] pr-[32px] rounded-[10px] text-[14px] appearance-none bg-white dark:bg-[#0b1512] dark:border-gray-600 dark:text-gray-100 cursor-pointer select'>
                  <option value=''>Status</option>
                  <option value='For Rent'>For Rent</option>
                  <option value='For Sale'>For Sale</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-[10px] flex items-center">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className='max-w-[366px] max-[321px]:w-[310px] lg:w-[190px] xl:w-[230px] h-[69px] px-3 lg:px-0 items-center'>
              <label htmlFor='price' className='flex items-center gap-1 mb-1'>
                <img className="dark:invert" src={price} alt='' />
                Price
              </label>
              <div className='flex gap-[6px]'>
                <input
                  type='number'
                  placeholder='min'
                  min={0}
                  step={1000000}
                  className='w-full lg:w-[96px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] min-w-0 bg-white dark:bg-[#0b1512] dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500'
                  name='minPrice'
                  onChange={handleChange}
                  value={filter.minPrice}
                />
                <input
                  type='number'
                  placeholder='max'
                  className='w-full lg:w-[96px] h-[39px] border-[1px] p-[10px] rounded-[10px] text-[14px] min-w-0 bg-white dark:bg-[#0b1512] dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500'
                  name='maxPrice'
                  min={0}
                  step={1000000}
                  onChange={handleChange}
                  value={filter.maxPrice}
                />
              </div>
            </div>

            <button
              onClick={() => { setApplyFilter(filter); setCurrentPage(1); }}
              className='w-full max-[321px]:w-[290px] max-[376px]:w-[320px] max-w-[350px] lg:max-w-[100px] xl:w-[120px] h-[39px] bg-[#1A3C34] dark:bg-[#24574a] rounded-[10px] text-white font-semibold px-3 lg:px-0 hover:bg-[#264d43] dark:hover:bg-[#2d6a5a] transition-all transform hover:scale-105'>
              Apply
            </button>
          </div>

          {(applyFilter && chips.length > 0) || query.trim() ? (
            <div className="flex w-full flex-wrap items-center gap-2 px-4 pb-4 lg:px-0" aria-label="Active filters">
              {query.trim() && (
                <button onClick={() => setQuery("")} className="flex items-center gap-1 rounded-full bg-[#D7FFF6] px-3 py-1 text-[13px] text-[#1A3C34] transition-transform hover:scale-105 dark:bg-[#0f3b32] dark:text-[#8fd3c0]">
                  "{query.trim()}" <span aria-hidden="true">×</span>
                  <span className="sr-only">Remove search</span>
                </button>
              )}
              {chips.map((chip) => (
                <button key={chip.key} onClick={chip.remove} className="flex items-center gap-1 rounded-full bg-[#D7FFF6] px-3 py-1 text-[13px] text-[#1A3C34] transition-transform hover:scale-105 dark:bg-[#0f3b32] dark:text-[#8fd3c0]">
                  {chip.label} <span aria-hidden="true">×</span>
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
              <button onClick={handleClear} className="text-[13px] text-gray-500 underline dark:text-gray-400">Clear all</button>
              <span className="ml-auto text-[13px] text-gray-500 dark:text-gray-400">{filteredResults.length} found</span>
            </div>
          ) : null}

          {filteredResults.length > 0 && (
            <div className="w-full ">
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

          {isLoading ? (
            <PropertyGridSkeleton count={6} />
          ) : isError ? (
            <p className="my-24 text-red-500 font-semibold">We couldn't load properties. Please refresh the page.</p>
          ) : filteredResults.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[30px] md:gap-y-[47px] lg:gap-y-[55px] gap-x-[20px] w-full justify-items-center inbetween px-6'>
              {currentProperty.map((result, i) => (
                <PropertyCard
                  index={i}
                  key={result._id}
                  property={result}
                  onView={() => (navigate(`/property/${result._id}`))}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 h-[803.69px] mb-12 ">
              <div className="flex flex-col items-center justify-center gap-[82px]">
                <img className="w-[714px] h-[578.69px]" src={clear} alt="" />
                <div className="flex items-center flex-col">
                 <div className='flex flex-col md:flex-row items-center md:gap-2 gap-1 justify-center w-full max-w-4xl'>
        {/* Added max-w-4xl to keep the layout tight on huge screens */}
        <img src={error} alt='' className='w-5 h-5 flex-shrink-0 justify-self-center ' /> 
        {/* Added flex-shrink-0 so the icon doesn't squash when text gets long */}
        <p className='text-[#FF0000] font-medium text-center text-[16px] lg:text-[20px] leading-tight'>
            We couldn't find any properties matching your search criteria
        </p>
    </div>
                  <p>Try other filters</p>
                </div>
              </div>
              <button
                onClick={handleClear}
                className="w-[146px] h-[49px] rounded-[10px] py-[12px] px-[24px] bg-[#1A3C34] dark:bg-[#24574a] text-white hover:bg-[#264d43] dark:hover:bg-[#2d6a5a] transition-all transform hover:scale-105 my-12 ">
                Clear Filters
              </button>
            </div>
          )}
{filteredResults.length > 0 &&
          <div className="w-full px-6 my-8">
            <Pagination
              totalPosts={filteredResults.length}
              postPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyPage;
