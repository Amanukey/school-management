import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Login failed");
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Card sx={{ width: "100%", maxWidth: 460 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Login to ACRS
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Stack component="form" spacing={2} onSubmit={onSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              required
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
            <Typography variant="body2">
              If you do not have an account, contact your class teacher.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoginPage;
