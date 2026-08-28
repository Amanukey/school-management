import { useEffect, useState } from "react";
import { Alert, Button, Card, CardContent, Grid, Stack, TextField, Typography } from "@mui/material";
import api from "../../api/client";

const AdminGalleryPage = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    const { data } = await api.get("/public/gallery");
    setImages(data);
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    await api.post("/public/gallery", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setMessage("Image uploaded");
    setTitle("");
    setFile(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/admin/gallery/${id}`);
    load();
  };

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Upload Gallery Image</Typography>
          {message && <Alert severity="success">{message}</Alert>}
          <Stack component="form" direction={{ xs: "column", md: "row" }} spacing={2} onSubmit={upload} sx={{ mt: 1 }}>
            <TextField label="Image Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
            <Button variant="outlined" component="label">
              Choose Image
              <input hidden type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </Button>
            <Button type="submit" variant="contained">Upload</Button>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {images.map((img) => (
          <Grid item xs={12} md={4} key={img._id}>
            <Card>
              <img src={img.imageUrl} alt={img.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>{img.title}</Typography>
                  <Button color="error" onClick={() => remove(img._id)}>Delete</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default AdminGalleryPage;
