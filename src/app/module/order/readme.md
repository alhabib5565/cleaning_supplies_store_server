Order Status and Transition Logic

## Order Statuses

- **Pending**: The order has been created but not yet reviewed.
- **Accepted**: The order has been reviewed and accepted.
- **Shipped**: The order has been shipped to the customer.
- **Delivered**: The order has been delivered to the customer.
- **Cancelled**: The order has been cancelled.
- **Rejected**: The order has been rejected.

## Status Transitions

| Current Status | Possible Next Statuses        |
| -------------- | ----------------------------- |
| Pending        | Accepted, Rejected, Cancelled |
| Accepted       | Shipped, Cancelled            |
| Shipped        | Delivered, Cancelled          |
| Delivered      | No further changes allowed    |
| Cancelled      | No further changes allowed    |
| Rejected       | No further changes allowed    |
