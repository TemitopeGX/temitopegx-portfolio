export interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  description: string;
  details?: {
    features: string[];
    specifications: { [key: string]: string };
  };
  features?: string[];
  specifications?: { [key: string]: string };
  purchaseOption?: "SELAR_ONLY" | "SELAR_GUMROAD" | "ALL_OPTIONS";
  selarLink?: string;
  gumroadLink?: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}
