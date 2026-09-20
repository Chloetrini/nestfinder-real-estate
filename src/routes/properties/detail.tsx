import { useNavigate, useParams } from 'react-router-dom';
import Images from '@/components/property-details/image-gallery';
import HousePacks from '@/components/property-details/house-packs';
import PropertiesDetail from '@/components/property-details/property-info';
import MapView from '@/components/property-details/map-view';
import CardComponent from '@/components/property-details/agent-card';
import AgentForm from '@/components/property-details/agent-form';
import PropertyCard from '@/components/shared/property-card';
import PropertyDetailsSkeleton from '@/components/skeletons/property-details-skeleton';
import HeaderNavBar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import housing from '@/assets/images/housing.webp';
import PaymentCalculator from '@/components/property-details/payment-calculator';
import Reveal from '@/components/ui/reveal';
import { useSeo } from '@/hooks/use-seo';
import { useProperties, useProperty } from '@/hooks/properties/use-properties';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // The property (instant when the listing is already cached) and the list for "Explore more"
  const { data: property, isLoading } = useProperty(id);
  const { data: allProperties = [] } = useProperties();

  useSeo({
    title: property?.propertyName ?? 'Property details',
    description: property
      ? `${property.propertyName} in ${property.location.fullAddress}. View photos, price and contact the agent on NestFinder Pro.`
      : undefined,
  });

  if (isLoading) return <PropertyDetailsSkeleton />;

  if (!property) {
    return (
      <div className='flex justify-center font-bold h-screen items-center text-4xl'>
        Property not found
      </div>
    );
  }

  return (
    <div className="dark:bg-[#0b1512] min-h-screen">
      <HeaderNavBar />
     
      <div className="w-full mx-auto container px-3 md:px-10 space-y-14 mt-8 md:max-w-[1280px]">

        {/* ---- BACKEND UPDATED: pass full images array to Images component ---- */}
        {/* ---- BACKEND REMOVED: mainImage single string ---- */}
        <Images images={property.images} />

        <HousePacks
          name={property.propertyName}
          location={property.location}
          price={property.price}
          // ---- BACKEND UPDATED: propertyDetails instead of details ----
          details={property.propertyDetails}
        />

        {/* Desktop Layout */}
        <div className="flex-col lg:flex-row gap-10 hidden md:flex">
          <div className="flex-1">
            <PropertiesDetail property={property} />
            <div className="my-8"><PaymentCalculator property={property} /></div>
            <MapView
            coordinates={property.coordinates}
              location={property.location}
              image={property.images[0] || housing}
              propertyName={property.propertyName}
            />
          </div>
          <div className="flex flex-col gap-5">
            <CardComponent agentPhone={property.agentPhone} agentName={property.agentName} />
            <AgentForm propertyId={property._id} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex-col lg:flex-row gap-10 flex md:hidden">
          <PropertiesDetail property={property} />
          <PaymentCalculator property={property} />
          <CardComponent agentPhone={property.agentPhone} agentName={property.agentName} />
          <AgentForm propertyId={property._id} />
          <MapView
            location={property.location}
             coordinates={property.coordinates}
            image={property.images[0] || housing}
            propertyName={property.propertyName}
          />
        </div>

        {/* Explore More Properties Section */}
        <Reveal className='mt-16 mb-30 items-center justify-center'>
          <div className='lg:text-[41px] text-[25px] mb-7 text-center md:text-start'>
            Explore More Properties
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-y-[30px] md:gap-y-[47px] lg:gap-y-[55px] gap-x-[20px] w-full max-w-[1200px] justify-items-center inbetween'>
            {allProperties
              /* ---- BACKEND UPDATED: filter by _id instead of id ---- */
              .filter((prop) => prop._id !== id)
              .slice(0, 3)
              .map((result) => (
                <PropertyCard key={result._id} property={result} onView={() => navigate(`/property/${result._id}`)} />
              ))}
          </div>
        </Reveal>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetails;