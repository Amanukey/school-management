import { useMemo, useState } from "react";
import { Link as RouterLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 250;

const menuByRole = {
  student: [
    { label: "Overview", path: "/dashboard" },
    { label: "Marks", path: "/dashboard/student/marks" },
    { label: "Attendance", path: "/dashboard/student/attendance" },
    { label: "My Posts", path: "/dashboard/student/posts" },
    { label: "Profile", path: "/dashboard/student/profile" },
  ],
  teacher: [
    { label: "Overview", path: "/dashboard" },
    { label: "Students", path: "/dashboard/teacher/students" },
    { label: "Student Registration", path: "/dashboard/teacher/student-registration" },
    { label: "Update Marks", path: "/dashboard/teacher/marks" },
    { label: "Update Attendance", path: "/dashboard/teacher/attendance" },
    { label: "Student Posts", path: "/dashboard/teacher/posts" },
  ],
  admin: [
    { label: "Overview", path: "/dashboard" },
    { label: "Manage Users", path: "/dashboard/admin/users" },
    { label: "School Data", path: "/dashboard/admin/school-data" },
    { label: "Testimonials", path: "/dashboard/admin/testimonials" },
    { label: "Gallery", path: "/dashboard/admin/gallery" },
  ],
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menus = useMemo(() => menuByRole[user?.role] || [], [user?.role]);

  const drawerContent = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        ACRS Dashboard
      </Typography>
      <List>
        {menus.map((item) => (
          <ListItemButton
            key={item.path}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f6f7fb" }}>
      <AppBar position="fixed" sx={{ ml: { md: `${drawerWidth}px` }, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {user?.name}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
