import * as Yup from "yup";
export const profileUserValidation = Yup.object({
  commonName: Yup.string().required("This field is required"),
  organizationalUnitName: Yup.string().required("This field is required"),
  organizationName: Yup.string().required("This field is required"),
  localityName: Yup.string().required("This field is required"),
  stateOrProvinceName: Yup.string().required("This field is required"),
  countryName: Yup.string().required("This field is required"),
  phoneNumber: Yup.number().required("This field is required"),
  textCode: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  accountNumber: Yup.number().required("This field is required"),
});
