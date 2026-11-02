export interface DeliveryEstimate {
  orderDateFormatted: string;
  minDateFormatted: string;
  maxDateFormatted: string;
  rangeFormatted: string;
  shortRange: string;
  daysLabel: string;
}

export function getDeliveryEstimate(orderDate: Date = new Date()): DeliveryEstimate {
  const minDelivery = new Date(orderDate);
  minDelivery.setDate(minDelivery.getDate() + 5);

  const maxDelivery = new Date(orderDate);
  maxDelivery.setDate(maxDelivery.getDate() + 10);

  const formatFull = (d: Date) =>
    d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const formatShort = (d: Date) =>
    d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return {
    orderDateFormatted: formatFull(orderDate),
    minDateFormatted: formatFull(minDelivery),
    maxDateFormatted: formatFull(maxDelivery),
    rangeFormatted: `${formatFull(minDelivery)} – ${formatFull(maxDelivery)}`,
    shortRange: `${formatShort(minDelivery)} – ${formatShort(maxDelivery)}`,
    daysLabel: '5 to 10 days',
  };
}

