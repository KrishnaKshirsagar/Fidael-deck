// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Avatar, Box, Typography, Button } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import * as Yup from "yup";

// import { useAuth } from "../../contexts/AuthContext";
// import { AuthContainer } from "../../components/auth/AuthContainer";
// import { DynamicForm, type Field } from "../../components/forms/DynamicForm";
// import {
//   useSendOtpMutation,
//   useVerifyOtpMutation,
// } from "../../store/features/api/authApi";
// import { useSnackbar } from "../../contexts/SnackbarContext";

// export const Login = () => {
//   // const [error, setError] = useState("");
//   // const [success, setSuccess] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [resendTimer, setResendTimer] = useState(0);
//   const [email, setEmail] = useState("");

//   const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
//   const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
//   const { showMessage } = useSnackbar();

//   const isLoading = isSendingOtp || isVerifyingOtp;

//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/dashboard";

//   // ⏱ Resend OTP countdown
//   useEffect(() => {
//     if (resendTimer <= 0) return;

//     const interval = setInterval(() => {
//       setResendTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [resendTimer]);

//   // 🧩 Dynamic fields
//   const fields: Field[] = [
//     {
//       name: "email",
//       label: "Email Address",
//       type: "email",
//       autoComplete: "username",
//       disabled: otpSent,
//     },
//     ...(otpSent
//       ? [
//           {
//             name: "otp",
//             label: "Enter OTP",
//             type: "text",
//             inputMode: "numeric",
//             autoComplete: "one-time-code",
//           } as Field,
//         ]
//       : []),
//   ];

//   // 🧠 Initial values (email NEVER resets)
//   const initialValues = otpSent ? { email, otp: "" } : { email };

//   // ✅ Validation
//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     ...(otpSent && {
//       otp: Yup.string()
//         .matches(/^\d{4}$/, "OTP must be 4 digits")
//         .required("OTP is required"),
//     }),
//   });

//   // 📤 Send OTP
//   const handleSendOtp = async (email: string) => {
//     try {
//       await sendOtp({ email }).unwrap();
//       setEmail(email);
//       setOtpSent(true);
//       setResendTimer(60);
//       showMessage("OTP sent to your email!");
//     } catch (error) {
//       showMessage(
//         (error as any).data.message || "Failed to send OTP. Please try again.",
//         "error",
//       );
//     }
//   };

//   // 🔐 Verify OTP
//   const handleVerifyOtp = async (otp: string) => {
//     try {
//       const response = await verifyOtp({ email, otp }).unwrap();
//       await login(email, response.token);
//       showMessage("Login successful!");
//       navigate(from, { replace: true });
//     } catch (error) {
//       showMessage(
//         (error as any).data.message || "Invalid OTP. Please try again.",
//         "error",
//       );
//     }
//   };

//   // 🚀 Submit handler
//   const handleSubmit = async (values: Record<string, string>) => {
//     if (!otpSent) {
//       await handleSendOtp(values.email);
//     } else {
//       await handleVerifyOtp(values.otp);
//     }
//   };

//   // 🔁 Resend OTP
//   const handleResendOtp = async () => {
//     if (resendTimer > 0 || !email) return;
//     await handleSendOtp(email);
//   };

//   return (
//     <AuthContainer
//       title="Sign in"
//       subtitle="Enter your credentials to access your account"
//     >
//       <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//         <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
//           <LockOutlinedIcon fontSize="large" />
//         </Avatar>
//       </Box>

//       <DynamicForm
//         fields={fields}
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//         isLoading={isLoading}
//         error=""
//         success=""
//         submitText={otpSent ? "Verify OTP" : "Send OTP"}
//         extraLink={
//           !otpSent
//             ? { text: "Don't have an account? Sign Up", to: "/register" }
//             : undefined
//         }
//       />

//       {otpSent && (
//         <Box sx={{ mt: 2, textAlign: "center" }}>
//           <Typography variant="body2" color="text.secondary">
//             Didn’t receive OTP?{" "}
//             <Button
//               onClick={handleResendOtp}
//               disabled={resendTimer > 0}
//               size="small"
//               sx={{ p: 0, minWidth: "auto" }}
//             >
//               Resend {resendTimer > 0 && `(${resendTimer}s)`}
//             </Button>
//           </Typography>
//         </Box>
//       )}
//     </AuthContainer>
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";

import { useAuth } from "../../contexts/AuthContext";
import { AuthContainer } from "../../components/auth/AuthContainer";
import { DynamicForm, type Field } from "../../components/forms/DynamicForm";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../../store/features/api/authApi";
import { useSnackbar } from "../../contexts/SnackbarContext";

/* -------------------- Form Types -------------------- */
type LoginFormValues = {
  email: string;
  otp?: string;
};

export const Login = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [email, setEmail] = useState("");

  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const { showMessage } = useSnackbar();
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const isLoading = isSendingOtp || isVerifyingOtp;

  /* -------------------- OTP Timer -------------------- */
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  /* -------------------- Fields -------------------- */
  const fields: Field[] = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      disabled: otpSent,
      required: true,
    },
    ...(otpSent
      ? [
          {
            name: "otp",
            label: "Enter OTP",
            type: "text",
            required: true,
          } as Field,
        ]
      : []),
  ];

  /* -------------------- Initial Values -------------------- */
  const initialValues: LoginFormValues = otpSent
    ? { email, otp: "" }
    : { email };

  /* -------------------- Validation -------------------- */
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    ...(otpSent && {
      otp: Yup.string()
        .matches(/^\d{4}$/, "OTP must be 4 digits")
        .required("OTP is required"),
    }),
  });

  /* -------------------- Handlers -------------------- */
  const handleSendOtp = async (email: string) => {
    try {
      await sendOtp({ email }).unwrap();
      setEmail(email);
      setOtpSent(true);
      setResendTimer(60);
      showMessage("OTP sent to your email!");
    } catch (error: any) {
      showMessage(error?.data?.message || "Failed to send OTP", "error");
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      await login(email, res.token);
      showMessage("Login successful!");
      navigate(from, { replace: true });
    } catch (error: any) {
      showMessage(error?.data?.message || "Invalid OTP", "error");
    }
  };

  /* -------------------- Submit -------------------- */
  const handleSubmit = async (values: LoginFormValues) => {
    if (!otpSent) {
      await handleSendOtp(values.email);
    } else if (values.otp) {
      await handleVerifyOtp(values.otp);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || !email) return;
    await handleSendOtp(email);
  };

  /* -------------------- UI (UNCHANGED) -------------------- */
  return (
    <AuthContainer
      title="Sign in"
      subtitle="Enter your credentials to access your account"
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
      </Box>

      <DynamicForm<LoginFormValues>
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        singleColumn={true}
        isLoading={isLoading}
        submitText={otpSent ? "Verify OTP" : "Send OTP"}
      />

      {otpSent && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Didn’t receive OTP?{" "}
            <Button
              onClick={handleResendOtp}
              disabled={resendTimer > 0}
              size="small"
              sx={{ p: 0, minWidth: "auto" }}
            >
              Resend {resendTimer > 0 && `(${resendTimer}s)`}
            </Button>
          </Typography>
        </Box>
      )}
    </AuthContainer>
  );
};
