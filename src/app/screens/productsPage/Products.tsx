import React from "react";
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

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebeb", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

export default function Products() {
  const viewCount = 20;
  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Box className="top-text">
              <Box className="category-title">Burak Restaraunt</Box>
              <Box className="search-area">
                <Box className="placeholder">Type here</Box>
                <Box className="btn-box">
                  <Button className="txt">
                    SEARCH <SearchIcon className="icon" />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Stack>

          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <div className="category-name">
                <Button variant="contained" color="primary" className="order">
                  New
                </Button>
                <Button variant="contained" color="secondary" className="order">
                  Price
                </Button>
                <Button variant="contained" color="secondary" className="order">
                  Views
                </Button>
              </div>
            </Stack>
          </Stack>

          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className="category-main">
                <Button variant="contained" color="secondary">
                  Other
                </Button>
                <Button variant="contained" color="secondary">
                  Dessert
                </Button>
                <Button variant="contained" color="secondary">
                  Drink
                </Button>
                <Button variant="contained" color="secondary">
                  Salad
                </Button>
                <Button variant="contained" color="primary">
                  Dish
                </Button>
              </div>
            </Stack>
          </Stack>
          <Stack className="product-wrapper">
            {products.length !== 0 ? (
              products.map((products, index) => {
                return (
                  <Stack key={index} className="product-card">
                    <Stack
                      className="product-img"
                      sx={{ background: `url(${products.imagePath}) ` }}
                    >
                      <div className="product-sale">Normal size </div>
                      <Button className="shop-btn">
                        <img
                          alt=""
                          src={"/icons/shopping-cart.svg"}
                          style={{ display: "flex" }}
                        />
                      </Button>
                      <Button className="view-btn" sx={{ right: "36px" }}>
                        <Badge badgeContent={viewCount} color="secondary">
                          <RemoveRedEyeIcon
                            sx={{ color: viewCount > 0 ? "gray" : "white" }}
                          />
                        </Badge>
                      </Button>
                    </Stack>
                    <Box className="product-desc">
                      <span className="product-title">
                        {products.productName}
                      </span>
                      <div className="product-desc">
                        <MonetizationOnIcon />
                        {12}
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

        <Stack className="pagination-section" spacing={2}>
          <Pagination
            count={10}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container className="family-brands">
          <Box className="category-title">Our Family Brands</Box>
          <Stack className="brand-list">
            <Box className="review-box">
              <img alt="" src="/img/gurme.webp" />
            </Box>
            <Box className="review-box">
              <img alt="" src="/img/seafood.webp" />
            </Box>
            <Box className="review-box">
              <img alt="" src="/img/sweets.webp" />
            </Box>
            <Box className="review-box">
              <img alt="" src="/img/doner.webp" />
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
