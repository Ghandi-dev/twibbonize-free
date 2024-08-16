import React, { useRef, useState, useEffect } from "react";
import { Button, Container, Box, Typography, Grid, Slider } from "@mui/material";

const TwibbonEditor = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [twibbon, setTwibbon] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [imageScale, setImageScale] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loadImage = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (image) {
        ctx.drawImage(image, position.x, position.y, canvas.width * imageScale, canvas.height * imageScale);
      }
      if (twibbon) {
        const twibbonWidth = canvasSize.width;
        const twibbonHeight = (twibbon.height / twibbon.width) * twibbonWidth;
        const x = (canvasSize.width - twibbonWidth) / 2;
        const y = (canvasSize.height - twibbonHeight) / 2;
        ctx.drawImage(twibbon, x, y, twibbonWidth, twibbonHeight);
      }
    };

    loadImage();
  }, [image, twibbon, position, imageScale, canvasSize]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const width = window.innerWidth > 600 ? 500 : window.innerWidth - 40;
      const height = width;
      setCanvasSize({ width, height });
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const handleImageUpload = (e) => {
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => setImage(img);
  };

  const handleTwibbonUpload = (e) => {
    const twib = new Image();
    twib.src = URL.createObjectURL(e.target.files[0]);
    twib.onload = () => {
      // Fit twibbon to canvas
      const twibbonWidth = canvasSize.width;
      const twibbonHeight = (twib.height / twib.width) * twibbonWidth;
      setPosition({ x: (canvasSize.width - twibbonWidth) / 2, y: (canvasSize.height - twibbonHeight) / 2 });
      setTwibbon(twib);
    };
  };

  const handleMouseDown = (e) => {
    if (image) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= position.x && x <= position.x + image.width && y >= position.y && y <= position.y + image.height) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x: x - image.width / 2, y: y - image.height / 2 });
    }
  };

  const handleTouchStart = (e) => {
    if (image) {
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      if (x >= position.x && x <= position.x + image.width && y >= position.y && y <= position.y + image.height) {
        setIsDragging(true);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      setPosition({ x: x - image.width / 2, y: y - image.height / 2 });
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "twibbon.png";
    link.click();
  };

  const handleImageScaleChange = (event, newValue) => {
    setImageScale(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
              Upload Twibbon
              <input type="file" accept="image/*" onChange={handleTwibbonUpload} hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
              Upload Foto
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </Button>
          </Grid>
        </Grid>

        <Box
          mt={2}
          sx={{
            border: "1px solid #ccc",
            width: canvasSize.width,
            height: canvasSize.height,
            position: "relative",
            margin: "0 auto",
          }}
        >
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            style={{ display: "block", width: "100%", height: "100%" }}
          />
        </Box>
        {twibbon && (
          <Box mt={2} sx={{ width: "100%" }}>
            <Typography gutterBottom color="primary">
              Atur Ukuran Foto
            </Typography>
            <Slider
              value={imageScale}
              onChange={handleImageScaleChange}
              min={0.1}
              max={2}
              step={0.1}
              aria-labelledby="image-scale-slider"
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
            />
          </Box>
        )}
        <Box mt={2} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            disabled={!image} // Tombol disable jika gambar belum diunggah
          >
            Download Image
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TwibbonEditor;
