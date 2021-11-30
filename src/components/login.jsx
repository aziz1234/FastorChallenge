import * as React from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate, Route } from "react-router-dom";
import axios from "axios";

import setAuthToken from "../utils/setAuthToken";

const theme = createTheme();

export default function LogIn() {
  let navigate = useNavigate();
  const [IsNoValid, setNoValidity] = React.useState(false);
  const [phoneNo, setPhoneNo] = React.useState("");

  // useEffect(() => {
  //   if(sessionStorage.getItem("token"))
  //     navigate("/home")
  // },[])

  const handleSubmit = (event) => {
    // const navigate = useNavigate();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let phoneNo = data.get("phoneNo");
    axios
      .post("https://staging.fastor.in/v1/pwa/user/register", {
        phone: phoneNo,
        dial_code: "+91"
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          setPhoneNo(phoneNo);
          setNoValidity(true);
          // return <Navigate to = "/otp" />
          // return <Route path ="*" element ={<Navigate to ="/otp" replace/>} />
        } else window.alert("Invalid Credentials");
      });
  };

  const handleSubmitOTP = (event) => {
    // const navigate = useNavigate();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let otp = data.get("otp");
    axios
      .post("https://staging.fastor.in/v1/pwa/user/login", {
        phone: phoneNo,
        dial_code: "+91",
        otp: otp
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          // sessionStorage.setItem("token", res.data.data.token);
          setAuthToken(res.data.data.token);
          navigate("/home");
          // return <Navigate to = "/otp" />
          // return <Route path ="*" element ={<Navigate to ="/otp" replace/>} />
        } else window.alert("Invalid OTP");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {!IsNoValid ? (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone No"
                  name="phoneNo"
                  autoComplete="phone"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </>
          ) : null}
          {IsNoValid ? (
            <Box
              component="form"
              onSubmit={handleSubmitOTP}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          ) : null}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
