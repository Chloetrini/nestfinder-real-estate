// Payment maths for the property calculator (kept separate so it is easy to test)

/** Monthly repayment of a loan: the standard annuity formula. A 0% rate is just price / months. */
export const monthlyLoanPayment = (loan: number, annualRatePercent: number, years: number): number => {
  const months = Math.round(years * 12)
  if (loan <= 0 || months <= 0) return 0
  const r = annualRatePercent / 100 / 12
  if (r === 0) return loan / months
  return (loan * r) / (1 - Math.pow(1 + r, -months))
}

export const naira = (n: number): string => `₦${Math.round(n).toLocaleString('en-NG')}`
