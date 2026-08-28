import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../api/client";

const TeacherMarksPage = () => {
  const [form, setForm] = useState({ studentId: "", subject: "", examType: "", score: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);

  const selectedStudent = useMemo(
    () => students.find((s) => s._id === form.studentId) || null,
    [students, form.studentId]
  );

  const load = async (studentId = "") => {
    const [studentsRes, marksRes] = await Promise.all([
      api.get("/teacher/students", { params: { page: 1, limit: 200 } }),
      api.get("/teacher/marks", { params: { studentId: studentId || undefined } }),
    ]);

    setStudents(studentsRes.data.data);
    setMarks(marksRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      await api.post("/teacher/marks", { ...form, score: Number(form.score) });
      setMsg("Student marks saved successfully.");
      await load(form.studentId);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Unable to update marks");
    }
  };

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Post Specific Marks For Student
          </Typography>
          {msg && <Alert severity="success">{msg}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={2} component="form" onSubmit={submit} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Select Student"
                value={form.studentId}
                required
                onChange={(e) => {
                  const nextStudentId = e.target.value;
                  setForm((p) => ({ ...p, studentId: nextStudentId }));
                  load(nextStudentId);
                }}
              >
                {students.map((student) => (
                  <MenuItem key={student._id} value={student._id}>
                    {student.user?.name} ({student.admissionNo}) - Class {student.className}-{student.section}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Subject" value={form.subject} required onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Exam Type"
                value={form.examType}
                required
                onChange={(e) => setForm((p) => ({ ...p, examType: e.target.value }))}
              >
                {["Unit Test", "Half Yearly", "Annual", "Practical"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="number" label="Score (0-100)" value={form.score} required onChange={(e) => setForm((p) => ({ ...p, score: e.target.value }))} />
            </Grid>
            {selectedStudent && (
              <Grid item xs={12}>
                <Alert severity="info">
                  Posting marks for {selectedStudent.user?.name} ({selectedStudent.admissionNo})
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <Button type="submit" variant="contained">Save Marks</Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {form.studentId ? "Marks Posted For Selected Student" : "All Marks Posted By You"}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Exam</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marks.map((mark) => (
                <TableRow key={mark._id}>
                  <TableCell>{mark.student?.user?.name || "N/A"}</TableCell>
                  <TableCell>{mark.subject}</TableCell>
                  <TableCell>{mark.examType}</TableCell>
                  <TableCell>{mark.score}</TableCell>
                  <TableCell>{new Date(mark.updatedAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!marks.length && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              No marks found.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TeacherMarksPage;
