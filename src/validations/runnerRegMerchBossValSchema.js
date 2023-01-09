import * as Yup from 'yup';

const runnerRegMerchBossValSchema = Yup.object({
    isResident: Yup.string('Are you Resident!'),
    unitAddress: Yup.string('Unit address is Required!'),
    runnersBoss: Yup.string("Please choose your boss").required("Please choose your boss!"),
    operatorName: Yup.string("Please select operator name"),
    operatorId: Yup.number("Please select operator name"),
    merchantId: Yup.number().required("Please select operator name"),
    bankDetails: Yup.object().shape({
        bankName: Yup.string('Bank name is Required!'),
        accountHolderName: Yup.string('Account holder name is Required!'),
        accountNumber: Yup.number('Account number is Required!'),
    })
});

export default runnerRegMerchBossValSchema;
