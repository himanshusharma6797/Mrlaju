import React from 'react'
import { ToastContainer, Slide, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastNotify() {

    return (
        <>
            <ToastContainer
                toastStyle={{ backgroundColor: "#35498E" }}
                position="top-right"
                icon={false}
                transition={Slide}
                autoClose={3700}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}
