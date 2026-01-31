/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Link as MuiLink,
  TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  Formik,
  Form as FormikForm,
  Field as FormikField,
  type FieldProps,
  type FormikHelpers,
} from "formik";
import * as Yup from "yup";

export type FieldType = "text" | "email";

export interface Field {
  name: string;
  label: string;
  type?: FieldType;
  autoComplete?: string;
  spellCheck?: boolean;
  disabled?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

interface DynamicFormProps<T extends Record<string, any>> {
  title?: string;
  subtitle?: string;
  fields: Field[];
  initialValues: any;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void | Promise<void>;
  submitText?: string;
  isLoading?: boolean;
  error?: string;
  success?: string;
  extraLink?: { text: string; to: string };
}

export function DynamicForm<T extends Record<string, any>>({
  title,
  subtitle,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  submitText = "Submit",
  isLoading = false,
  error,
  success,
  extraLink,
}: DynamicFormProps<T>) {
  return (
    <Formik<T>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <FormikForm>
          {title && (
            <Typography variant="h5" align="center" gutterBottom>
              {title}
            </Typography>
          )}

          {subtitle && (
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
              {subtitle}
            </Typography>
          )}

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography color="success.main" align="center" sx={{ mb: 2 }}>
              {success}
            </Typography>
          )}

          <Box sx={{ "& .MuiTextField-root": { mb: 2 } }}>
            {fields.map((field) => (
              <FormikField key={field.name} name={field.name}>
                {({ field: formikField }: FieldProps) => (
                  <TextField
                    {...formikField}
                    fullWidth
                    label={field.label}
                    type={field.type || "text"}
                    autoComplete={field.autoComplete}
                    disabled={field.disabled || isLoading}
                    inputMode={field.inputMode}
                    error={Boolean(
                      touched[field.name as keyof T] &&
                      errors[field.name as keyof T],
                    )}
                    helperText={
                      touched[field.name as keyof T] &&
                      (errors[field.name as keyof T] as string)
                    }
                  />
                )}
              </FormikField>
            ))}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ height: 48, fontWeight: 600, mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : submitText}
          </Button>

          {extraLink && (
            <Grid container justifyContent="center">
              <MuiLink component={RouterLink} to={extraLink.to} variant="body2">
                {extraLink.text}
              </MuiLink>
            </Grid>
          )}
        </FormikForm>
      )}
    </Formik>
  );
}
