import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import api from "../../api/client";

const HomePage = () => {
  const [home, setHome] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [homeRes, testimonialRes] = await Promise.all([
        api.get("/public/home"),
        api.get("/public/testimonials"),
      ]);
      setHome(homeRes.data);
      setTestimonials(testimonialRes.data.slice(0, 3));
    };

    load();
  }, []);

  return (
    <Stack spacing={4}>
      <Box className="hero-banner">
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
          {home?.schoolName || "Atish Central Residential School"}
        </Typography>
        <Typography variant="h6">{home?.heroTagline || "Empowering every learner"}</Typography>
      </Box>

      <Grid container spacing={2}>
        {["Academics", "Residential Care", "Sports", "Arts"].map((item) => (
          <Grid item xs={12} md={3} key={item}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {item}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Holistic development through structured programs and modern facilities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          What Parents and Students Say
        </Typography>
        <Grid container spacing={2}>
          {testimonials.map((item) => (
            <Grid item xs={12} md={4} key={item._id}>
              <Card>
                <CardContent>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    "{item.content}"
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.name} • {item.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default HomePage;
