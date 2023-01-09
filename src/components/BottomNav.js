import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OurSupplier from '../pages/suppliers/OurSupplier';
import './BottomNav.css'

const styles = (theme) => ({
    root: {
        width: 500
    },
    selected: {
        color: "green"
    }
});

export default function BottomNav() {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(event, newValue);
    };


    return (
        <>

            <OurSupplier />

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: "9%", pt: 1.2 }} elevation={6}>

                <BottomNavigation
                    showLabels
                    sx={{
                    }}

                    // "& .MuiBottomNavigationAction-root, svg": {
                    //     color: "green",
                    // },
                    // "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
                    //     color: "red"
                    // }

                    value={value}
                    onChange={handleChange}>

                    <BottomNavigationAction

                        label="Food"
                        value="Food"
                        icon={<RestaurantMenuIcon fontSize='medium' />}
                    />

                    <BottomNavigationAction
                        label="Shop"
                        value="Shop"
                        icon={<StorefrontIcon fontSize='medium' />}
                    />
                    <BottomNavigationAction
                        label="Schedule"
                        value="Schedule"
                        icon={<CalendarMonthIcon fontSize='medium' />}
                    />
                    <BottomNavigationAction
                        label="Order"
                        value="Order"
                        icon={<ShoppingCartIcon fontSize='medium' />} />

                </BottomNavigation>
            </Paper>
        </>
    )
}
