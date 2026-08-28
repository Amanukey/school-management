import { useEffect, useState } from "react";
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import api from "../../api/client";

const StudentAttendancePage = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/student/attendance");
      setAttendance(data);
    };

    load();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          My Attendance
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Updated By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((a) => (
              <TableRow key={a._id}>
                <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                <TableCell>{a.status}</TableCell>
                <TableCell>{a.teacher?.user?.name || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StudentAttendancePage;
