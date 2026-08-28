import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Facilities", to: "/facilities" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
  { label: "Testimonials", to: "/testimonials" },
];

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="sticky" elevation={0} color="transparent" sx={{ backdropFilter: "blur(10px)", borderBottom: "1px solid #e5e7eb" }}>
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 800 }}>
          ACRS Management
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {navItems.map((item) => (
            <Button key={item.to} component={RouterLink} to={item.to} color="inherit" sx={{ color: "#0f172a" }}>
              {item.label}
            </Button>
          ))}
        </Stack>
        <Box>
          {!user ? (
            <Stack direction="row" spacing={1}>
              <Button component={RouterLink} to="/auth" variant="contained">
                Student / Teacher Access
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button component={RouterLink} to="/dashboard" variant="contained">
                Dashboard
              </Button>
              <Button
                onClick={logout}
                variant="outlined"
                color="error"
              >
                Logout
              </Button>
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
