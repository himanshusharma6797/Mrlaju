import * as Yup from 'yup';

const runnerRegistrationValidationSchema = Yup.object({
  isResident: Yup.string().required('Are you Resident!'),
  unitAddress: Yup.string('Unit address is Required!'),
  runnersBoss: Yup.string().required("Please choose your boss"),
  operatorName: Yup.string("Please select operator name"),
  operatorId: Yup.number().required("Please select operator name"),
  bankDetails: Yup.object().shape({
    bankName: Yup.string().required('Bank name is Required!'),
    accountHolderName: Yup.string().required('Account holder name is Required!'),
    accountNumber: Yup.number().required('Account number is Required!'),
  })
});

export default runnerRegistrationValidationSchema;