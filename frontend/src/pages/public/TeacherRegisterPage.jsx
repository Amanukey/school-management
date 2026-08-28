import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Alert, Button, Card, CardContent, Grid, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const TeacherRegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: "",
    subjectSpecialization: "",
    classTeacherOf: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { teacherRegister } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await teacherRegister(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Teacher registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Card sx={{ width: "100%", maxWidth: 720 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Teacher Registration
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={2} component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
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
              <TextField fullWidth label="Employee ID" required value={form.employeeId} onChange={(e) => setForm((p) => ({ ...p, employeeId: e.target.value }))} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Subject Specialization" required value={form.subjectSpecialization} onChange={(e) => setForm((p) => ({ ...p, subjectSpecialization: e.target.value }))} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Class Teacher Of (optional)" value={form.classTeacherOf} onChange={(e) => setForm((p) => ({ ...p, classTeacherOf: e.target.value }))} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone (optional)" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Creating..." : "Create Teacher Account"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Already a teacher? <RouterLink to="/teacher-login">Go to teacher login</RouterLink>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TeacherRegisterPage;
