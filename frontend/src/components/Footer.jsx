import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ py: 4, borderTop: "1px solid #e5e7eb", mt: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" color="text.secondary">
          Copyright {new Date().getFullYear()} Atish Central Residential School. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
