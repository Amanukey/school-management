import { useEffect, useMemo, useState } from "react";
import { Button, Card, CardContent, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [view, setView] = useState("summary");
  const [selectedMetric, setSelectedMetric] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (user?.role === "admin") {
        const { data } = await api.get("/admin/overview");
        setOverview(data);
        return;
      }

      if (user?.role === "teacher") {
        const [studentsRes, marksRes, postsRes] = await Promise.all([
          api.get("/teacher/students", { params: { page: 1, limit: 1 } }),
          api.get("/teacher/marks"),
          api.get("/teacher/posts"),
        ]);

        setOverview({
          students: studentsRes.data.pagination.total,
          marks: marksRes.data.length,
          posts: postsRes.data.length,
        });
        return;
      }

      if (user?.role === "student") {
        const [marksRes, attendanceRes, postsRes] = await Promise.all([
          api.get("/student/marks"),
          api.get("/student/attendance"),
          api.get("/student/posts"),
        ]);

        const presentCount = attendanceRes.data.filter((item) => item.status === "present").length;
        const attendanceRate = attendanceRes.data.length
          ? Math.round((presentCount / attendanceRes.data.length) * 100)
          : 0;

        setOverview({
          marks: marksRes.data.length,
          attendance: attendanceRes.data.length,
          posts: postsRes.data.length,
          attendanceRate,
        });
      }
    };
    load();
  }, [user?.role]);

  const cards = useMemo(() => {
    if (!overview) {
      return [];
    }

    if (user?.role === "admin") {
      return [
        { label: "Users", value: Number(overview.users || 0), action: "/dashboard/admin/users" },
        { label: "Students", value: Number(overview.students || 0), action: "/dashboard/admin/users" },
        { label: "Teachers", value: Number(overview.teachers || 0), action: "/dashboard/admin/users" },
        { label: "Marks Entries", value: Number(overview.marks || 0), action: "/dashboard/admin/users" },
      ];
    }

    if (user?.role === "teacher") {
      return [
        { label: "My Students", value: Number(overview.students || 0), action: "/dashboard/teacher/students" },
        { label: "Marks Posted", value: Number(overview.marks || 0), action: "/dashboard/teacher/marks" },
        { label: "Posts Published", value: Number(overview.posts || 0), action: "/dashboard/teacher/posts" },
      ];
    }

    return [
      { label: "My Marks", value: Number(overview.marks || 0), action: "/dashboard/student/marks" },
      { label: "Attendance Entries", value: Number(overview.attendance || 0), action: "/dashboard/student/attendance" },
      { label: "Teacher Posts", value: Number(overview.posts || 0), action: "/dashboard/student/posts" },
      { label: "Attendance Rate %", value: Number(overview.attendanceRate || 0), action: "/dashboard/student/attendance" },
    ];
  }, [overview, user?.role]);

  useEffect(() => {
    if (cards.length && !selectedMetric) {
      setSelectedMetric(cards[0].label);
    }
  }, [cards, selectedMetric]);

  const chartData = cards.map((item) => ({ label: item.label, value: Number(item.value) || 0 }));
  const selectedData = chartData.find((item) => item.label === selectedMetric);

  const pieColors = ["#2563eb", "#0891b2", "#16a34a", "#ea580c", "#a855f7"];

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Interactive Overview
        </Typography>
        <Tabs
          value={view}
          onChange={(_e, value) => setView(value)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="summary" label="Summary" />
          <Tab value="chart" label="Charts" />
        </Tabs>
      </Stack>

      <Grid container spacing={2}>
        {cards.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card
              onClick={() => setSelectedMetric(item.label)}
              sx={{
                cursor: "pointer",
                border: selectedMetric === item.label ? "2px solid #2563eb" : "1px solid #e2e8f0",
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                  {item.value}
                </Typography>
                <Button size="small" onClick={() => navigate(item.action)}>
                  Open
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {view === "summary" && selectedData && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Selected Metric
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
              {selectedData.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedData.label}
            </Typography>
          </CardContent>
        </Card>
      )}

      {view === "chart" && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Metric Bar Chart
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="label" outerRadius={90}>
                      {chartData.map((entry, index) => (
                        <Cell key={entry.label} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default DashboardHome;
