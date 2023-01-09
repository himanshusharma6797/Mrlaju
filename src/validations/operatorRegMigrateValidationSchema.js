import * as Yup from 'yup';

const operatorRegMigrateValidationSchema = Yup.object({

    residentGroupName:
        Yup
            .string()
            .required('Name of resident group is required!'),
    
    unitNumber:
        Yup
            .string()
            .required('Unit number is required!'),
    
    streetNumber:
        Yup
            .string()
            .required('Stree number is required!'),
    
    townName:
        Yup
            .string()
            .required('Town name is required!'),
    
    state:
        Yup
            .string()
            .required('State is required!'),
    
    postCode:
        Yup
            .number()
            .required('Post code is required!'),
    
    residentGroupType:
        Yup
            .string()
            .required('Resident group type is required!'),
    
    jMBMCRACertyAuthority:
        Yup
            .string()
            .required('JMB / MC / RA certification by authority is required!'),
    countryCode:
        Yup
            .number()
            .required('Country code is required!'),
    
    phoneNumber:
        Yup
            .string()
            .required('Phone number is required!'),
    
    emailOfTheGroup:
        Yup
            .string()
            .required('Email of group is required!'),
    
    numberOfPropertyDemisesWithinGroup:
        Yup
            .string()
            .required('Resident group type is required!'),
    
    bankName:
        Yup
            .string()
            .required('Bank name is required!'),
    
    bankAccountNumber:
        Yup
            .string()
            .required('Bank account number is required!'),
    
    bankAccountName:
        Yup
            .string()
            .required('Bank account name is required!'),

});

export default operatorRegMigrateValidationSchema;