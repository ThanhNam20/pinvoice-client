export interface IProduct {
  id: string;
  productName: string;
  productQuantity: number;
  productUnit: string;
  productPrice: string;
}

export interface ProductDto {
  productName: string;
  productQuantity: number;
  productUnit: string;
  productPrice: string;
}