import { IProduct } from './Product';
export interface Invoice {
  listProducts: IProduct[];
  customerName: string;
  customerAddress: string;
  customerPhoneNumber: string;
  customerTextCode: string;
  paymentMethod: string;
  customerAccountNumber: string;
  userId: string;
  totalPayment: string;
  id: string;
  indexNumber?: number;
  invoiceNumber?: string;
  createdDate: string;
  releaseDate?: string;
  isRelease: boolean;
  releaseStatus?: string;
  customerEmail?: string;
}