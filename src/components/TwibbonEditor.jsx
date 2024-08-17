import React, { useRef, useState, useEffect } from "react";
import { Button, Container, Box, Text, Grid, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Image, SimpleGrid, Card, CardBody } from "@chakra-ui/react";
import { FaCamera, FaDownload } from "react-icons/fa";
import logo from "../assets/logo.png"; // Ubah path jika diperlukan

const TwibbonEditor = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [twibbon, setTwibbon] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [imageScale, setImageScale] = useState(1);
  const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });

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
      const parent = canvasRef.current.parentNode;
      const width = parent.clientWidth;
      const height = width;
      setCanvasSize({ width, height });
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    const img = new window.Image(); // Use window.Image to ensure global context
    img.src = imgURL;
    img.onload = () => {
      const scale = canvasSize.width / img.width;
      const scaledHeight = img.height * scale;

      setOriginalImageSize({ width: canvasSize.width, height: scaledHeight });
      setImage(img);
      setPosition({
        x: 0,
        y: (canvasSize.height - scaledHeight) / 2,
      });
    };
  };

  const handleTwibbonUpload = (e) => {
    const file = e.target.files[0];
    const twibURL = URL.createObjectURL(file);
    const twib = new window.Image(); // Use window.Image to ensure global context
    twib.src = twibURL;
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
      e.preventDefault(); // Make sure to prevent default only if touch is dragging
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

    const scaleFactor = 3;
    downloadCanvas.width = canvasSize.width * scaleFactor;
    downloadCanvas.height = canvasSize.height * scaleFactor;

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

    const link = document.createElement("a");
    link.href = downloadCanvas.toDataURL("image/png");
    link.download = "twibbon.png";
    link.click();
  };

  const handleImageScaleChange = (value) => {
    setImageScale(value);
  };

  return (
    <Container maxW="container.md" mt={2} height="calc(100vh - 8rem)">
      <Card m={2} boxShadow="md">
        <CardBody>
          <Box>
            <SimpleGrid columns={1} mb={4}>
              <Text as="h1" fontSize="2xl" textAlign="center" color="gray.700">
                <Image src={logo} alt="Logo" boxSize={20} display="inline-block" mr={2} />
              </Text>
            </SimpleGrid>
            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={2} justifyContent="center" mb={2}>
              <Button variant="solid" colorScheme="teal" size="md" as="label">
                Upload Twibbon
                <input type="file" accept="image/*" onChange={handleTwibbonUpload} hidden />
              </Button>
              <Button variant="solid" colorScheme="blue" size="md" as="label" leftIcon={<FaCamera />}>
                Upload Foto
                <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
              </Button>
            </Grid>

            <Box mt={4} border="1px solid #ccc" width={window.width} height={window.height} position="relative" margin="0 auto" sx={{ touchAction: "none" }}>
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
              <Box mt={4}>
                <Text mb={2} color="teal.600">
                  Atur Ukuran Foto
                </Text>
                <Slider value={imageScale} onChange={handleImageScaleChange} min={0.1} max={2} step={0.1} aria-label="image-scale-slider">
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
            )}
            <Box mt={4} textAlign="center">
              <Button variant="solid" colorScheme="green" onClick={handleDownload} isLoading={!image} leftIcon={<FaDownload />}>
                Download
              </Button>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
};

export default TwibbonEditor;
