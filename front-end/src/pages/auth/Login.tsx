import { useState } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  TextField,
  Button,
  Link,
  Grid,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../../contexts/AuthContext";
import { AuthContainer } from "../../components/auth/AuthContainer";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <AuthContainer
      title="Sign in"
      subtitle="Enter your credentials to access your account"
    >
      {/* Lock Icon */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 56,
            height: 56,
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        autoComplete="on"
        sx={{
          "& .MuiTextField-root": {
            mb: 2, // 👈 prevents Chrome popup overlap
          },
        }}
      >
        {/* Email */}
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          name="username"
          autoComplete="username"
          spellCheck={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="current-password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{
            mt: 1,
            mb: 2,
            height: 48,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>

        {/* Register Link */}
        <Grid container justifyContent="center">
          <Link component={RouterLink} to="/register" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Box>
    </AuthContainer>
  );
};
