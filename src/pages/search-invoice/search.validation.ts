import * as Yup from "yup";
export const searchValidation = Yup.object({
  invoiceId: Yup.string()
    .required("This field is required"),
  // secretNumber: Yup.string()
  //   .required("This field is required"),
});
