import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { url } from "inspector";

import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector} from "react-redux";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { ProductionQuantityLimits } from "@mui/icons-material";
import { useHistory } from "react-router-dom";


const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

 useEffect(() => {
    const product = new ProductService();
    product.getProducts(productSearch)
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if(searchText === "") {
    productSearch.search = "";
    setProductSearch({ ... productSearch });
  }
}, [searchText]);

  /** HANDLERS */
  const searchCollectionHandler = (collection : ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  }

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  }

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch});
  }

  const  PaginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  }

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  }


  return (
    <div className="products">
          <Container>
          <Stack flexDirection={"column"} alignItems={"flex-end"}>
          <Stack className={"avatar-big-box"}>
            <p className={"top-text"}>Burak Restaurant</p>
          </Stack>
          <Stack className={"single-search-big-box"}>
            <input
            type={"search"}
            className={"single-search-input"}
            name={"singleResearch"}
            placeholder={"Type here"}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if(e.key  === "Enter") searchProductHandler();
            }}
            />
          <Button
              className={"single-button-search"}
              variant="contained"
              endIcon={<SearchIcon />}
              onClick= {searchProductHandler}
          >
              Search
          </Button>
          </Stack>

          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <div className="category-name">
                <Button
                  variant="contained"
                  className="order"
                  color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                  onClick={() => searchOrderHandler("createdAt")}
                >
                  New
                </Button>

                <Button
                  variant="contained"
                  className="order"
                  color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                  onClick={() => searchOrderHandler("productPrice")}
                >
                  Price
                </Button>

                <Button
                  variant="contained"
                  className="order"
                  color={productSearch.order === "productViews" ? "primary" : "secondary"}
                  onClick={() => searchOrderHandler("productViews")}
                >
                  Views
                </Button>
              </div>
            </Stack>
          </Stack>

          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className="category-main">
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                >
                  Other
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.DESERT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchCollectionHandler(ProductCollection.DESERT)}
                >
                  Dessert
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
                >
                  Drink
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
                >
                  Salad
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                >
                  Dish
                </Button>
              </div>
            </Stack>
          </Stack>

          <Stack className="product-wrapper">
            {products.length !== 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume =
                  product.productCollection === ProductCollection.DRINK
                    ? product.productVolume + " litre"
                    : product.productSize + " size";

                return (
                  <Stack
                    key={product._id}
                    className="product-card"
                    onClick={() => chooseDishHandler(product._id)}
                  >
                    <Stack
                      className="product-img"
                      sx={{ background: `url(${imagePath})` }}
                    >
                      <div className="product-sale">{sizeVolume}</div>

                      <Button className="shop-btn">
                        <img
                          src={"/icons/shopping-cart.svg"}
                          style={{ display: "flex" }}
                          alt="shopping-cart"
                        />
                      </Button>

                      <Button className="view-btn" sx={{ right: "36px" }}>
                        <Badge badgeContent={product.productViews} color="secondary">
                          <RemoveRedEyeIcon
                            sx={{
                              color: product.productViews === 0 ? "gray" : "white",
                            }}
                          />
                        </Badge>
                      </Button>
                    </Stack>

                    <Box className="product-desc">
                      <span className="product-title">{product.productName}</span>
                      <div className="product-desc">
                        <MonetizationOnIcon />
                        {product.productPrice}
                      </div>
                    </Box>
                  </Stack>
                );
              })
            ) : (
              <Box className="no-data">Products are not Available!</Box>
            )}
          </Stack>
        </Stack>

        <Stack className={"pagination-section"}>
          <Pagination
            count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
            page={productSearch.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
                color={"secondary"}
              />
            )}
            onChange={PaginationHandler}
          />
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container className="family-brands">
          <Box className="category-title">Our Family Brands</Box>
          <Stack className="brand-list">
            <Box className="review-box">
              <img src="/img/gurme.webp" alt="gurme" />
            </Box>
            <Box className="review-box">
              <img src="/img/seafood.webp" alt="seafood" />
            </Box>
            <Box className="review-box">
              <img src="/img/sweets.webp" alt="sweets" />
            </Box>
            <Box className="review-box">
              <img src="/img/doner.webp" alt="doner" />
            </Box>
          </Stack>
        </Container>
      </div>

     <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              className="map-frame"
              src="https://www.google.com/maps?q=CZN+Burak+Taksim+Istanbul&output=embed"
              title="CZN Burak Istanbul Location"
            />
          </Stack>
        </Container>
      </div>
    </div>
  );
}