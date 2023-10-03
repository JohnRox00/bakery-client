import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import ProductForm from "../components/layouts/ProductForm";

import { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import Sidebar from "../components/layouts/Sidebar";
import Navbar from "../components/layouts/Navbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});

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
      console.log(err.error.message || err.message);
    }
  };

  const handleDelete = async (_id) => {
    let url = `/api/v1/products/${_id}`;
    let requestOptions = {
      method: "DELETE",
      credentials: "include",
    };
    try {
      if (!window.confirm("Are you sure ??")) return;
      const res = await fetch(url, requestOptions);
      const { message } = await res.json();
      if (res.ok) {
        window.alert(message);
        fetchProducts();
      }
    } catch (err) {
      console.log(err.error.message || err);
    }
  };
  return (
    <>
      <Navbar />
      <Layout title={"Products - Bakery Management App"}>
        <Stack direction={"flex"} spacing={2}>
          <Sidebar />
          <Box flex={4} p={2}>
            <ProductForm
              fetchProducts={fetchProducts}
              editProduct={editProduct}
            />
            <Typography sx={{ mt: 3 }} variant="h6">
              List of Products
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow
                      key={product._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{product.name}</TableCell>
                      <TableCell align="center">
                        {product.category ? product.category : "N/A"}
                      </TableCell>
                      <TableCell align="center">{product.price}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          component="label"
                          onClick={() => setEditProduct(product)}
                        >
                          <EditSharpIcon />
                        </IconButton>
                        <IconButton
                          color="warning"
                          component="label"
                          onClick={() => handleDelete(product._id)}
                        >
                          <DeleteSharpIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default Products;
