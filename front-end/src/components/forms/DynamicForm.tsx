// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Typography,
//   Grid,
//   Link as MuiLink,
//   TextField,
// } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import {
//   Formik,
//   Form as FormikForm,
//   Field as FormikField,
//   type FieldProps,
//   type FormikHelpers,
// } from "formik";
// import * as Yup from "yup";

// export type FieldType = "text" | "email";

// export interface Field {
//   name: string;
//   label: string;
//   type?: FieldType;
//   autoComplete?: string;
//   spellCheck?: boolean;
//   disabled?: boolean;
//   inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
// }

// interface DynamicFormProps<T extends Record<string, any>> {
//   title?: string;
//   subtitle?: string;
//   fields: Field[];
//   initialValues: any;
//   validationSchema: Yup.ObjectSchema<any>;
//   onSubmit: (values: T, helpers: FormikHelpers<T>) => void | Promise<void>;
//   submitText?: string;
//   isLoading?: boolean;
//   error?: string;
//   success?: string;
//   extraLink?: { text: string; to: string };
// }

// export function DynamicForm<T extends Record<string, any>>({
//   title,
//   subtitle,
//   fields,
//   initialValues,
//   validationSchema,
//   onSubmit,
//   submitText = "Submit",
//   isLoading = false,
//   error,
//   success,
//   extraLink,
// }: DynamicFormProps<T>) {
//   return (
//     <Formik<T>
//       enableReinitialize
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//       {({ errors, touched }) => (
//         <FormikForm>
//           {title && (
//             <Typography variant="h5" align="center" gutterBottom>
//               {title}
//             </Typography>
//           )}

//           {subtitle && (
//             <Typography variant="body2" align="center" sx={{ mb: 2 }}>
//               {subtitle}
//             </Typography>
//           )}

//           {error && (
//             <Typography color="error" align="center" sx={{ mb: 2 }}>
//               {error}
//             </Typography>
//           )}

//           {success && (
//             <Typography color="success.main" align="center" sx={{ mb: 2 }}>
//               {success}
//             </Typography>
//           )}

//           <Box sx={{ "& .MuiTextField-root": { mb: 2 } }}>
//             {fields.map((field) => (
//               <FormikField key={field.name} name={field.name}>
//                 {({ field: formikField }: FieldProps) => (
//                   <TextField
//                     {...formikField}
//                     fullWidth
//                     label={field.label}
//                     type={field.type || "text"}
//                     autoComplete={field.autoComplete}
//                     disabled={field.disabled || isLoading}
//                     inputMode={field.inputMode}
//                     error={Boolean(
//                       touched[field.name as keyof T] &&
//                       errors[field.name as keyof T],
//                     )}
//                     helperText={
//                       touched[field.name as keyof T] &&
//                       (errors[field.name as keyof T] as string)
//                     }
//                   />
//                 )}
//               </FormikField>
//             ))}
//           </Box>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             size="large"
//             disabled={isLoading}
//             sx={{ height: 48, fontWeight: 600, mb: 2 }}
//           >
//             {isLoading ? <CircularProgress size={24} /> : submitText}
//           </Button>

//           {extraLink && (
//             <Grid container justifyContent="center">
//               <MuiLink component={RouterLink} to={extraLink.to} variant="body2">
//                 {extraLink.text}
//               </MuiLink>
//             </Grid>
//           )}
//         </FormikForm>
//       )}
//     </Formik>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   MenuItem,
//   TextField,
//   Typography,
//   Autocomplete,
//   Divider,
//   FormControlLabel,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";
// import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";

// /* ----------------------------- Types ----------------------------- */

// export type FieldType =
//   | "text"
//   | "email"
//   | "select"
//   | "autocomplete"
//   | "file"
//   | "checkbox"
//   | "date"
//   | "multiselect"
//   | "description";

// export interface FormField {
//   name: string;
//   label: string;
//   type: FieldType;
//   required?: boolean;
//   options?: any[];
//   getOptionLabel?: (opt: any) => string;
//   onInputChange?: (
//     val: string,
//     setFieldValue: (field: string, value: any) => void,
//   ) => void;
//   onChange?: (
//     val: any,
//     setFieldValue: (field: string, value: any) => void,
//     values: Record<string, any>,
//   ) => void;
//   disabled?: boolean;
//   readonly?: boolean;
//   valueKey?: string;
//   rowBreak?: boolean;
//   dividerTitle?: string;
//   loading?: boolean;
//   showIf?: (values: Record<string, any>) => boolean;
// }

// interface DynamicFormProps<T extends Record<string, any>> {
//   fields: FormField[];
//   initialValues: T;
//   validationSchema: any;
//   onSubmit: (
//     values: T,
//     formikHelpers: FormikHelpers<T>,
//   ) => void | Promise<void>;
//   loading?: boolean;
//   submitLabel?: string;
//   disableSubmit?: (values: T) => boolean;
//   onCancel?: () => void;
//   children?: (args: {
//     values: T;
//     setFieldValue: (field: string, value: any) => void;
//   }) => React.ReactNode;
// }

// /* ------------------------- Component ------------------------- */

// const DynamicForm = <T extends Record<string, any>>({
//   fields,
//   initialValues,
//   validationSchema,
//   onSubmit,
//   loading = false,
//   submitLabel = "Submit",
//   onCancel,
//   children,
//   disableSubmit,
// }: DynamicFormProps<T>) => {
//   return (
//     <Formik<T>
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       enableReinitialize
//       onSubmit={onSubmit}
//     >
//       {({ values, errors, touched, setFieldValue }) => (
//         <Form>
//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
//               gap: 2,
//             }}
//           >
//             {fields
//               .filter((f) => (f.showIf ? f.showIf(values) : true))
//               .map((f) => (
//                 <React.Fragment key={f.name}>
//                   {/* Row Break / Divider */}
//                   {f.rowBreak && (
//                     <>
//                       {f.dividerTitle ? (
//                         <Typography
//                           variant="subtitle1"
//                           sx={{
//                             gridColumn: "1 / -1",
//                             textDecoration: "underline",
//                             textUnderlineOffset: "4px",
//                           }}
//                         >
//                           {f.dividerTitle}
//                         </Typography>
//                       ) : (
//                         <Divider sx={{ gridColumn: "1 / -1" }} />
//                       )}
//                     </>
//                   )}

//                   <Box>
//                     <Field name={f.name}>
//                       {({ field }: any) => {
//                         const hasError =
//                           touched[f.name as keyof T] &&
//                           Boolean(errors[f.name as keyof T]);

//                         const commonProps = {
//                           ...field,
//                           label: f.label,
//                           required: f.required,
//                           disabled: f.disabled,
//                           fullWidth: true,
//                           error: hasError,
//                           helperText: <ErrorMessage name={f.name} />,
//                           InputProps: { readOnly: f.readonly },
//                         };

//                         switch (f.type) {
//                           /* ---------- SELECT ---------- */
//                           case "select":
//                             return (
//                               <TextField
//                                 {...commonProps}
//                                 select
//                                 value={values[f.name] ?? ""}
//                                 onChange={(e) => {
//                                   f.onChange?.(
//                                     e.target.value,
//                                     setFieldValue,
//                                     values,
//                                   );
//                                   setFieldValue(f.name, e.target.value);
//                                 }}
//                               >
//                                 {f.options?.map((opt) => (
//                                   <MenuItem
//                                     key={opt.value}
//                                     value={opt.value}
//                                     disabled={opt.disabled}
//                                   >
//                                     {opt.label}
//                                   </MenuItem>
//                                 ))}
//                               </TextField>
//                             );

//                           /* ---------- MULTI SELECT ---------- */
//                           case "multiselect":
//                             return (
//                               <TextField
//                                 {...commonProps}
//                                 select
//                                 SelectProps={{
//                                   multiple: true,
//                                   renderValue: (selected: any[]) =>
//                                     f.options
//                                       ?.filter((o) =>
//                                         selected.includes(o.value),
//                                       )
//                                       .map((o) => o.label)
//                                       .join(", "),
//                                 }}
//                                 value={values[f.name] || []}
//                                 onChange={(e) => {
//                                   const val = e.target.value;
//                                   f.onChange?.(val, setFieldValue, values);
//                                   setFieldValue(f.name, val);
//                                 }}
//                               >
//                                 {f.options?.map((opt) => (
//                                   <MenuItem key={opt.value} value={opt.value}>
//                                     <Checkbox
//                                       checked={values[f.name]?.includes(
//                                         opt.value,
//                                       )}
//                                     />
//                                     <ListItemText primary={opt.label} />
//                                   </MenuItem>
//                                 ))}
//                               </TextField>
//                             );

//                           /* ---------- AUTOCOMPLETE ---------- */
//                           case "autocomplete":
//                             return (
//                               <Autocomplete
//                                 options={f.options || []}
//                                 loading={f.loading}
//                                 getOptionLabel={
//                                   f.getOptionLabel ||
//                                   ((opt) => opt?.label ?? "")
//                                 }
//                                 value={
//                                   f.options?.find(
//                                     (o) =>
//                                       o[f.valueKey || "value"] ===
//                                       values[f.name],
//                                   ) || null
//                                 }
//                                 onChange={(_, val) => {
//                                   const value =
//                                     val?.[f.valueKey || "value"] ?? "";
//                                   f.onChange?.(val, setFieldValue, values);
//                                   setFieldValue(f.name, value);
//                                 }}
//                                 onInputChange={(_, val, reason) => {
//                                   if (reason === "input") {
//                                     f.onInputChange?.(val, setFieldValue);
//                                   }
//                                 }}
//                                 renderInput={(params) => (
//                                   <TextField
//                                     {...params}
//                                     label={f.label}
//                                     required={f.required}
//                                     error={hasError}
//                                     helperText={<ErrorMessage name={f.name} />}
//                                   />
//                                 )}
//                               />
//                             );

//                           /* ---------- DESCRIPTION (NO CKEDITOR) ---------- */
//                           case "description":
//                             return (
//                               <TextField
//                                 {...commonProps}
//                                 multiline
//                                 minRows={4}
//                                 onChange={(e) => {
//                                   f.onChange?.(
//                                     e.target.value,
//                                     setFieldValue,
//                                     values,
//                                   );
//                                   field.onChange(e);
//                                 }}
//                               />
//                             );

//                           /* ---------- FILE ---------- */
//                           case "file":
//                             return (
//                               <>
//                                 <Button variant="outlined" component="label">
//                                   {f.label}
//                                   <input
//                                     hidden
//                                     type="file"
//                                     onChange={(e) =>
//                                       setFieldValue(
//                                         f.name,
//                                         e.currentTarget.files?.[0] ?? null,
//                                       )
//                                     }
//                                   />
//                                 </Button>

//                                 <ErrorMessage
//                                   name={f.name}
//                                   render={(msg) => (
//                                     <Typography variant="caption" color="error">
//                                       {msg}
//                                     </Typography>
//                                   )}
//                                 />
//                               </>
//                             );

//                           /* ---------- CHECKBOX ---------- */
//                           case "checkbox":
//                             return (
//                               <FormControlLabel
//                                 control={
//                                   <Checkbox
//                                     checked={values[f.name] === 1}
//                                     disabled={f.disabled || f.readonly}
//                                     onChange={(e) => {
//                                       const val = e.target.checked ? 1 : 0;
//                                       f.onChange?.(val, setFieldValue, values);
//                                       setFieldValue(f.name, val);
//                                     }}
//                                   />
//                                 }
//                                 label={f.label}
//                               />
//                             );

//                           /* ---------- DATE ---------- */
//                           case "date":
//                             return (
//                               <TextField
//                                 {...commonProps}
//                                 type="date"
//                                 InputLabelProps={{ shrink: true }}
//                                 value={values[f.name] || ""}
//                                 onChange={(e) =>
//                                   setFieldValue(f.name, e.target.value)
//                                 }
//                               />
//                             );

//                           /* ---------- DEFAULT ---------- */
//                           default:
//                             return (
//                               <TextField
//                                 {...commonProps}
//                                 type={f.type}
//                                 onChange={(e) => {
//                                   f.onChange?.(
//                                     e.target.value,
//                                     setFieldValue,
//                                     values,
//                                   );
//                                   field.onChange(e);
//                                 }}
//                               />
//                             );
//                         }
//                       }}
//                     </Field>
//                   </Box>
//                 </React.Fragment>
//               ))}
//           </Box>

//           {children && children({ values, setFieldValue })}

//           {/* Actions */}
//           <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={loading || disableSubmit?.(values)}
//               startIcon={loading && <CircularProgress size={20} />}
//             >
//               {submitLabel}
//             </Button>

//             {onCancel && (
//               <Button variant="outlined" onClick={onCancel}>
//                 Cancel
//               </Button>
//             )}
//           </Box>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default DynamicForm;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Formik, Form as FormikForm, type FormikHelpers } from "formik";

/* ---------------------------------- */
/* Field definition */
/* ---------------------------------- */
export interface Field {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean; // Moved to the correct interface
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
  error?: string;
  success?: string;
  extraLink?: { text: string; to: string };
  singleColumn?: boolean; // 🔑 AUTH FIX
}
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
  return (
    <Formik<T>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <FormikForm noValidate>
          {/* FORM GRID */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: singleColumn
                ? "1fr"
                : { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 2,
            }}
          >
            {fields.map((field) => {
              const fieldError = errors[field.name as keyof T];
              const fieldTouched = touched[field.name as keyof T];

              return (
                <TextField
                  key={field.name}
                  fullWidth
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  value={(values[field.name] ?? "") as string}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete={field.autoComplete}
                  disabled={field.disabled}
                  inputProps={{ inputMode: field.inputMode }}
                  error={Boolean(fieldTouched && fieldError)}
                  helperText={
                    fieldTouched && fieldError ? String(fieldError) : ""
                  }
                />
              );
            })}
          </Box>

          {/* ACTIONS */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: singleColumn ? "center" : "flex-start",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth={singleColumn} // 🔑 keeps login UI correct
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {submitText}
            </Button>
          </Box>
        </FormikForm>
      )}
    </Formik>
  );
}
