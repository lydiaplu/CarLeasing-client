import React from 'react'
import { Container, Row, Col, Card } from "react-bootstrap"
import {
    FaClock,
    FaCocktail,
    FaParking,
    FaSnowflake,
    FaTshirt,
    FaUtensils,
    FaWifi
} from "react-icons/fa"

export default function RentService() {
    return (
        <>
            <div className="rent-service">
                <header className="header">
                    <div className="overlay"></div>
                    <div className="container">
                        <h1 className="header-title text-center">Our Services</h1>
                    </div>
                </header>

                <Row className="mt-4 mb-3">
                    <h4 className="text-center">
                        Services at <span className="hotel-color"> DriveHub - </span><span>Car Leasing </span>
                        <span className="gap-2">
                            <FaClock className="ml-5" /> 24-Hour Service
                        </span>
                    </h4>
                </Row>
                <hr />

                <Row xs={1} md={2} lg={3} className="service-list g-4 mt-2">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    Vehicle Repairs
                                </Card.Title>
                                <Card.Text>Our in-house team provides quick repair services to ensure your journey isn’t delayed.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    Free Towing Service
                                </Card.Title>
                                <Card.Text>Enjoy two free towing services per year for a worry-free trip.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    Full Tank Delivery
                                </Card.Title>
                                <Card.Text>All vehicles are delivered with a full tank of fuel, so you can start your journey right away.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    No Hidden Fees
                                </Card.Title>
                                <Card.Text>Transparent pricing with no additional charges, giving you peace of mind when renting.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    Car Cleaning
                                </Card.Title>
                                <Card.Text>Keep your rental car clean and fresh with our professional cleaning service.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    Convenient Add-Ons
                                </Card.Title>
                                <Card.Text>Start your trip right with GPS navigation or child safety seats available upon request.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}
