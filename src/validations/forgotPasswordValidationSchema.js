import * as Yup from 'yup';

const forgotPasswordValidationSchema = Yup.object({
    countryCodeId: Yup.string().required('Country code is required!'),
    mobileNumber: Yup.number().required('Mobile number is required!'),
    password: Yup.string().min(8, 'Enter password should be Min 8 characters').required('Password is required!'),
    otp: Yup.string().min(6, 'Enter 6 digit OTP!').max(6, 'Enter 6 digit OTP!').required('OTP is required!')
});

export default forgotPasswordValidationSchema;