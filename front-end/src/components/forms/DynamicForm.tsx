// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   MenuItem,
//   TextField,
//   InputAdornment,
//   type InputLabelProps,
// } from "@mui/material";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import { Formik, Form as FormikForm, type FormikHelpers } from "formik";

// /* ---------------------------------- */
// /* Field definition */
// /* ---------------------------------- */
// export interface Field {
//   name: string;
//   label: string;
//   type?: "text" | "number" | "email" | "password" | "date" | "select";
//   options?: Array<{ value: string | number; label: string }>;
//   autoComplete?: string;
//   disabled?: boolean;
//   inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
//   required?: boolean;
//   InputLabelProps?: Partial<InputLabelProps>;
//   inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
//   hidden?: boolean | ((values: any) => boolean);
// }

// /* ---------------------------------- */
// /* Props */
// /* ---------------------------------- */
// interface DynamicFormProps<T extends Record<string, any>> {
//   fields: Field[];
//   initialValues: T;
//   validationSchema: any;
//   onSubmit: (values: T, helpers: FormikHelpers<T>) => void | Promise<void>;
//   isLoading?: boolean;
//   submitText?: string;
//   singleColumn?: boolean;
// }

// /* ---------------------------------- */
// /* Helpers */
// /* ---------------------------------- */
// const normalizeSelectValue = (value: any, options?: Array<{ value: any }>) => {
//   if (!options) return value ?? "";
//   return options.some((o) => o.value === value) ? value : "";
// };

// /* ---------------------------------- */
// /* Component */
// /* ---------------------------------- */
// export function DynamicForm<T extends Record<string, any>>({
//   fields,
//   initialValues,
//   validationSchema,
//   onSubmit,
//   isLoading = false,
//   submitText = "Submit",
//   singleColumn = false,
// }: DynamicFormProps<T>) {
//   return (
//     <Formik<T>
//       enableReinitialize
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//       {({ values, errors, touched, handleChange, handleBlur }) => (
//         <FormikForm noValidate>
//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: singleColumn
//                 ? "1fr"
//                 : { xs: "1fr", md: "1fr 1fr 1fr 1fr 1fr 1fr" },
//               gap: 2,
//             }}
//           >
//             {fields.map((field) => {
//               if (
//                 field.hidden &&
//                 (typeof field.hidden === "function"
//                   ? field.hidden(values)
//                   : field.hidden)
//               ) {
//                 return null;
//               }

//               const isDate = field.type === "date";
//               const isSelect = field.type === "select";
//               const error = touched[field.name] && errors[field.name];

//               return (
//                 <TextField
//                   key={field.name}
//                   fullWidth
//                   name={field.name}
//                   label={field.label}
//                   type={isDate ? "date" : field.type || "text"}
//                   value={
//                     isSelect
//                       ? normalizeSelectValue(values[field.name], field.options)
//                       : isDate
//                         ? values[field.name]
//                           ? values[field.name].toString().substring(0, 10)
//                           : ""
//                         : (values[field.name] ?? "")
//                   }
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   autoComplete={field.autoComplete}
//                   disabled={field.disabled}
//                   error={Boolean(error)}
//                   helperText={error ? String(error) : ""}
//                   select={isSelect}
//                   InputLabelProps={{
//                     shrink: true,
//                     ...field.InputLabelProps,
//                   }}
//                   InputProps={
//                     isDate
//                       ? {
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <CalendarTodayIcon
//                                 sx={{ cursor: "pointer" }}
//                                 onClick={(e) => {
//                                   const input = e.currentTarget
//                                     .closest("div")
//                                     ?.parentElement?.querySelector(
//                                       "input",
//                                     ) as HTMLInputElement | null;
//                                   input?.showPicker?.();
//                                 }}
//                               />
//                             </InputAdornment>
//                           ),
//                         }
//                       : undefined
//                   }
//                   onClick={
//                     isDate
//                       ? (e) => {
//                           (e.target as HTMLInputElement)?.showPicker?.();
//                         }
//                       : undefined
//                   }
//                   slotProps={{
//                     htmlInput: {
//                       inputMode: field.inputMode,
//                       ...field.inputProps,
//                     },
//                   }}
//                 >
//                   {isSelect &&
//                     field.options?.map((opt) => (
//                       <MenuItem key={opt.value} value={opt.value}>
//                         {opt.label}
//                       </MenuItem>
//                     ))}
//                 </TextField>
//               );
//             })}
//           </Box>

//           <Box sx={{ mt: 4 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth={singleColumn}
//               disabled={isLoading}
//               startIcon={isLoading ? <CircularProgress size={20} /> : null}
//             >
//               {submitText}
//             </Button>
//           </Box>
//         </FormikForm>
//       )}
//     </Formik>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  InputAdornment,
  type InputLabelProps,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Formik, Form as FormikForm, type FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";

/* ---------------------------------- */
/* Field definition */
/* ---------------------------------- */
export interface Field {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "password" | "date" | "select";
  options?: Array<{ value: string | number; label: string }>;
  autoComplete?: string;
  disabled?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  InputLabelProps?: Partial<InputLabelProps>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  hidden?: boolean | ((values: any) => boolean);
}

/* ---------------------------------- */
/* Props */
/* ---------------------------------- */
interface DynamicFormProps<T extends Record<string, any>> {
  fields: Field[];
  initialValues: T;
  validationSchema: any;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void | Promise<void>;
  isLoading?: boolean;
  submitText?: string;
  singleColumn?: boolean;
}

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */
const normalizeSelectValue = (value: any, options?: Array<{ value: any }>) => {
  if (!options) return value ?? "";
  return options.some((o) => o.value === value) ? value : "";
};

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */
export function DynamicForm<T extends Record<string, any>>({
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  isLoading = false,
  submitText = "Submit",
  singleColumn = false,
}: DynamicFormProps<T>) {
  const navigate = useNavigate(); // 👈 ADD THIS
  return (
    <Formik<T>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <FormikForm noValidate>
          {/* FORM FIELDS */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {fields.map((field) => {
              if (
                field.hidden &&
                (typeof field.hidden === "function"
                  ? field.hidden(values)
                  : field.hidden)
              ) {
                return null;
              }

              const isDate = field.type === "date";
              const isSelect = field.type === "select";
              const error = touched[field.name] && errors[field.name];

              return (
                <Box
                  key={field.name}
                  sx={{
                    width: "100%",
                    // Desktop: multiple columns
                    flexBasis: singleColumn
                      ? "100%"
                      : {
                          xs: "100%", // 📱 mobile block
                          sm: "48%", // 2 columns
                          md: "31%", // 3 columns
                          lg: "23%", // 4 columns
                        },
                  }}
                >
                  <TextField
                    fullWidth
                    name={field.name}
                    label={field.label}
                    type={isDate ? "date" : field.type || "text"}
                    value={
                      isSelect
                        ? normalizeSelectValue(
                            values[field.name],
                            field.options,
                          )
                        : isDate
                          ? values[field.name]
                            ? values[field.name].toString().substring(0, 10)
                            : ""
                          : (values[field.name] ?? "")
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete={field.autoComplete}
                    disabled={field.disabled}
                    error={Boolean(error)}
                    helperText={error ? String(error) : ""}
                    select={isSelect}
                    InputLabelProps={{
                      shrink: true,
                      ...field.InputLabelProps,
                    }}
                    InputProps={
                      isDate
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarTodayIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    const input = e.currentTarget
                                      .closest("div")
                                      ?.parentElement?.querySelector(
                                        "input",
                                      ) as HTMLInputElement | null;
                                    input?.showPicker?.();
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }
                        : undefined
                    }
                    onClick={
                      isDate
                        ? (e) => {
                            (e.target as HTMLInputElement)?.showPicker?.();
                          }
                        : undefined
                    }
                    slotProps={{
                      htmlInput: {
                        inputMode: field.inputMode,
                        ...field.inputProps,
                      },
                    }}
                  >
                    {isSelect &&
                      field.options?.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                  </TextField>
                </Box>
              );
            })}
          </Box>

          {/* SUBMIT */}
          {/* ACTION BUTTONS */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 2,
              justifyContent: "flex-start",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {submitText}
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              disabled={isLoading}
              onClick={() => navigate(-1)} // 👈 BACK
            >
              Cancel
            </Button>
          </Box>
        </FormikForm>
      )}
    </Formik>
  );
}
