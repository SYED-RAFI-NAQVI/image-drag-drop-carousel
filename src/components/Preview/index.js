import { Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Slider from "../Slider";

const Preview = () => {
  const [productTypeId, setProductTypeId] = useState("200000");
  const [currentImage, setCurrentImage] = useState("");
  const [images, setImages] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const carouselContainer = useRef(null);
  const [draggedImage, setDraggedImage] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        "https://d221a61rb87vel.cloudfront.net/v1/api/allProductTypes"
      );
      const data = await response.json();
      const filteredImageObj = data.prodTypeList.filter(
        (item) => item.productTypeId === window.location.href.split("=").at(-1)
      );

      const filteredImages = data.prodTypeList.filter(
        (item) => item.productTypeId && item.imageUrl
      );

      setImages(filteredImages);
      setCurrentImage(filteredImageObj[0].imageUrl);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlProductTypeId = urlParams.get("productTypeId");
    if (urlProductTypeId) {
      setProductTypeId(urlProductTypeId);
    } else {
      window.history.pushState(null, null, `?productTypeId=${productTypeId}`);
    }
  }, [productTypeId]);

  const handlePreviousClick = () => {
    setStartIndex((prev) => prev - 1);
    setEndIndex((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setStartIndex((prev) => prev + 1);
    setEndIndex((prev) => prev + 1);
  };

  const handleProductTypeChange = (imageObj) => {
    const newProductTypeId = imageObj.productTypeId;
    setProductTypeId(newProductTypeId);
    setCurrentImage(imageObj.imageUrl);

    window.history.pushState(null, null, `?productTypeId=${newProductTypeId}`);
  };

  const handleDragStart = (event) => {
    setDraggedImage(event.target.src);
  };

  const handleDragEnd = (item) => {
    setDraggedImage("");
    window.history.pushState(
      null,
      null,
      `?productTypeId=${item.productTypeId}`
    );
    setProductTypeId(item.productTypeId);
    setCurrentImage(item.imageUrl);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const previewImage = new Image();
    previewImage.src = draggedImage;
    carouselContainer.current.appendChild(previewImage);
  };

  return (
    <Grid sx={{ display: "grid", margin: "20px" }}>
      <img
        ref={carouselContainer}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        src={currentImage}
        alt={currentImage}
        style={{
          height: "600px",
          width: "1000px",
          objectFit: "contain",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <Slider
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
        startIndex={startIndex}
        images={images}
        endIndex={endIndex}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleProductTypeChange={handleProductTypeChange}
      />
    </Grid>
  );
};

export default Preview;
