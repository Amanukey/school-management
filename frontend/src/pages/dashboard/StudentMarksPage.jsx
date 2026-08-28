import { useEffect, useState } from "react";
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import api from "../../api/client";

const StudentMarksPage = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/student/marks");
      setMarks(data);
    };

    load();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          My Marks
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Exam</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marks.map((m) => (
              <TableRow key={m._id}>
                <TableCell>{m.subject}</TableCell>
                <TableCell>{m.examType}</TableCell>
                <TableCell>{m.score}</TableCell>
                <TableCell>{m.teacher?.user?.name || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StudentMarksPage;
