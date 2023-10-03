/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../../slices/cartSlice";

const initialForm = {
  name: "",
  category: "",
  price: 0,
  quantity: undefined,
};

const RightSideModalForm = ({ editProduct, handleClose, open }) => {
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
    let url = `/api/v1/sales/${editProduct._id}`;
    let requestOptions = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    };
    try {
      const res = await fetch(url, requestOptions);
      const { message } = await res.json();
      console.log(message);
      if (res.ok) {
        handleClose(true);
        dispatch(updateCart({ ...form }));
      }
    } catch (err) {
      console.log(err?.error?.message || err?.error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
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
              value={form.quantity}
              type="number"
              size="small"
              label="Quantity"
              name="quantity"
              variant="outlined"
              onChange={handleChange}
              sx={{
                marginLeft: "10px",
              }}
            />
            <Button
              type="submit"
              sx={{ marginLeft: 2 }}
              variant="contained"
              color="success"
            >
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default RightSideModalForm;
