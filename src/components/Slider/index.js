import { Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Slider({
  handlePreviousClick,
  handleNextClick,
  startIndex,
  images,
  endIndex,
  handleDragStart,
  handleDragEnd,
  handleProductTypeChange,
}) {
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "40px 100px",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        sx={{ width: "30px", height: "50px" }}
        onClick={handlePreviousClick}
        disabled={startIndex === 0}
      >
        <ArrowBackIcon />
      </Button>

      {images &&
        images.slice(startIndex, endIndex).map((item) => (
          <Grid style={{ gap: "2rem" }}>
            <img
              onDragStart={handleDragStart}
              onDragEnd={() => handleDragEnd(item)}
              src={item.imageUrl}
              style={{
                width: "100px",
                height: "100px",
              }}
              onClick={() => handleProductTypeChange(item)}
              alt={item}
            />
          </Grid>
        ))}

      <Button
        variant="contained"
        sx={{ width: "30px", height: "50px" }}
        onClick={handleNextClick}
        disabled={endIndex >= images?.length}
      >
        <ArrowForwardIcon />
      </Button>
    </Grid>
  );
}

export default Slider;
