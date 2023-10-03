/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";

const initialForm = {
  name: "",
  category: "",
  price: 0,
  quantity: undefined,
};

const PosModalForm = ({ open, handleClose, editProduct }) => {
  const [form, setForm] = useState(initialForm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editProduct.price !== undefined) {
      setForm(editProduct);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "/api/v1/sales";
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
      const { data } = await res.json();
      if (res.ok) {
        dispatch(addToCart(data));
        setForm(initialForm);
        handleClose(true);
      }
    } catch (err) {
      console.log(err?.error?.message || err?.error);
    }
  };

  const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{
              display: "flex",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              disabled
              value={form.name}
              size="small"
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleChange}
              sx={{
                marginLeft: "10px",
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
            />
            <TextField
              disabled
              size="small"
              value={form.category}
              label="Category"
              name="category"
              variant="outlined"
              onChange={handleChange}
              sx={{
                marginLeft: "10px",
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
            />
            <TextField
              disabled
              type="number"
              value={form.price}
              size="small"
              label="Price"
              name="price"
              variant="outlined"
              onChange={handleChange}
              sx={{
                marginLeft: "10px",
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
            />
            <TextField
              type="number"
              value={form.quantity}
              size="small"
              label="Quantity"
              name="quantity"
              variant="outlined"
              onChange={handleChange}
              sx={{
                marginLeft: "10px",
              }}
            />

            <Button type="submit" sx={{ marginLeft: 2 }} variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default PosModalForm;
