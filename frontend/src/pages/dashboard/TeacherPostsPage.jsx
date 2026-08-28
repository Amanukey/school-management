import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../api/client";

const TeacherPostsPage = () => {
  const [students, setStudents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    category: "academic",
    title: "",
    content: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const studentOptions = useMemo(
    () => students.map((s) => ({ id: s._id, label: `${s.user?.name || "Student"} (${s.admissionNo})` })),
    [students]
  );

  const load = async () => {
    const [studentsRes, postsRes] = await Promise.all([
      api.get("/teacher/students", { params: { page: 1, limit: 200 } }),
      api.get("/teacher/posts"),
    ]);

    setStudents(studentsRes.data.data);
    setPosts(postsRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/teacher/posts", form);
      setMessage("Post created and assigned successfully.");
      setForm({ studentId: "", category: "academic", title: "", content: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Failed to create post");
    }
  };

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Post Academic / Sports Update to Student
          </Typography>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={submit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Student"
                  value={form.studentId}
                  required
                  onChange={(e) => setForm((p) => ({ ...p, studentId: e.target.value }))}
                >
                  {studentOptions.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  value={form.category}
                  required
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                >
                  <MenuItem value="academic">Academic</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Post Title"
                  value={form.title}
                  required
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Post Content"
                  value={form.content}
                  required
                  onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Publish to Student
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Recently Published Posts
          </Typography>
          <Stack spacing={2}>
            {posts.map((post) => (
              <Card key={post._id} variant="outlined">
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {post.title}
                    </Typography>
                    <Chip
                      label={post.category === "academic" ? "Academic" : "Sports"}
                      color={post.category === "academic" ? "primary" : "success"}
                      size="small"
                    />
                  </Stack>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {post.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Student: {post.student?.user?.name || "N/A"} | Posted on {new Date(post.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            {!posts.length && (
              <Typography variant="body2" color="text.secondary">
                No posts yet.
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TeacherPostsPage;
