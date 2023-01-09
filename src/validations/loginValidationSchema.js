import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
    countryCodeId: Yup.string().required('Country code is required!'),
    mobileNumber: Yup.number().required('Mobile number is required!'),
    password: Yup.string().min(8, 'Enter password should be Min 8 characters').required('Password is required!'),
    // userID: Yup.number().required('User ID is required!')
});

export default loginValidationSchema;