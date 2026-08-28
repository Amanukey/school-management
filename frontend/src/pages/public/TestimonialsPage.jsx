import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../api/client";

const TestimonialsPage = () => {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ name: "", role: "", content: "" });

  const load = async () => {
    const { data } = await api.get("/public/testimonials");
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/public/testimonials", form);
    setMsg("Thank you. Your testimonial is submitted for approval.");
    setForm({ name: "", role: "", content: "" });
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Testimonials
      </Typography>

      <Grid container spacing={2}>
        {list.map((item) => (
          <Grid item xs={12} md={4} key={item._id}>
            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  "{item.content}"
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.name} • {item.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Share Your Experience
          </Typography>
          {msg && <Alert severity="success">{msg}</Alert>}
          <Stack component="form" spacing={2} onSubmit={submit}>
            <TextField label="Your Name" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            <TextField label="Role (Parent/Student/Alumni)" required value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} />
            <TextField
              label="Testimonial"
              required
              multiline
              minRows={4}
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TestimonialsPage;
