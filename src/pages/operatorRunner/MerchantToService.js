import React from 'react';
import { Button, Paper } from '@material-ui/core';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { authAxios } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const restaurentList = [
    {
        businessName: 'ABC Restaurent',
        id: 1
    },
    {
        businessName: 'SSS Restaurent',
        id: 2
    },
    {
        businessName: 'XYZ Restaurent',
        id: 1
    },
    {
        businessName: 'LMN Restaurent',
        id: 1
    },
]

export default function MerchantToService() {

    const navigate = useNavigate();

    const [merchantList, setMerchantList] = useState([]);

    const selectFun = (index) => {
        const array = [...merchantList]
        if (array[index].isSelected) {
            array[index].isSelected = false
        } else {
            array[index].isSelected = true
        }
        setMerchantList(array)
    }

    const paper = {
        padding: '1.25rem',
        minHeight: '100vh'
    }

    const handleGetMerchentList = async () => {
        try {
            const { data: { data } } = await authAxios.get(`operator-merchant/allMerchants/${'operatorId'}/?status=NEW`)
            setMerchantList(data)
            console.log(data);
        }
        catch (error) {
            console.log(error?.response?.data);
        }
    }

    const navigateToAnyWhere = (path) => {
        navigate(`${path}`);
    };

    useEffect(() => {
        handleGetMerchentList();
    }, [])

    return (
        <>
            <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
                <Navbar title={'Merchant to Service'} backButtonPath={'/admin/operator/:condo/Runner'} />
                {
                    merchantList?.map((restaurent, index) => <div key={index}
                        onClick={() => selectFun(index)}

                        className={restaurent?.isSelected ? 'restourentContainerSelected' : 'restourentContainer'}
                    >
                        <div className='restourentName'>{restaurent.businessName}</div>

                        <Button className="locationButton" variant="contained"
                            onClick={() => {
                                navigateToAnyWhere(`/operator/location/${restaurent.id}`)
                            }}>Location</Button>

                    </div>)
                }

                {/* for testing purpose */}
                {
                    restaurentList.map((restaurent, index) => <div key={index}
                        onClick={() => selectFun(index)}

                        className={restaurent?.isSelected ? 'restourentContainerSelected' : 'restourentContainer'}
                    >
                        <div className='restourentName'>{restaurent.businessName}</div>

                        <Button className="locationButton" variant="contained"
                            onClick={() => {
                                navigateToAnyWhere(`/operator/location/${restaurent.id}`)
                            }}>Location</Button>

                    </div>)
                }
            </Paper>
        </>
    )
}
