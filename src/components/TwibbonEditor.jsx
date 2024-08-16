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
  const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 }); // Tambahkan state ini

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loadImage = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (image) {
        const scaledWidth = originalImageSize.width * imageScale;
        const scaledHeight = originalImageSize.height * imageScale;
        ctx.drawImage(image, position.x, position.y, scaledWidth, scaledHeight);
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
  }, [image, twibbon, position, imageScale, canvasSize, originalImageSize]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const parent = canvasRef.current.parentNode; // Mengambil parent dari canvas
      const width = parent.clientWidth; // Mengambil lebar dari parent
      const height = width; // Menyamakannya dengan lebar agar bentuknya tetap kotak
      setCanvasSize({ width, height });
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize(); // Inisialisasi ukuran canvas pertama kali

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const handleImageUpload = (e) => {
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      const scale = canvasSize.width / img.width; // Hitung skala berdasarkan lebar kanvas
      const scaledHeight = img.height * scale; // Sesuaikan tinggi berdasarkan skala

      setOriginalImageSize({ width: canvasSize.width, height: scaledHeight }); // Simpan ukuran gambar yang telah disesuaikan
      setImage(img);
      // Posisi default diatur ke tengah
      setPosition({
        x: 0, // X diatur ke 0 karena lebar gambar sudah disesuaikan dengan kanvas
        y: (canvasSize.height - scaledHeight) / 2, // Y diatur agar gambar berada di tengah vertikal
      });
    };
  };

  const handleTwibbonUpload = (e) => {
    const twib = new Image();
    twib.src = URL.createObjectURL(e.target.files[0]);
    twib.onload = () => {
      setTwibbon(twib);
    };
  };

  const handleMouseDown = (e) => {
    if (image) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (
        x >= position.x &&
        x <= position.x + originalImageSize.width * imageScale &&
        y >= position.y &&
        y <= position.y + originalImageSize.height * imageScale
      ) {
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
      setPosition({ x: x - (originalImageSize.width * imageScale) / 2, y: y - (originalImageSize.height * imageScale) / 2 });
    }
  };

  const handleTouchStart = (e) => {
    if (image) {
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      if (
        x >= position.x &&
        x <= position.x + originalImageSize.width * imageScale &&
        y >= position.y &&
        y <= position.y + originalImageSize.height * imageScale
      ) {
        setIsDragging(true);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      setPosition({ x: x - (originalImageSize.width * imageScale) / 2, y: y - (originalImageSize.height * imageScale) / 2 });
    }
  };

  const handleDownload = () => {
    const downloadCanvas = document.createElement("canvas");
    const downloadCtx = downloadCanvas.getContext("2d");

    // Set ukuran kanvas untuk unduhan, misalnya 2x dari ukuran normal
    const scaleFactor = 3;
    downloadCanvas.width = canvasSize.width * scaleFactor;
    downloadCanvas.height = canvasSize.height * scaleFactor;

    // Render gambar ke kanvas unduhan dengan ukuran yang lebih besar
    if (image) {
      downloadCtx.drawImage(
        image,
        position.x * scaleFactor,
        position.y * scaleFactor,
        originalImageSize.width * imageScale * scaleFactor,
        originalImageSize.height * imageScale * scaleFactor
      );
    }

    if (twibbon) {
      const twibbonWidth = downloadCanvas.width;
      const twibbonHeight = (twibbon.height / twibbon.width) * twibbonWidth;
      const x = (downloadCanvas.width - twibbonWidth) / 2;
      const y = (downloadCanvas.height - twibbonHeight) / 2;
      downloadCtx.drawImage(twibbon, x, y, twibbonWidth, twibbonHeight);
    }

    // Unduh gambar
    const link = document.createElement("a");
    link.href = downloadCanvas.toDataURL("image/png");
    link.download = "twibbon.png";
    link.click();
  };

  const handleImageScaleChange = (event, newValue) => {
    setImageScale(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box m={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
            <h1>Twibbon</h1>
          </Grid>
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
            width: window.width,
            height: window.width,
            position: "relative",
            margin: "0 auto",
            touchAction: "none",
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
        {image && (
          <Box mt={2} sx={{ width: "100%" }}>
            <Typography gutterBottom color="primary">
              Atur Ukuran Foto
            </Typography>
            <Slider
              value={imageScale}
              onChange={handleImageScaleChange}
              min={0.1}
              max={10}
              step={0.1}
              aria-labelledby="image-scale-slider"
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
            />
          </Box>
        )}
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleDownload} disabled={!image}>
            Download Image
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TwibbonEditor;
