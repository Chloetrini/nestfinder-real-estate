import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProperties } from '@/context/property-context'
import { useEnquiries } from '@/hooks/admin/use-admin'
import { useSeo } from '@/hooks/use-seo'
import { optimizeImage } from '@/lib/image'
import FeatureButton from '@/components/admin/feature-button'

const Badge = ({ children, tone }: { children: string; tone: 'green' | 'orange' | 'gray' | 'blue' }) => {
  const tones = {
    green: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  }
  return <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${tones[tone]}`}>{children}</span>
}

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-xl bg-[#F3F4F6] dark:bg-gray-800 px-4 py-3 text-center">
    <p className="text-[20px] font-bold text-[#023337] dark:text-gray-100">{value}</p>
    <p className="text-[12px] text-gray-500 dark:text-gray-400">{label}</p>
  </div>
)

// /adminPage/property/:id  -  everything about one listing, with Edit and Delete
const AdminPropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { properties, deleteProperty } = useProperties()
  const { data: enquiries = [] } = useEnquiries()
  const property = properties.find(p => p._id === id)

  const [activeImage, setActiveImage] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useSeo({ title: property?.propertyName ?? 'Property', noindex: true })

  if (!property) {
    return (
      <div className="p-10 text-center font-[Lato] text-[#023337] dark:text-gray-100">
        <p className="text-[18px] font-bold mb-4">Property not found</p>
        <Link to="/adminPage/manage-property" className="text-[#1A3C34] dark:text-[#8fd3c0] underline">Back to Manage Property</Link>
      </div>
    )
  }

  const propertyEnquiries = enquiries.filter(e => e.propertyId === property._id)
  const images = property.images ?? []
  const created = property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteProperty(property._id)
    navigate('/adminPage/manage-property', { replace: true })
  }

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 font-[Lato] animate-fade-up">
      {/* Title + actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge tone={property.isDraft ? 'orange' : 'green'}>{property.isDraft ? 'Draft' : 'Published'}</Badge>
            <Badge tone="blue">{property.sale}</Badge>
            <Badge tone="gray">{property.propertyType}</Badge>
            {property.isFeatured && <Badge tone="orange">Featured</Badge>}
          </div>
          <h1 className="text-[24px] md:text-[30px] font-bold text-[#023337] dark:text-gray-100">{property.propertyName}</h1>
          <p className="text-[15px] text-gray-600 dark:text-gray-300">{property.location.fullAddress}, {property.location.city}, {property.location.state}</p>
          <p className="text-[28px] font-bold text-[#1A3C34] dark:text-[#8fd3c0]">₦{property.price.toLocaleString()}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {!property.isDraft && (
            <button onClick={() => navigate(`/property/${property._id}`)} className="rounded-[10px] border border-[#1A3C34] dark:border-[#3b8a76] px-5 py-3 text-[#1A3C34] dark:text-[#8fd3c0] transition-colors hover:bg-[#D7FFF6] dark:hover:bg-[#0f3b32]">
              View live page
            </button>
          )}
          <FeatureButton property={property} variant="full" />
          <button onClick={() => navigate(`/adminPage/edit-property/${property._id}`)} className="rounded-[10px] bg-[#1A3C34] dark:bg-[#24574a] px-5 py-3 font-bold text-white transition-transform hover:scale-105">
            Edit
          </button>
          <button onClick={() => setConfirmDelete(true)} className="rounded-[10px] bg-red-500 px-5 py-3 font-bold text-white transition-transform hover:scale-105 hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <div className="overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 h-[280px] md:h-[440px]">
          {images[activeImage] ? (
            <img key={activeImage} src={optimizeImage(images[activeImage], 1200)} alt={property.propertyName} className="h-full w-full object-cover animate-fade-up" />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">No photos yet</div>
          )}
        </div>
        <div className="flex gap-3 overflow-x-auto lg:grid lg:grid-cols-2 lg:overflow-visible lg:content-start">
          {images.map((src, i) => (
            <button key={src + i} onClick={() => setActiveImage(i)} className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all ${i === activeImage ? 'border-[#1A3C34] dark:border-[#8fd3c0]' : 'border-transparent opacity-70 hover:opacity-100'}`}>
              <img src={optimizeImage(src, 300)} alt="" loading="lazy" className="h-24 w-32 lg:h-28 lg:w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Numbers */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Bedrooms" value={property.propertyDetails.bedrooms} />
        <Stat label="Bathrooms" value={property.propertyDetails.bathroom} />
        <Stat label="Size (sqm)" value={property.propertyDetails.size} />
        <Stat label="Enquiries" value={propertyEnquiries.length} />
        <Stat label="Photos" value={images.length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="mb-3 text-[18px] font-bold text-[#023337] dark:text-gray-100">Description</h2>
            <p className="whitespace-pre-line text-[15px] leading-7 text-gray-700 dark:text-gray-300">{property.propertyDescription || 'No description.'}</p>
          </section>

          {property.amenities.length > 0 && (
            <section className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm">
              <h2 className="mb-3 text-[18px] font-bold text-[#023337] dark:text-gray-100">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map(a => <Badge key={a} tone="gray">{a}</Badge>)}
              </div>
            </section>
          )}

          <section className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#023337] dark:text-gray-100">Enquiries for this property</h2>
              <Link to="/adminPage/enquiries" className="text-[14px] text-[#1A3C34] dark:text-[#8fd3c0] underline">All enquiries</Link>
            </div>
            {propertyEnquiries.length === 0 ? (
              <p className="text-[14px] text-gray-500 dark:text-gray-400">No enquiries yet.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
                {propertyEnquiries.map(e => (
                  <li key={e._id} className="py-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-[#023337] dark:text-gray-100">{e.name}</p>
                      <Badge tone={e.status === 'new' ? 'orange' : 'green'}>{e.status === 'new' ? 'New' : 'Responded'}</Badge>
                    </div>
                    <a href={`mailto:${e.email}`} className="text-[13px] text-[#4F887B] hover:underline">{e.email}</a>
                    <p className="mt-1 text-[14px] text-gray-600 dark:text-gray-300">{e.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <section className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="mb-3 text-[18px] font-bold text-[#023337] dark:text-gray-100">Agent</h2>
            <p className="font-semibold text-[#023337] dark:text-gray-100">{property.agentName}</p>
            <a href={`tel:${property.agentPhone}`} className="text-[14px] text-[#4F887B] hover:underline">{property.agentPhone}</a>
          </section>
          <section className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm text-[14px] text-gray-600 dark:text-gray-300 flex flex-col gap-2">
            <h2 className="mb-1 text-[18px] font-bold text-[#023337] dark:text-gray-100">Details</h2>
            {property.discount && <p>Discount: <span className="font-semibold">{property.discount}</span></p>}
            {created && <p>Listed on: <span className="font-semibold">{created}</span></p>}
            <p>Coordinates: <span className="font-semibold">{property.coordinates.latitude}, {property.coordinates.longitude}</span></p>
          </section>
        </aside>
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 p-8 text-center shadow-2xl animate-fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-red-500" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" /></svg>
            </div>
            <h2 id="delete-title" className="text-[18px] font-bold text-[#023337] dark:text-gray-100">Delete this property?</h2>
            <p className="mt-2 text-[14px] text-gray-600 dark:text-gray-300">"{property.propertyName}" will be removed for good. This cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setConfirmDelete(false)} disabled={isDeleting} className="flex-1 rounded-[10px] border border-gray-300 dark:border-gray-600 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
              <button onClick={handleDelete} disabled={isDeleting} className="flex-1 rounded-[10px] bg-red-500 py-3 font-bold text-white hover:bg-red-600 disabled:opacity-60">{isDeleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPropertyDetail
