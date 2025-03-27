import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Box,
  Paper,
  InputAdornment,
  Fade,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Phone,
  Cake,
  Home,
  LocationCity,
  LocalAtm,
  Payment,
} from "@mui/icons-material";

const schema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
  dateOfBirth: z
    .string()
    .nonempty("Date of Birth is required")
    .refine((dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return (
        age > 18 ||
        (age === 18 &&
          today >= new Date(birthDate.setFullYear(today.getFullYear())))
      );
    }, "Must be 18 years or older"),
  accountType: z.string().nonempty("Account Type is required"),
  initialDeposit: z.preprocess(
    (val) => Number(val),
    z.number().min(100, "Minimum deposit is $100")
  ),
  currency: z.string().nonempty("Currency is required"),
  streetAddress: z.string().nonempty("Street Address is required"),
  city: z.string().nonempty("City is required"),
  zipCode: z.string().regex(/^\d{5}$/, "Zip Code must be exactly 5 digits"),
  terms: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must accept the Terms & Conditions"
    ),
});

const App = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      accountType: "",
      currency: "",
      terms: false,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form Data:", data);
    setTimeout(() => {
      alert("Account successfully opened!");
      reset();
    }, 1000);
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        p: 2,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          right: "-50%",
          bottom: "-50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)",
          animation: "rotate 20s linear infinite",
          zIndex: 0,
        },
        "@keyframes rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={500}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 12px 40px rgba(31, 38, 135, 0.25)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                textAlign: "center",
                fontWeight: 700,
                color: "#2d3748",
                background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Open New Account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                {...register("fullName")}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: "#718096" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#a0aec0 !important",
                    },
                  },
                }}
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#718096" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                  },
                }}
              />

              {/* Phone Number */}
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: "#718096" }} />
                    </InputAdornment>
                  ),
                  inputProps: { maxLength: 10 },
                  sx: {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                  },
                }}
              />

              {/* Date of Birth */}
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: maxDateString }}
                {...register("dateOfBirth")}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake sx={{ color: "#718096" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                  },
                }}
              />

              {/* Account Type */}
              <FormControl
                fullWidth
                sx={{ mb: 2.5 }}
                error={!!errors.accountType}
              >
                <InputLabel>Account Type</InputLabel>
                <Controller
                  name="accountType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value || ""}
                      variant="outlined"
                      sx={{
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "#e2e8f0",
                        },
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Payment sx={{ color: "#718096", mr: 1 }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">Select Account Type</MenuItem>
                      <MenuItem value="Savings">Savings Account</MenuItem>
                      <MenuItem value="Checking">Checking Account</MenuItem>
                    </Select>
                  )}
                />
                {errors.accountType && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {errors.accountType.message}
                  </Typography>
                )}
              </FormControl>

              {/* Initial Deposit */}
              <TextField
                fullWidth
                type="number"
                label="Initial Deposit"
                variant="outlined"
                {...register("initialDeposit", { valueAsNumber: true })}
                error={!!errors.initialDeposit}
                helperText={errors.initialDeposit?.message}
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalAtm sx={{ color: "#718096" }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 100, step: "any" },
                  sx: {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                  },
                }}
              />

              {/* Currency */}
              <FormControl fullWidth sx={{ mb: 2.5 }} error={!!errors.currency}>
                <InputLabel>Currency</InputLabel>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value || ""}
                      variant="outlined"
                      sx={{
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "#e2e8f0",
                        },
                      }}
                    >
                      <MenuItem value="">Select Currency</MenuItem>
                      <MenuItem value="USD">USD ($)</MenuItem>
                      <MenuItem value="EUR">EUR (€)</MenuItem>
                      <MenuItem value="LKR">LKR (₨)</MenuItem>
                    </Select>
                  )}
                />
                {errors.currency && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {errors.currency.message}
                  </Typography>
                )}
              </FormControl>

              {/* Street Address */}
              <TextField
                fullWidth
                label="Street Address"
                variant="outlined"
                {...register("streetAddress")}
                error={!!errors.streetAddress}
                helperText={errors.streetAddress?.message}
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home sx={{ color: "#718096" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                  },
                }}
              />

              {/* City */}
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity sx={{ color: "#718096" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                  },
                }}
              />

              {/* Zip Code */}
              <TextField
                fullWidth
                label="Zip Code"
                variant="outlined"
                {...register("zipCode")}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
                sx={{ mb: 2.5 }}
                InputProps={{
                  inputProps: { maxLength: 5 },
                  sx: {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                  },
                }}
              />

              {/* Terms Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("terms")}
                    sx={{
                      color: "#4f46e5",
                      "&.Mui-checked": {
                        color: "#4f46e5",
                      },
                    }}
                  />
                }
                label="I agree to the Terms & Conditions"
                sx={{
                  mb: errors.terms ? 0 : 2.5,
                  "& .MuiTypography-root": {
                    fontSize: "0.875rem",
                    color: "#4a5568",
                  },
                }}
              />
              {errors.terms && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ display: "block", mb: 2.5 }}
                >
                  {errors.terms.message}
                </Typography>
              )}

              {/* Submit Button */}
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    width: "100%",
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: "12px",
                    background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                    boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #4338ca, #6d28d9)",
                      boxShadow: "0 6px 8px rgba(79, 70, 229, 0.3)",
                    },
                    "&:disabled": {
                      background: "#e2e8f0",
                      color: "#a0aec0",
                    },
                  }}
                >
                  {isSubmitting ? "Processing..." : "Open My Account"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default App;
