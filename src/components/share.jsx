import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import mergeImages from "merge-images";
import Logo from "../../public/static/Fastor Logo.png";

export default function ShareImg() {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    console.log(state);
    // if(state && state.url) {
    // mergeImages();
    // }
  }, [state]);

  const mergeImages = async () => {
    // const response = await fetch(state.url);
    // const blob = await response.blob();
    // const file = new File([blob], 'image.jpg', { type: blob.type });
    // const image = await Promise.resolve(urlToObject(state.url));
    const src = await mergeImages([state.url, Logo]);
    console.log(src);
  };

  const urlToObject = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    return file;
  };

  async function testWebShare(url) {
    let files;
    // Test compatibility
    if (navigator.share === undefined) {
      console.log("Error");
      return;
    }

    // Handle file urls

    const filesGetter = [urlToObject(url)];
    const newFiles = await Promise.all(filesGetter);

    if (!navigator.canShare || !navigator.canShare({ files: newFiles })) {
      console.log("Error");
      return;
    }

    files = newFiles;

    // Share content
    try {
      await navigator.share({ files });
    } catch (error) {
      console.log("Error");
    }
  }

  return (
    <div>
      {state ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <img
            src={state.url}
            style={{
              height: "auto",
              width: "50%",
              margin: "10px",
              position: "relative"
            }}
          />

          <img
            class="top"
            src={Logo}
            style={{
              height: "auto",
              width: "10%",
              margin: "10px",
              position: "absolute",
              zIndex: 1,
              top: "20vh"
            }}
          />
          <Button onClick={() => testWebShare(state.url)} variant="outlined">
            Share
          </Button>
        </Box>
      ) : null}
    </div>
  );
}
