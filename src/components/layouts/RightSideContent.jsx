import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
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
import { useSelector, useDispatch } from "react-redux";
import RightSideModalForm from "./RightSideModalForm";
import { useEffect, useState } from "react";
import { clearCart, getTotal, removeFromCart } from "../../slices/cartSlice";

const RightSideContent = () => {
  const [editProduct, setEditProduct] = useState({});
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (item) => {
    let url = `/api/v1/sales/${item._id}`;
    let requestOptions = {
      method: "DELETE",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      if (res.ok) {
        dispatch(removeFromCart(item));
      }
    } catch (err) {
      console.log(err?.error?.message || err?.error);
    }
  };

  return (
    <Box
      flex={2}
      p={2}
      sx={{
        minHeight: "20vh",
        borderLeft: "1px solid rgba(0, 0, 0, .1)",
      }}
      component={Paper}
    >
      <TableContainer>
        <Table size="small" sx={{ minWidth: { lg: 500, xl: 600 } }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems &&
              cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.category}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    {item.quantity * item.price}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => {
                        setEditProduct({ ...item });
                        handleOpen();
                      }}
                    >
                      <EditSharpIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      component="label"
                      onClick={() => {
                        handleDelete(item);
                      }}
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RightSideModalForm
        open={open}
        handleClose={handleClose}
        editProduct={editProduct}
      />
      <Grid container justifyContent={"flex-start"}>
        <Grid
          item
          sx={{
            width: "100%",
            marginTop: 3,
          }}
        >
          <Typography variant="h5">SubTotal:</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={"flex-start"}>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h6" marginLeft={20}>
            ₱{cart.totalPrice}
          </Typography>
          {cart.totalPrice !== 0 && (
            <Button
              size="small"
              variant="contained"
              sx={{ marginRight: 2 }}
              onClick={() => dispatch(clearCart())}
            >
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default RightSideContent;
