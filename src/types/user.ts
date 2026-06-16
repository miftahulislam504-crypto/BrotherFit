export interface UserAddress {
  id: string;
  label: string;
  name: string;
  phone: string;
  district: string;
  upazila: string;
  area: string;
  address: string;
  isDefault: boolean;
}

export interface User {
  uid: string;
  name: string;
  email?: string;
  phone?: string;
  photoURL?: string;
  addresses: UserAddress[];
  createdAt: Date;
}
