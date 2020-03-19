import React, { useRef, useState, useEffect } from "react"
import { connect } from 'react-redux'
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, { PaginationProvider, PaginationListStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator'

import { getRestaurantNames, getRestaurantNamesByDatetime } from "../../actions/dashboardActions"
import '../../assets/dashboard.css'

const dayToIntMap = new Map([
    ["Monday", 0], ["Tuesday", 1], ["Wednesday", 2], ["Thursday", 3], ["Friday", 4],
    ["Saturday", 5], ["Sunday", 6]]);

const ResTable = (props) => {
    const [filteredRes, setFilteredRes] = useState([])
    const [hasFiltered, setHasFiltered] = useState(false)
    const [inputs, setInputs] = useState({ name: "", day: "", time: "", error: 0 })
    const hasMounted = useRef(false);

    // Filter on changes to user input and date-time filtered restaurant list
    const filterResNames = () => {
        setHasFiltered(true)
        setFilteredRes(props.restaurants.filter((res) => res.sname.toLowerCase().startsWith(inputs.name.toLowerCase())))
    }

    useEffect(() => {
        if (hasMounted.current)
            filterResNames()
        else
            hasMounted.current = true;
    }, [inputs.name, props.restaurants]);

    // React-Table configs
    const columns = [{
        dataField: 'sname',
        text: 'Restaurant Name',
        headerStyle: { backgroundColor: '#343A40', color: 'white' }

    }];

    const options = {
        custom: true,
        totalSize: hasFiltered ? filteredRes.length : props.restaurants.length,
        page: 1,
    };

    // Helper Functions
    const handleInputChange = (e) => {
        e.persist()
        setInputs((prevInput) => ({ ...prevInput, [e.target.name]: e.target.value }))
    }

    // Reset input fields and get entire restaurant list
    const handleReset = (e) => {
        e.preventDefault()
        setInputs({ name: "", day: "", time: "", error: 0 })
        props.dispatch(getRestaurantNames())
    }

    const handleFilterByDatetime = (e) => {
        e.preventDefault()
        if (!dayToIntMap.has(inputs.day)) {
            setInputs((prevInput) => ({ ...prevInput, error: 1 }))
            return
        }
        else if (!(/([01]?[0-9]|2[0-3]):[0-5][0-9]/.test(inputs.time))) {
            setInputs((prevInput) => ({ ...prevInput, error: 2 }))
            return
        } else {
            setInputs((prevInput) => ({ ...prevInput, error: 0 }))
            props.dispatch(getRestaurantNamesByDatetime(dayToIntMap.get(inputs.day), inputs.time))
        }
    }

    return <Container>
        {/* Title */}
        <h2 style={{ textAlign: 'center', color: 'teal', padding: '0.5em' }}>Is It Open?</h2>

        {/* Form Component */}
        <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
                <Col>
                    <Form.Group controlId="resName">
                        <Form.Control type="text" value={inputs.name} name="name"
                            placeholder="Search name" onChange={handleInputChange} />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        <Form style={{ paddingBottom: '1rem' }} onSubmit={handleFilterByDatetime}>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form.Group controlId="time">
                        <Form.Control type="text" value={inputs.day} name="day" isInvalid={inputs.error === 1}
                            placeholder="Enter day of the week e.g. Sunday" onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="time">
                        <Form.Control type="text" value={inputs.time} name="time" isInvalid={inputs.error === 2}
                            placeholder="Enter 24-hours format e.g. 15:00" onChange={handleInputChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-md-end" style={{ marginBottom: "1rem" }}>
                <Col style={{ textAlign: "end" }}>
                    <Button type="submit">
                        Search
                    </Button>
                    {` `}
                    <Button onClick={handleReset}>
                        Reset
                    </Button>
                </Col>
            </Row>
        </Form>

        {/* Table Component */}
        <PaginationProvider pagination={paginationFactory(options)}>
            {({ paginationProps, paginationTableProps}) => (
                <div>
                    <div style={{ marginBottom: "-2.5rem" }}>
                        {hasFiltered && filteredRes.length === 0
                            ? <Container style={{ height: '50px' }} />
                            : <PaginationTotalStandalone
                                {...paginationProps}
                            />
                        }
                    </div>
                    <div style={{ float: "right" }}>
                        <PaginationListStandalone
                            {...paginationProps}
                        />
                    </div>
                    <BootstrapTable
                        keyField="sname"
                        data={hasFiltered ? filteredRes : props.restaurants}
                        columns={columns}
                        {...paginationTableProps}
                        rowStyle={() => ({ backgroundColor: '#3E444A', color: 'white' })}
                        striped
                        bordered={false}
                        condensed
                        noDataIndication="Table is Empty"
                    />
                </div>
            )}
        </PaginationProvider>
    </Container>
};

const mapStateToProps = (state) => ({
    restaurants: state.dashboard.restaurants
})

export default connect(mapStateToProps)(ResTable);
