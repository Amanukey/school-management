import { useState } from "react";
import { Alert, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Contact Us
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Email: info@acrs.edu.in | Phone: +91-90000-12345
          </Typography>
          {submitted && <Alert severity="success">Thank you. Your message has been submitted.</Alert>}
          <Stack component="form" spacing={2} onSubmit={onSubmit} sx={{ mt: 2 }}>
            <TextField name="name" label="Name" value={form.name} onChange={onChange} fullWidth required />
            <TextField name="email" label="Email" type="email" value={form.email} onChange={onChange} fullWidth required />
            <TextField
              name="message"
              label="Message"
              value={form.message}
              onChange={onChange}
              multiline
              minRows={4}
              fullWidth
              required
            />
            <Button type="submit" variant="contained">
              Send Message
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ContactPage;
