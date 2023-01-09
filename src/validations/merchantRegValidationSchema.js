import * as Yup from 'yup';

const merchantRegValidationSchema = Yup.object({
    residentGroupId: Yup.number().required('Resident Group is Required!'),
    businessName: Yup.string().required('Business name is Required!'),
    businessAddress: Yup.string().required('Business address is Required!'),
    personInchargeName: Yup.string().required('Person incharge name is Required!'),
    mobileNumber: Yup.number().required('Mobile number is Required!'),
    countryCodeId: Yup.string().required("Country code is required!")
});

export default merchantRegValidationSchema;