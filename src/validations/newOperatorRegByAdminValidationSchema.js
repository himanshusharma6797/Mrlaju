import * as Yup from 'yup';

const newOperatorRegByAdminValidationSchema = Yup.object({

    // nameOfYourResidentGroup: operatorData.residentGroupName ? operatorData.residentGroupName : "",
    // unitNumber: operatorData.unitNumber ? operatorData.unitNumber : "",
    // streetNumber: operatorData.streetNumber ? operatorData.streetNumber : "",
    // townName: operatorData.townName ? operatorData.townName : "",
    // state: operatorData.state ? operatorData.residentGroupName : "",
    // postCard: operatorData.postCard ? operatorData.postCard : "",
    // groupType: operatorData.groupType ? operatorData.groupType : "",
    // fileUrl: operatorData.fileUrl ? operatorData.fileUrl : "",
    // countryCode: operatorData.countryCode ? operatorData.countryCode : "",
    // phoneNumber: operatorData.phoneNumber ? operatorData.phoneNumber : "",
    // email: operatorData.email ? operatorData.email : "",
    // propertyCount: operatorData.propertyCount ? operatorData.propertyCount : "",
    // bankName: operatorData.bankName ? operatorData.bankName : "",
    // bankAccountNumber: operatorData.bankAccountNumber ? operatorData.bankAccountNumber : "",
    // bankAccountName: operat

    nameOfYourResidentGroup:
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
    postCard:
        Yup
            .number()
            .required('Post code is required!'),
    groupType:
        Yup
            .string()
            .required('Resident group type is required!'),
    jMBMCRACertyAuthority:
        Yup
            .string()
            .required('JMB / MC / RA certification by authority is required!'),
    emailOfTheGroup:
        Yup
            .string()
            .required('Email of group is required!'),
    propertyCount:
        Yup
            .string()
            .required('No of property demises is required!'),
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

export default newOperatorRegByAdminValidationSchema;