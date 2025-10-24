export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateCustomerRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
}
