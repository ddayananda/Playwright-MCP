export function parseCurrency(value: string): number {
  const amount = Number.parseFloat(value.replace(/[^\d.-]/g, ''));

  if (Number.isNaN(amount)) {
    throw new Error(`Unable to parse currency value: ${value}`);
  }

  return amount;
}

export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}