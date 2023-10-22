import * as yup from "yup";
export const loginValidation = yup.object().shape({
    email: yup
        .string()
        .email("Not a proper email")
        .required("Please enter an email"),
    password: yup.string().required("Please enter password."),
});
export const registerValidation = yup.object().shape({
    firstName: yup.string().max(40).required("Required"),
    lastName: yup.string().max(40).required("Required"),
    email: yup
        .string()
        .email("Not a proper email")
        .required("Please enter an email"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Minumum 8 characters are required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match").required("confirmPassword is also required"),
});
