import React from 'react'
import { Container } from 'react-bootstrap'

export default function Parallax() {
    return (
        <div className="parallax mb-5">
            <Container className="text-center px-5 py-5 justify-content-center">
                <div className="animated-texts bounceIn">
                    <h1>
                        Explore New Roads with
                        <span className="hotel-color"> DriveHub Car Rentals</span>
                    </h1>
                    <h1>
                        Where Every Journey Matters
                    </h1>
                    <h3>We offer the best services for all your needs</h3>
                </div>
            </Container>
        </div>
    )
}
