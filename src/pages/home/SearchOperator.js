import React from 'react'
import { useEffect, useState } from "react";
import Navbar from '../../components/Navbar'
import SplashOne from '../splash/SplashOne';
import SplashTwo from '../splash/SplashTwo';
import { Button, Paper } from '@mui/material';
import DeliveryBoyImage from './../../images/searchOperatorDeliveryBoy/deliveryBoy.svg'
import './SearchOperator.css'
// import UserService from "../../services/user.service";
import { authAxios, unAuthAxios } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import SearchPanal from '../../components/SearchPanal';
import axios from 'axios';

export default function SearchOperator() {
  const [loadingSplashOne, setLoadingSplashOne] = useState(false);
  const [loadingSplashTwo, setLoadingSplashTwo] = useState(false);
  // const [content, setContent] = useState("");
  // const [residentGroupList, setResidentGroupList] = useState([])
  const [optionData, setOptionData] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({})

  const navigate = useNavigate();

  const paper = {
    padding: '1.25rem',
    height: '100vh',
    minHeight: '100vh',
  }

  const goToSupplier = () => {
    if (selectedOptions?.value) {
      navigate("/bottom-navbar");
    }
  }

  const getAllOperators = async () => {
    try {

      const { data: { data } } = localStorage.getItem("token")
        ? await authAxios.get(`operator/list/`)
        : await unAuthAxios.get(`operator/list/`)

      console.log("All Operators : " + data)
      setOptionData(data)

    } catch (error) {

      console.log(error)

    }
  }

  console.log(selectedOptions)

  useEffect(() => {
    getAllOperators()
    // setLoadingSplashOne(true);
    setTimeout(() => {
      setLoadingSplashOne(false);
      // setLoadingSplashTwo(true);
      setTimeout(() => {
        setLoadingSplashTwo(false);
      }, 3000);
    }, 3000);
  }, []);
  return (
    <>
      {
        loadingSplashOne
          ?
          <SplashOne />
          :
          loadingSplashTwo
            ?
            <SplashTwo />
            :
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>

              <Navbar title={'Search Operator'} backButtonPath={'/'} />
              <div className='searchOperatorContainer'>

                <div style={{ width: '100%' }}>

                  {/* <SearchBar placeholder="Search" 
                  name="residentGroupId"
                  setSearchData={setSearchData} /> */}

                  <SearchPanal
                    optionData={optionData}
                    setSelectedOptions={setSelectedOptions} />

                </div>
                <div></div>
                <img src={DeliveryBoyImage} alt='delivery boy' className='searchOperatorImage' />
                <div></div>
                <div>
                  <h4 className='headingDeliveryResident'>Delivery is for operator’s resident only.</h4>
                  <h5 className='headingDeliveryNonResident'>Non-resident can perform self-pick up only</h5>
                </div>
                <Button className="submitButton" type="Submit" onClick={goToSupplier} variant="contained" color="primary" >Next</Button>
              </div>
            </Paper>
      }
    </>
  )
}
