export interface IUser {
  role: string;
  isEmailVerified: boolean;
  isInformationVerified: boolean;
  commonName: string;
  organizationalUnitName: string;
  organizationName: string;
  localityName: string;
  stateOrProvinceName: string;
  countryName: string;
  phoneNumber: string;
  textCode: string;
  address: string;
  accountNumber: string;
  certificatePassword: string;
  name: string;
  email: string;
  id: string;
}