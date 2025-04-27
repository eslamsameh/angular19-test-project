import { BaseEntity, BaseState } from '.';

interface ReviewProps {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface MetaProps {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
export interface ProductItem extends BaseEntity {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ReviewProps[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: MetaProps;
  images: string[];
  thumbnail: string;
}

export interface ProductsState extends BaseState {
  products: ProductItem[] | null;
}
