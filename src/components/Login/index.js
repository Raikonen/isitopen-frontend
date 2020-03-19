import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Container } from 'react-bootstrap';

import EmailForm from './emailForm';
import PasswordForm from './passwordForm';

const Login = (props) => {
    // Redirect to dashboard if logged in
    useEffect(() => {
        if (props.isLoggedIn) {
            props.history.push("/dashboard")
        }
    }, [props.isLoggedIn, props.history])

    return (
        <Container>
            {!props.isValidEmail ? <EmailForm /> : <PasswordForm />}
        </Container>)
}

const mapStateToProps = (state) => ({
    isValidEmail: state.login.isValidEmail,
    isLoggedIn: state.auth.isLoggedIn,
})

export default withRouter(connect(mapStateToProps)(Login));
