import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const {Component} = props

    let navigate = useNavigate();
    useEffect(()=>{

        if(!localStorage.getItem('token')){
            navigate('/')
        }
    })
  return (
    <div>
        <Component/>
    </div>
  )
}
