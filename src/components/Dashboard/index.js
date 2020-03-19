import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { Button, Container, Row } from 'react-bootstrap'

import ResTable from './resTable'
import { getRestaurantNames } from '../../actions/dashboardActions'
import { unsetUser } from '../../actions/authActions'

const Dashboard = (props) => {

    // Get full restaurant list on render
    useEffect(() => {
        props.dispatch(getRestaurantNames());
    }, [props])

    // Helper functions
    const handleSignOut = () => {
        props.dispatch(unsetUser())
        props.history.push('/login')
    };

    return <Container>
        <Row className="justify-content-sm-end" style={{ marginTop: "1rem" }}>
            <span>Logged in as {props.authedEmail}&nbsp;</span>
            <Button variant="outline-danger" onClick={handleSignOut}>Sign out</Button>
        </Row>
        <Row>
            <ResTable />
        </Row>
    </Container>
}

const mapStateToProps = (state) => ({
    authedEmail: state.auth.authedEmail,
})

export default withRouter(connect(mapStateToProps)(Dashboard));
