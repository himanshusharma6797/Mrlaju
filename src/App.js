import './App.css';
import {
  HashRouter as Router,
  // Navigate, 
  Route, Routes
} from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
// import { useSelector } from 'react-redux';
// import { selectUser } from './features/userSlice';
import ProtectedRoute from './utils/ProtectedRout';
import { PageNotFound } from './pages/error/PageNotFound';
import SearchOperator from './pages/home/SearchOperator';
import OperatorRegistrationNew from './pages/operatorRegistration/OperatorRegistrationNew';
import OperatorRegistrationMigrate from './pages/operatorRegistration/OperatorRegistrationMigrate';
import OperatorRegistrationNewAdmin from './pages/operatorRegistration/admin/OperatorRegistrationNew';
import OperatorRegistrationMigrateAdmin from './pages/operatorRegistration/admin/OperatorRegistrationMigrate';
import OperatorRegistrationMigrateAdminRejected from './pages/operatorRegistration/admin/OperatorRegistrationMigrateRejected';
import Operator from './pages/operatorRegistration/Operator';
// import OperatorAdmin from './pages/operatorRegistration/admin/OperatorAdmin';
import MerchantApplication from './pages/merchantRegistration/admin/MerchantApplication'
import MerchantRegistraionNew from './pages/merchantRegistration/admin/MerchantRegistrationNew'
import MerchantRegistraionProcessed from './pages/merchantRegistration/admin/MerchantRegistrationProcessed'
import MerchantRegistraion from './pages/merchantRegistration/MerchantRegistration'
import RunnerRegistration from './pages/runnerRegistration/RunnerRegistration';
import GrandAdmin from './pages/grandAdmin/GrandAdmin';
import FinanceAdmin from './pages/financeAdmin/FinanceAdmin';
import MrLajuAdmin from './pages/mrLajuAdmin/MrLajuAdmin';
import Merchant from './pages/merchant/Merchant';
import MerchantRunner from './pages/merchantRunner/MerchantRunner';
import TermsOfUse from './pages/termsOfUse/TermsOfUse';
import Profile from './pages/profile/Profile';
import Location from './pages/operatorLocation/Location';
import MerchantApp from './pages/merchant/MerchantApp/MerchantApp';
import DuplicateGroup from './pages/merchant/DuplicateGroup/DuplicateGroup';
import OperatorAdminPanel from './pages/operatorPanel/OperatorAdminPanel';
import HomeCondo from './pages/homeCondo/HomeCondo';
import BottomNav from './components/BottomNav'
import OperatorRunner from './pages/operatorRunner/OperatorRunner'
import BusinessType from './pages/businessType/BusinessType';
import RunnerDetail from './pages/runnerDetail/RunnerDetail';
import PrintingReciept from './pages/printingReceipt/PrintingReceipt';
import StoreSetup from './pages/storeSetup/StoreSetup';
import CreateAdmin from './pages/createAdmin/CreateAdmin';
import MerchantToService from './pages/operatorRunner/MerchantToService';
import DeliveryFeePayoutAccount from './pages/operatorRunner/DeliveryFeePayoutAccount';
import Product from './pages/product/Product';
import FoodMerchantList from './pages/foodMerchantList/FoodMerchantList';
import AddNewMerchant from './pages/addNewMerchant/AddNewMerchant';


export default function App() {
  // const user = useSelector(selectUser)

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path='/login' element={user?<Logout/>:<Login />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/*' element={<PageNotFound />} />

          <Route path='/' element={<SearchOperator />} />

          <Route path='/operator-registration/new-account' element={<ProtectedRoute Component={OperatorRegistrationNew} />} />
          <Route path='/operator-registration/migrate-account' element={<ProtectedRoute Component={OperatorRegistrationMigrate} />} />
          <Route path='/about-operator' element={<ProtectedRoute Component={Operator} />} />

          {/* <Route path='/admin/operator' element={<ProtectedRoute Component={OperatorAdmin} />} /> */}
          <Route path='/admin/operator' element={<ProtectedRoute Component={OperatorAdminPanel} />} />
          <Route path='/admin/operator/:condo' element={<ProtectedRoute Component={HomeCondo} />} />
          <Route path='/admin/operator/:condo/shop-and-food' element={<ProtectedRoute Component={FoodMerchantList} />} />
          <Route path='/admin/operator/:condo/shop-and-food/add-new-merchant' element={<ProtectedRoute Component={AddNewMerchant} />} />
          <Route path='/admin/operator/:condo/Runner' element={<ProtectedRoute Component={OperatorRunner} />} />
          <Route path='/admin/operator/:condo/Runner/merchant-to-service' element={<ProtectedRoute Component={MerchantToService} />} />
          <Route path='/admin/operator/:condo/Runner/delivery-fee-payout-account' element={<ProtectedRoute Component={DeliveryFeePayoutAccount} />} />
          {/* dynamic routing here to get perticular operator form by operators operator ID */}
          <Route path='/admin/operator-registration/new-account/:operatorId' element={<ProtectedRoute Component={OperatorRegistrationNewAdmin} />} />

          {/* dynamic routing here to get perticular operator form by operators operator ID */}
          <Route path='/admin/operator-registration/migrate-account/:operatorId' element={<ProtectedRoute Component={OperatorRegistrationMigrateAdmin} />} />

          {/* dynamic routing here to get perticular operator form by operators operator ID */}
          <Route path='/admin/operator-registration/migrate-account/rejected/:operatorId' element={<ProtectedRoute Component={OperatorRegistrationMigrateAdminRejected} />} />

          <Route path='/merchant-registration' element={<ProtectedRoute Component={MerchantRegistraion} />} />

          <Route path='/admin/:condo/merchant-application' element={<ProtectedRoute Component={MerchantApplication} />} />
          <Route path='/admin/merchant-registration-new' element={<ProtectedRoute Component={MerchantRegistraionNew} />} />
          <Route path='/admin/merchant-registration-processed' element={<ProtectedRoute Component={MerchantRegistraionProcessed} />} />

          <Route path='/runner-registration' element={<ProtectedRoute Component={RunnerRegistration} />} />
          <Route path='/operator/location/:merchentId' element={<ProtectedRoute Component={Location} />} />

          <Route path='/admin/grand-admin' element={<ProtectedRoute Component={GrandAdmin} />} />
          <Route path='/admin/grand-admin/create-admin' element={<ProtectedRoute Component={CreateAdmin} />} />

          <Route path='/admin/finance-admin' element={<ProtectedRoute Component={FinanceAdmin} />} />

          <Route path='/admin/mr-laju-admin' element={<ProtectedRoute Component={MrLajuAdmin} />} />

          <Route path='/merchant' element={<ProtectedRoute Component={Merchant} />} />
          <Route path='/merchant/merchant-app' element={<ProtectedRoute Component={MerchantApp} />} />
          <Route path='/merchant/merchant-app/:condo' element={<ProtectedRoute Component={BusinessType} />} />
          <Route path='/merchant/merchant-app/:condo/runner-details' element={<ProtectedRoute Component={RunnerDetail} />} />
          <Route path='/merchant/merchant-app/:condo/print-receipt' element={<ProtectedRoute Component={PrintingReciept} />} />
          <Route path='/merchant/merchant-app/:condo/store-setup' element={<ProtectedRoute Component={StoreSetup} />} />
          <Route path='/merchant/merchant-app/:condo/products' element={<ProtectedRoute Component={Product} />} />
          {/* here we will do dynamic routing later */}
          <Route path='/merchant/duplicate' element={<ProtectedRoute Component={DuplicateGroup} />} />

          <Route path='/merchant-runner' element={<ProtectedRoute Component={MerchantRunner} />} />

          <Route path='/user' element={<ProtectedRoute Component={SearchOperator} />} />

          <Route path='/terms-of-use' element={<ProtectedRoute Component={TermsOfUse} />} />

          <Route path='/profile' element={<ProtectedRoute Component={Profile} />} />

          <Route path='/bottom-navbar' element={<ProtectedRoute Component={BottomNav} />} />

        </Routes>
      </Router>
    </div>
  );
}