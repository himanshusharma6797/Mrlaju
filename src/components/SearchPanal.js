import React, { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'

export default function SearchPanal({ optionData, setSelectedOptions, listType }) {

    //Need to pass :
    //          1. setSelectedOptions for selected data
    //          2. Array of data for options 

    const [filteredData, setFilteredData] = useState()

    const handleChange = (options) => {
        setSelectedOptions(options);
    };

    useEffect(() => {
        const getSelectData = async () => {
            try {
                let arr = []
                listType === "merchant"
                    ? optionData?.map(item => arr.push({ value: item.businessName, label: item.businessName, id: item.id }))
                    : optionData?.map(item => arr.push({ value: item.residentGroupName, label: item.residentGroupName, id: item.id }))

                setFilteredData(arr)

            } catch (error) {

                console.log("Error : " + error);

            }
        }

        getSelectData()
    }, [optionData, listType])


    const style = {
        control: styles => ({
            ...styles, backgroundColor: 'white',
            borderRadius: 20,
            '&:hover': {
                border: '1px solid #35498E',
                boxShadow: '0px 0px 1px #35498E'
            },
            '&:focus': {
                border: '1px solid #ff8b67',
                boxShadow: '0px 0px 6px #35498E',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#35498E' : 'inherit',
            '&:hover': {
                backgroundColor: state.isSelected ? '#475da8' : 'rgb(222, 235, 255)',
                cursor: 'pointer'
            }
        }),
    }

    return (
        <>
            <Select
                styles={style}
                placeholder={'Search..'}
                onChange={handleChange}
                options={filteredData} />
        </>
    )
}
