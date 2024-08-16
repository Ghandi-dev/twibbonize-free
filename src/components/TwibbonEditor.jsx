import React, { useRef, useState, useEffect } from "react";
import { Button, Container, Box, Typography, Grid, Slider } from "@mui/material";

const TwibbonEditor = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [twibbon, setTwibbon] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [twibbonScale, setTwibbonScale] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loadImage = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (twibbon) {
        ctx.drawImage(twibbon, position.x, position.y, twibbon.width * twibbonScale, twibbon.height * twibbonScale);
      }
      if (image) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    };

    loadImage();
  }, [image, twibbon, position, twibbonScale]);

  useEffect(() => {
    // Resize canvas based on screen size
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
    twib.onload = () => setTwibbon(twib);
  };

  const handleMouseDown = (e) => {
    if (twibbon) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= position.x && x <= position.x + twibbon.width * twibbonScale && y >= position.y && y <= position.y + twibbon.height * twibbonScale) {
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
      setPosition({ x: x - (twibbon.width * twibbonScale) / 2, y: y - (twibbon.height * twibbonScale) / 2 });
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "twibbon.png";
    link.click();
  };

  const handleTwibbonScaleChange = (event, newValue) => {
    setTwibbonScale(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
              Upload Twibbon
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
              Upload Foto
              <input type="file" accept="image/*" onChange={handleTwibbonUpload} hidden />
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
            style={{ display: "block", width: "100%", height: "100%" }}
          />
        </Box>
        {twibbon && (
          <Box mt={2} sx={{ width: "100%" }}>
            <Typography gutterBottom color="primary">
              Atur Ukuran Foto
            </Typography>
            <Slider
              value={twibbonScale}
              onChange={handleTwibbonScaleChange}
              min={0.1}
              max={2}
              step={0.1}
              aria-labelledby="twibbon-scale-slider"
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
