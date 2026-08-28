import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import api from "../../api/client";

const fallbackImages = [
  {
    _id: "default-campus",
    title: "ACRS Main Campus",
    imageUrl: "/school-gallery-campus.svg",
  },
  {
    _id: "default-library",
    title: "School Library",
    imageUrl: "/school-gallery-library.svg",
  },
  {
    _id: "default-sports",
    title: "Sports Day",
    imageUrl: "/school-gallery-sports.svg",
  },
];

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/public/gallery");
      setImages(data.length ? data : fallbackImages);
    };

    load();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        School Gallery
      </Typography>
      <Grid container spacing={2}>
        {images.map((img) => (
          <Grid item xs={12} sm={6} md={4} key={img._id}>
            <Card>
              <CardMedia component="img" height="200" image={img.imageUrl} alt={img.title} />
              <CardContent>
                <Typography>{img.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default GalleryPage;
