export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  address?: string;
  city?: string;
  country?: string;
  website?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  address?: string;
  city?: string;
  country?: string;
  website?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface UpdateCustomerRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  address?: string;
  city?: string;
  country?: string;
  website?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'pending';
}
