import * as Yup from "yup";
export const addInvoiceValidation = Yup.object({
  customerName: Yup.string().required("This field is required"),
  customerAddress: Yup.string().required("This field is required"),
  customerPhoneNumber: Yup.string().required("This field is required"),
  customerTextCode: Yup.string().required("This field is required"),
  customerAccountNumber: Yup.string().required("This field is required"),
  customerEmail: Yup.string().required("This field is required"),
  note: Yup.string().required("This field is required"),
});
