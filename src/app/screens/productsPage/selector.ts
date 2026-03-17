import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


const  selectProcutsPage = (state: AppRootState) => state.productsPage;

export const retrieveRestaurant = createSelector(
    selectProcutsPage,
    (ProductsPage) => ProductsPage.restaurant
);

export const retrieveChousenProduct = createSelector(
    selectProcutsPage,
    (ProductsPage) => ProductsPage.chosenProduct
);

export const retrieveProducts = createSelector(
    selectProcutsPage,
    (ProductsPage) => ProductsPage.products
);