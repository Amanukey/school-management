import { Grid, Paper, Stack, Typography } from "@mui/material";

const facilities = [
  "Smart classrooms and digital boards",
  "Science and computer laboratories",
  "Library and reading halls",
  "Sports grounds and indoor stadium",
  "Secure hostel and dining",
  "Medical and counseling support",
];

const FacilitiesPage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Facilities
      </Typography>
      <Grid container spacing={2}>
        {facilities.map((facility) => (
          <Grid item xs={12} md={6} key={facility}>
            <Paper sx={{ p: 3 }}>
              <Typography>{facility}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default FacilitiesPage;
