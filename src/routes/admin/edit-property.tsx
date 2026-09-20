import { Link, useParams } from 'react-router-dom'
import { PropertyForm } from '@/components/admin/property-form'
import { useProperties } from '@/context/property-context'
import { useSeo } from '@/hooks/use-seo'

// /adminPage/edit-property/:id  (each property has its own edit URL, so a refresh keeps you on the same form)
const EditProperty = () => {
  const { id } = useParams()
  const { properties } = useProperties()
  const property = properties.find(p => p._id === id)

  useSeo({ title: property ? `Edit ${property.propertyName}` : 'Edit property', noindex: true })

  if (!property) {
    return (
      <div className="p-10 text-center font-[Lato] text-[#023337] dark:text-gray-100">
        <p className="text-[18px] font-bold mb-4">Property not found</p>
        <Link to="/adminPage/manage-property" className="text-[#1A3C34] dark:text-[#8fd3c0] underline">
          Back to Manage Property
        </Link>
      </div>
    )
  }

  return <PropertyForm key={property._id} property={property} />
}

export default EditProperty
