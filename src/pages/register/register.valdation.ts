import * as Yup from "yup";

export const registerValidation = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  rePassword: Yup.string().when("password", {
    is: (val: string | any[]) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});
