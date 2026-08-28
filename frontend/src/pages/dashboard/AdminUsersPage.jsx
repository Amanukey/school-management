import { useEffect, useState } from "react";
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

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "student",
  admissionNo: "",
  className: "",
  section: "",
  employeeId: "",
  subjectSpecialization: "",
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "student" });

  const load = async () => {
    const { data } = await api.get("/admin/users", { params: { limit: 100 } });
    setUsers(data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/admin/users", form);
    setMessage("User added successfully");
    setForm(initialForm);
    load();
  };

  const removeUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    load();
  };

  const startEdit = (user) => {
    setEditingId(user._id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const saveEdit = async () => {
    await api.put(`/admin/users/${editingId}`, editForm);
    setEditingId(null);
    load();
  };

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add User
          </Typography>
          {message && <Alert severity="success">{message}</Alert>}
          <Grid container spacing={2} component="form" onSubmit={submit} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}><TextField fullWidth label="Name" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Email" required type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Password" required type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} /></Grid>
            <Grid item xs={12} md={4}>
              <TextField select fullWidth label="Role" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
                {["student", "teacher", "admin"].map((role) => (
                  <MenuItem key={role} value={role}>{role}</MenuItem>
                ))}
              </TextField>
            </Grid>
            {form.role === "student" && (
              <>
                <Grid item xs={12} md={4}><TextField fullWidth label="Admission No" required value={form.admissionNo} onChange={(e) => setForm((p) => ({ ...p, admissionNo: e.target.value }))} /></Grid>
                <Grid item xs={12} md={2}><TextField fullWidth label="Class" required value={form.className} onChange={(e) => setForm((p) => ({ ...p, className: e.target.value }))} /></Grid>
                <Grid item xs={12} md={2}><TextField fullWidth label="Section" required value={form.section} onChange={(e) => setForm((p) => ({ ...p, section: e.target.value }))} /></Grid>
              </>
            )}
            {form.role === "teacher" && (
              <>
                <Grid item xs={12} md={4}><TextField fullWidth label="Employee ID" required value={form.employeeId} onChange={(e) => setForm((p) => ({ ...p, employeeId: e.target.value }))} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="Specialization" required value={form.subjectSpecialization} onChange={(e) => setForm((p) => ({ ...p, subjectSpecialization: e.target.value }))} /></Grid>
              </>
            )}
            <Grid item xs={12}><Button type="submit" variant="contained">Create User</Button></Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>All Users</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Role</TableCell><TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>
                    {editingId === u._id ? (
                      <TextField
                        size="small"
                        value={editForm.name}
                        onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                      />
                    ) : (
                      u.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === u._id ? (
                      <TextField
                        size="small"
                        value={editForm.email}
                        onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
                      />
                    ) : (
                      u.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === u._id ? (
                      <TextField
                        size="small"
                        select
                        value={editForm.role}
                        onChange={(e) => setEditForm((p) => ({ ...p, role: e.target.value }))}
                      >
                        {["student", "teacher", "admin"].map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      u.role
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === u._id ? (
                      <Stack direction="row" spacing={1}>
                        <Button onClick={saveEdit}>Save</Button>
                        <Button onClick={() => setEditingId(null)}>Cancel</Button>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={1}>
                        <Button onClick={() => startEdit(u)}>Edit</Button>
                        <Button color="error" onClick={() => removeUser(u._id)}>Delete</Button>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AdminUsersPage;
