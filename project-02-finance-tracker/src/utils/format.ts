const currencyFmt = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const currencyDecimalFmt = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

const currencyCompactFmt = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  maximumFractionDigits: 0,
})

export const fmt = (n: number) => currencyFmt.format(n)
export const fmtDecimal = (n: number) => currencyDecimalFmt.format(n)
export const fmtCompact = (n: number) => currencyCompactFmt.format(n)
