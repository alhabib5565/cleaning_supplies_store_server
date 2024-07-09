import { TOrderStatus } from './order.interface';

export const ORDER_STATUS = {
  Pending: 'Pending',
  Rejected: 'Rejected',
  Accepted: 'Accepted',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
} as const;

export const ORDER_STATUS_TRANSITIONS: Record<TOrderStatus, TOrderStatus[]> = {
  Pending: ['Accepted', 'Rejected', 'Cancelled'],
  Accepted: ['Shipped', 'Cancelled'],
  Shipped: ['Delivered'],
  Delivered: [],
  Cancelled: [],
  Rejected: [],
};

/**
    Pending → Accepted
    Pending → Rejected
    Accepted → Shipped
    Shipped → Delivered
    Any → Cancelled
 */
