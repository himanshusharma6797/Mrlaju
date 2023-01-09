import * as Yup from 'yup';

const operatorRegMigrateRejectedValidationSchema = Yup.object({

    residentGroupName:
        Yup
            .string()
            .required('Name is Required!'),
    email:
        Yup
            .string()
            .email('Enter a valid email')
            .required('Email is Required!'),
    fileUrl:
        Yup
            .string()
            .required('Upload a certification!'),
    groupType:
        Yup
            .string()
            .required('Group type is Required!'),
    propertyCount:
        Yup
            .number()
            .typeError('Property count must be a number')
            .required('Property Count is Required!'),
    rejectedReason:
        Yup
            .string()
            .required('Rejected Reason is required!'),
    rejectedDate:
        Yup
            .string()
            .required('Rejected Date is required!'),

    address:
        Yup
            .object().shape({
                unitNumber:
                    Yup
                        .number()
                        .typeError('Unit number must be a number')
                        .required('Unit number is Required!'),
                streetName:
                    Yup
                        .string()
                        .required('Street name is Required!'),
                townName:
                    Yup
                        .string()
                        .required('Town name is Required!'),
                postalCode:
                    Yup
                        .number()
                        .typeError('Postal code must be a number')
                        .required('Postal code is Required!'),
                state:
                    Yup
                        .string()
                        .required('State is Required!'),
            }),

    bankDetails:
        Yup
            .object().shape({
                bankName:
                    Yup
                        .string()
                        .required('Bank name is Required!'),
                accountHolderName:
                    Yup
                        .string()
                        .required('Account holder name is Required!'),
                accountNumber:
                    Yup
                        .number()
                        .typeError('Account number must be a number')
                        .required('Account number is Required!'),

            })

});

export default operatorRegMigrateRejectedValidationSchema;