import { Card, CardContent, Stack, Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        About ACRS
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Atish Central Residential School is dedicated to academic excellence, values-driven education,
            and all-round growth in a secure residential environment. We blend classroom learning with
            sports, arts, leadership, and life skills to shape responsible future citizens.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AboutPage;
