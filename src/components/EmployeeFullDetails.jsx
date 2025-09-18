import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const EmployeeFullDetails = () => {
    return (
        <>
            <Container className="all-emp-details">
                <Row className="mb-4 d-flex">
                    <Col md={1}>
                        <i
                            className="bi bi-arrow-left-circle"
                            onClick={() => window.history.back()}
                            style={{
                                cursor: "pointer",
                                fontSize: "32px",
                                color: "#343a40",
                            }}
                        ></i>
                    </Col>
                    <Col md={9}>
                        <h3 className="mt-2">All Employee Details</h3>
                    </Col>
                    <Col className="text-right">

                        <Link to={"/add-employee"}>
                            <Button variant="warning" className="add-employee-button">
                                Add Employee
                            </Button>
                        </Link>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div>
                            <img src="/src/assets/Images/docu-icon.svg" alt="Profile" />
                        </div>
                        <span> user name here   </span>
                        <div>
                        </div>
                    </Col>
                    <Col md={6}>
                        second
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EmployeeFullDetails;