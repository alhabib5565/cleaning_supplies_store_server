export const ORDER_STATUS = {
  Pending: 'Pending',
  Rejected: 'Rejected',
  Accepted: 'Accepted',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
} as const;

/**
    Pending → Accepted
    Pending → Rejected
    Accepted → Shipped
    Shipped → Delivered
    Any → Cancelled
 */
