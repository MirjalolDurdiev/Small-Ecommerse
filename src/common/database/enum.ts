enum Roles {
  ADMIN = 'admin', //Can view all users
  USER = 'user', //Users can use get, update, delete
}

enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export { OrderStatus, Roles };
