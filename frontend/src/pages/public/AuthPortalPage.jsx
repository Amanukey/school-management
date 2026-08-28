import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

const RoleAuthSection = ({ roleTitle, subtitle, loginPath, registerPath, accent }) => {
  return (
    <Card sx={{ borderRadius: 3, borderTop: `6px solid ${accent}` }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {roleTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button component={RouterLink} to={loginPath} variant="contained" sx={{ flex: 1 }}>
              Login
            </Button>
            {registerPath && (
              <Button component={RouterLink} to={registerPath} variant="outlined" sx={{ flex: 1 }}>
                Register
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const AuthPortalPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
          Access ACRS Portal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose your role and continue with login. Student accounts are created by teachers.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <RoleAuthSection
            roleTitle="Student Section"
            subtitle="Students can log in to view marks, attendance, and profile." 
            loginPath="/login"
            accent="#2563eb"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RoleAuthSection
            roleTitle="Teacher Section"
            subtitle="Teachers can register and then log in to post marks, attendance, and student updates."
            loginPath="/teacher-login"
            registerPath="/teacher-register"
            accent="#0891b2"
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AuthPortalPage;
