import React from 'react'
import Navbar from '../../components/Navbar';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Paper } from '@material-ui/core';

export default function Profile() {
  const { token: currentUser } = useSelector((state) => state.auth);
  const paper = {
    padding: '1.25rem',
    height: '100vh'
  }
  if (currentUser) {
    return <Navigate to="/login" />;
  }
  // This page gets current User from Local Storage by getting user in the application state and show user information (with token).
  // If the user is not logged in, navigate to /login page.
  return (
    <>
      <Paper sx={{ flexGrow: 1 }} elevation={10} style={paper}>
        <Navbar title={'Profile'} backButtonPath={'/'} />
        {console.log(currentUser)}
        {/* <div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div> */}
      </Paper>
    </>
  )
}
