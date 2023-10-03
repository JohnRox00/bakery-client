import { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { Box, Button, Grid, Stack, styled } from "@mui/material";
import PosModalForm from "../components/layouts/PosModalForm";
import Sidebar from "../components/layouts/Sidebar";
import RightSideContent from "../components/layouts/RightSideContent";
import Navbar from "../components/layouts/Navbar";

const Pos = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let url = "/api/v1/products";
    let requestOptions = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      const { data } = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err?.error.message || err?.message);
    }
  };

  const Item = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    height: "100px",
    width: "150px",
    color: "red",
    margin: 5,
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  }));

  return (
    <>
      <Navbar />
      <Layout title={"POS - Bakery Management App"}>
        <Stack direction={"row"} spacing={2}>
          <Sidebar />
          <Box flex={4} p={2}>
            <Grid container>
              {products.map((product) => (
                <Grid item xs={6} lg={4} xl={2} key={product._id}>
                  <Item
                    onClick={() => {
                      setEditProduct({ ...product });
                      handleOpen();
                    }}
                  >
                    {product.name}
                  </Item>
                </Grid>
              ))}
            </Grid>
            <PosModalForm
              open={open}
              handleClose={handleClose}
              editProduct={editProduct}
            />
          </Box>
          <RightSideContent />
        </Stack>
      </Layout>
    </>
  );
};

export default Pos;
