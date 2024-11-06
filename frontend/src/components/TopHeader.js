import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function TopHeader() {
    const linkStyle = {
        color: 'inherit',
        textDecoration: 'none',
    };

    return (
        <div className='d-flex justify-content-center'>
            <Row>
                <Col xs={3}>
                    <a href='https://github.com/dkkinyua' target="_blank" rel="noopener noreferrer" style={linkStyle}><i className="fa-brands fa-github fa-2x"></i></a>
                </Col>
                <Col xs={3}>
                    <a href='https://x.com/nyekssotrilll?t=t1b2X9PoKBlN11XM4Pt3YQ&s=09' target="_blank" rel="noopener noreferrer" style={linkStyle}><i className="fa-brands fa-x-twitter fa-2x"></i></a>
                </Col>
                <Col xs={3}>
                    <a href='https://www.instagram.com/dkkinyua?igsh=dzFobWhraGpwNHh0' target="_blank" rel="noopener noreferrer" style={linkStyle}><i className="fa-brands fa-instagram fa-2x"></i></a>
                </Col>
                <Col xs={3}>
                    <Link to='/contact-me' style={linkStyle}><i className='fa-regular fa-envelope open fa-2x'></i></Link>
                </Col>
            </Row>
        </div>
    );
}

export default TopHeader;
