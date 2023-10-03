/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  category: "",
  price: 0,
};

const ProductForm = ({ fetchProducts, editProduct }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editProduct.price !== undefined) {
      setForm(editProduct);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    editProduct.price !== undefined ? update() : create();
  };

  const create = async () => {
    let url = "/api/v1/products";
    let requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    };
    try {
      const res = await fetch(url, requestOptions);
      const { message } = await res.json();
      if (res.ok) {
        setForm(initialForm);
        fetchProducts();
        console.log(message);
      }
    } catch (err) {
      console.log(err.error.message || err);
    }
  };

  const update = async () => {
    let url = `/api/v1/products/${editProduct._id}`;
    let requestOptions = {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    };
    try {
      const res = await fetch(url, requestOptions);

      if (res.ok) {
        location.reload();
      }
    } catch (err) {
      console.log(err?.error?.message || err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Card sx={{ minWidth: 275, marginTop: 5 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Add New Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            value={form.name}
            size="small"
            label="Name"
            name="name"
            variant="outlined"
            onChange={handleChange}
            sx={{
              marginLeft: "10px",
            }}
          />
          <TextField
            select
            value={form.category}
            size="small"
            label="Category"
            name="category"
            variant="outlined"
            onChange={handleChange}
            sx={{
              marginLeft: "10px",
              minWidth: {
                sm: 90,
                lg: 120,
                xl: 220,
              },
            }}
          >
            <MenuItem value="bread">Bread</MenuItem>
            <MenuItem value="softdrinks">Softdrinks</MenuItem>
          </TextField>
          <TextField
            type="number"
            value={form.price}
            size="small"
            label="Price"
            name="price"
            variant="outlined"
            onChange={handleChange}
            sx={{
              marginLeft: "10px",
            }}
          />
          {editProduct.price !== undefined && (
            <Button
              type="submit"
              sx={{ marginLeft: 1 }}
              variant="contained"
              color="success"
            >
              Update
            </Button>
          )}
          {editProduct.price === undefined && (
            <Button type="submit" sx={{ marginLeft: 1 }} variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
