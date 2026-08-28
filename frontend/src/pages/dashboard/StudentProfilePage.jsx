import { useEffect, useState } from "react";
import { Avatar, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import api from "../../api/client";

const StudentProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/student/profile");
      setProfile(data);
    };

    load();
  }, []);

  const initials = (profile?.user?.name || "Student")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Stack spacing={2}>
      <Card
        sx={{
          borderRadius: 4,
          background: "linear-gradient(130deg, #0f766e 10%, #1d4ed8 60%, #1e293b)",
          color: "#fff",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {profile && (
            <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ xs: "flex-start", md: "center" }}>
              <Avatar sx={{ width: 82, height: 82, fontSize: 28, fontWeight: 700, bgcolor: "rgba(255,255,255,0.2)" }}>
                {initials}
              </Avatar>
              <Stack spacing={1}>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {profile.user?.name}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {profile.user?.email}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label={`Admission: ${profile.admissionNo}`} sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff" }} />
                  <Chip label={`Class ${profile.className} - ${profile.section}`} sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff" }} />
                </Stack>
              </Stack>
            </Stack>
          )}
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {[
          { label: "Role", value: "Student" },
          { label: "Class", value: `${profile?.className || "-"}` },
          { label: "Section", value: `${profile?.section || "-"}` },
          { label: "Admission No", value: `${profile?.admissionNo || "-"}` },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default StudentProfilePage;
