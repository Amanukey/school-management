import { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import api from "../../api/client";

const AdminTestimonialsPage = () => {
  const [items, setItems] = useState([]);

  const load = async () => {
    const { data } = await api.get("/admin/testimonials");
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleApprove = async (id, approved) => {
    await api.patch(`/admin/testimonials/${id}`, { approved: !approved });
    load();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>Manage Testimonials</Typography>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} md={6} key={item._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    "{item.content}"
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.name} • {item.role}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography>{item.approved ? "Approved" : "Pending"}</Typography>
                    <Button variant="contained" onClick={() => toggleApprove(item._id, item.approved)}>
                      {item.approved ? "Unapprove" : "Approve"}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AdminTestimonialsPage;
