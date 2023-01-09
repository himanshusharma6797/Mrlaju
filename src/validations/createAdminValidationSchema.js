import * as Yup from 'yup';

const createAdminValidationSchema = Yup.object({
    countryCodeId: Yup.string().required('Country code is required!'),
    mobileNumber: Yup.number().required('Mobile number is required!'),
    name: Yup.string().required('Name is required!'),
});

export default createAdminValidationSchema;