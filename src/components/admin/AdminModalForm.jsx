/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";

const initialForm = {
  branch_name: "",
  address: "",
  email: "",
  password: "",
};

const AdminModalForm = ({ open, handleClose, editUser }) => {
  const [form, setForm] = useState(initialForm);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (editUser !== undefined) {
      setForm(editUser);
    }
  }, [editUser]);

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== confirmPassword) {
      window.alert("Your Password Not Match");
    } else {
      try {
        let url = `/api/v1/users/${editUser._id}`;
        let requestOptions = {
          method: "PUT",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(form),
        };
        const res = await fetch(url, requestOptions);
        const { data } = await res.json();
        if (res.ok) {
          handleClose(true);
          console.log(data);
        }
      } catch (err) {
        console.log(err?.error?.message || err?.error);
      }
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Layout title={"Register - Bakery Management App"}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={style}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.branch_name}
                      name="branch_name"
                      required
                      fullWidth
                      label="Branch Name"
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.address}
                      required
                      fullWidth
                      label="Address"
                      name="address"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={form.email}
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="passwordPassword"
                      label="Confirm Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Container>
        </Modal>
      </Layout>
    </>
  );
};

export default AdminModalForm;
