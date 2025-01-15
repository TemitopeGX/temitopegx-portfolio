export interface Product {
  _id: string;
  id?: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  details?: {
    features?: string[];
    specifications?: {
      [key: string]: string;
    };
  };
  purchaseOption: "SELAR_ONLY" | "SELAR_GUMROAD" | "ALL_OPTIONS";
  selarLink?: string;
  gumroadLink?: string;
}
