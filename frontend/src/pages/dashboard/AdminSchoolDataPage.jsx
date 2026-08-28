import { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import api from "../../api/client";

const AdminSchoolDataPage = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ type: "course", name: "" });

  const load = async () => {
    const { data } = await api.get("/admin/school-data");
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/admin/school-data", form);
    setForm({ type: "course", name: "" });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/admin/school-data/${id}`);
    load();
  };

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Manage Courses, Classes, Sections</Typography>
          <Grid container spacing={2} component="form" onSubmit={submit}>
            <Grid item xs={12} md={3}>
              <TextField select fullWidth label="Type" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
                {["course", "class", "section"].map((x) => (<MenuItem key={x} value={x}>{x}</MenuItem>))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Name" value={form.name} required onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></Grid>
            <Grid item xs={12} md={3}><Button fullWidth type="submit" variant="contained" sx={{ height: "100%" }}>Add</Button></Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Existing Items</Typography>
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} md={4} key={item._id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography sx={{ textTransform: "capitalize" }}>{item.type}</Typography>
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>{item.name}</Typography>
                    <Button color="error" onClick={() => remove(item._id)}>Delete</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AdminSchoolDataPage;
