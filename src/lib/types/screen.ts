import ProductsPage from "../../app/screens/productsPage";
import { Member } from "./member";
import { Product } from "./product";

/** React App State */
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  // productsPage: ProductsPageState;
}

/** HomePage*/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** ProductaPage */
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** OrdersPage */
