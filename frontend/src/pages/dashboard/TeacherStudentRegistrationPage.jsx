import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from "@mui/material";
import api from "../../api/client";

const TeacherStudentRegistrationPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    admissionNo: "",
    className: "",
    section: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const { data } = await api.post("/auth/register", form);
      setSuccess(data.message || "Student registered successfully");
      setForm({
        name: "",
        email: "",
        password: "",
        admissionNo: "",
        className: "",
        section: "",
      });
    } catch (err) {
      const apiMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Student registration failed";
      setError(apiMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Card sx={{ width: "100%", maxWidth: 780 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Student Registration
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Teachers can create student accounts from the dashboard.
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Name" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Email" type="email" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Password" type="password" required value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Admission No" required value={form.admissionNo} onChange={(e) => setForm((p) => ({ ...p, admissionNo: e.target.value }))} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Class" required value={form.className} onChange={(e) => setForm((p) => ({ ...p, className: e.target.value }))} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Section" required value={form.section} onChange={(e) => setForm((p) => ({ ...p, section: e.target.value }))} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" disabled={submitting}>
                  {submitting ? "Creating..." : "Register Student"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TeacherStudentRegistrationPage;
