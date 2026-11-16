export type ProductType = {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: CategoryType;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;

};
// whislist
export interface WishlistResponse {
  status: string;
  count: number;
  data: ProductType[];
}


export type Subcategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};
export type CartItem = {
  count: number;
  price: number;
  product: ProductType;
  id:string
};

export type CartResponse = {
  data?: {
    products?: CartItem[];
    totalCartPrice?: number;
  };
};

// product in cart
export interface ProductItemType {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: {
      name: string;
    };
    // أي خصائص تانية خاصة بالمنتج لو موجودة في الـ API
  };
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: ProductItemType[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice?: number;
  // لو فيه خصائص تانية بتيجي في الـ root بتاع السلة زي totalCartPrice
}

export interface CartResponseType {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
