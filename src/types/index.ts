export interface IListing {
  _id?: string;
  title?: string;
  description?: string;
  address?:string
  price?: string;
  purpose?: "For Rent" | "For Sale";
  furnished?: boolean;
  parking?: boolean;
  bedrooms?: number;
  bathrooms?: number;
  images?: {
    public_id: string;
    secure_url: string;
    _id: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
