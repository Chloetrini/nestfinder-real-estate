import { useMemo, useState } from 'react'
import { monthlyLoanPayment, naira } from '@/lib/payments'
import type { Property } from '@/types/property'

// "What will this cost me each month?" for a property page:
// a mortgage estimate for homes for sale, a rent breakdown for homes for rent.

const Field = ({ label, suffix, value, onChange, min, max, step = 1 }: { label: string; suffix: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number }) => (
  <label className="flex flex-col gap-2">
    <span className="flex justify-between text-[14px] font-bold text-[#676565] dark:text-gray-300">
      {label}
      <span className="font-normal text-[#1A3C34] dark:text-[#8fd3c0]">{value}{suffix}</span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="h-2 w-full cursor-pointer accent-[#1A3C34] dark:accent-[#8fd3c0]"
    />
  </label>
)

const Row = ({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) => (
  <div className={`flex justify-between gap-4 ${strong ? 'text-[18px] font-bold text-[#1A3C34] dark:text-[#8fd3c0]' : 'text-[14px] text-gray-600 dark:text-gray-300'}`}>
    <span>{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
)

const PaymentCalculator = ({ property }: { property: Pick<Property, 'price' | 'sale'> }) => {
  const isRent = property.sale === 'For Rent'

  // Mortgage inputs
  const [depositPercent, setDepositPercent] = useState(20)
  const [years, setYears] = useState(15)
  const [rate, setRate] = useState(18) // adjustable: lender rates vary a lot

  // Rent inputs
  const [months, setMonths] = useState(12)
  const [feesPercent, setFeesPercent] = useState(10)

  const mortgage = useMemo(() => {
    const deposit = (property.price * depositPercent) / 100
    const loan = property.price - deposit
    const monthly = monthlyLoanPayment(loan, rate, years)
    return { deposit, loan, monthly, total: monthly * years * 12, interest: monthly * years * 12 - loan }
  }, [property.price, depositPercent, years, rate])

  const rent = useMemo(() => {
    const fees = (property.price * feesPercent) / 100
    return { fees, upfront: property.price + fees, monthly: property.price / months }
  }, [property.price, feesPercent, months])

  return (
    <section className="rounded-[10px] border border-[#918F8F] dark:border-gray-600 bg-white dark:bg-gray-900 p-5 md:p-6 font-[Manrope]" aria-label={isRent ? 'Rent calculator' : 'Mortgage calculator'}>
      <h2 className="mb-1 text-[18px] font-bold text-[#023337] dark:text-gray-100">{isRent ? 'Rent breakdown' : 'Mortgage calculator'}</h2>
      <p className="mb-5 text-[13px] text-gray-500 dark:text-gray-400">An estimate to help you plan. Your lender or agent gives the final figures.</p>

      {isRent ? (
        <div className="flex flex-col gap-5">
          <Field label="Rent covers" suffix=" months" value={months} onChange={setMonths} min={1} max={24} />
          <Field label="Agent and legal fees" suffix="%" value={feesPercent} onChange={setFeesPercent} min={0} max={30} />
          <div className="flex flex-col gap-2 rounded-xl bg-[#F3F4F6] dark:bg-gray-800 p-4">
            <Row label="Rent" value={naira(property.price)} />
            <Row label={`Fees (${feesPercent}%)`} value={naira(rent.fees)} />
            <Row label="Pay upfront" value={naira(rent.upfront)} />
            <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
            <Row label="Rent per month" value={naira(rent.monthly)} strong />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <Field label="Deposit" suffix="%" value={depositPercent} onChange={setDepositPercent} min={0} max={90} step={5} />
          <Field label="Repayment period" suffix=" years" value={years} onChange={setYears} min={1} max={30} />
          <Field label="Interest rate (yearly)" suffix="%" value={rate} onChange={setRate} min={0} max={40} step={0.5} />
          <div className="flex flex-col gap-2 rounded-xl bg-[#F3F4F6] dark:bg-gray-800 p-4">
            <Row label="Deposit to pay" value={naira(mortgage.deposit)} />
            <Row label="Amount borrowed" value={naira(mortgage.loan)} />
            <Row label="Total interest" value={naira(mortgage.interest)} />
            <Row label="Total repaid" value={naira(mortgage.total)} />
            <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
            <Row label="Per month" value={naira(mortgage.monthly)} strong />
          </div>
        </div>
      )}
    </section>
  )
}

export default PaymentCalculator
