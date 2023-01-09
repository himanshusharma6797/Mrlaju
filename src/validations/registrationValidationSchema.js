import * as Yup from 'yup';

const registrationValidationSchema = Yup.object({
    mobileNumber: Yup.number().required('Mobile number is required!'),
    countryCodeId: Yup.string().required('Country code is required!'),
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Enter a valid email').required('Email is required!'),
    password: Yup.string().min(8, 'Enter password should be min 8 characters').required('Password is required!'),
    otp: Yup.string().min(6, 'Enter min 6 digit OTP!').max(6, 'Enter max 6 digit OTP!').required('OTP is required!')
});

export default registrationValidationSchema;