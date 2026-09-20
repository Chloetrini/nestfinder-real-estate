import { PropertyForm } from '@/components/admin/property-form'
import { useSeo } from '@/hooks/use-seo'

const AddProperty = () => {
  useSeo({ title: 'Add property', noindex: true })
  return <PropertyForm />
}

export default AddProperty
