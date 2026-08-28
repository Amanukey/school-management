import { useEffect, useState } from "react";
import { Alert, Button, Card, CardContent, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import api from "../../api/client";

const TeacherAttendancePage = () => {
  const [form, setForm] = useState({ studentEmail: "", date: "", status: "present" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      const { data } = await api.get("/teacher/students", { params: { page: 1, limit: 200 } });
      setStudents(data.data);
    };

    loadStudents();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      await api.post("/teacher/attendance", form);
      setMsg("Attendance updated successfully using student email.");
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Unable to update attendance");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Update Attendance
        </Typography>
        {msg && <Alert severity="success">{msg}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2} component="form" onSubmit={submit} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Student (Email)"
              value={form.studentEmail}
              required
              onChange={(e) => setForm((p) => ({ ...p, studentEmail: e.target.value }))}
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student.user?.email || ""}>
                  {student.user?.name} - {student.user?.email}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth type="date" label="Date" InputLabelProps={{ shrink: true }} value={form.date} required onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Status"
              value={form.status}
              required
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
            >
              {[
                "present",
                "absent",
                "late",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <Button type="submit" variant="contained">Save</Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TeacherAttendancePage;
