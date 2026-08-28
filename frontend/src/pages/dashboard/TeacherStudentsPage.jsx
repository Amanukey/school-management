import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Pagination,
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

const TeacherStudentsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pages: 1 });

  const load = async (nextPage = page, nextSearch = search) => {
    const res = await api.get("/teacher/students", {
      params: { page: nextPage, limit: 8, search: nextSearch },
    });
    setData(res.data.data);
    setPagination(res.data.pagination);
  };

  useEffect(() => {
    load(1, "");
  }, []);

  return (
    <Card>
      <CardContent>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6">Students List</Typography>
          <TextField
            size="small"
            placeholder="Search by class/section/admission"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                load(1, search);
              }
            }}
          />
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admission</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.user?.name}</TableCell>
                <TableCell>{s.user?.email}</TableCell>
                <TableCell>{s.admissionNo}</TableCell>
                <TableCell>{s.className}</TableCell>
                <TableCell>{s.section}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack alignItems="flex-end" sx={{ mt: 2 }}>
          <Pagination
            page={page}
            count={pagination.pages || 1}
            onChange={(_e, value) => {
              setPage(value);
              load(value, search);
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TeacherStudentsPage;
