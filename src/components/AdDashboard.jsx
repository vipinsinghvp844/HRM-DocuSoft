import { useState} from 'react';
import { Col, Container, Row, Card, Alert } from 'react-bootstrap';
import TotalUsers from './TotalUsers';
import TodayPresent from './TodayPresent';
import TodayOnLeave from './TodayOnLeave';
import TodayAbsent from './TodayAbsent';
import './AdDashboard.css'; 
import CalendarComponent from './CalendarComponent ';

const AdDashboard = () => {
  const [birthdayMessages, setBirthdayMessages] = useState("");
 

  return (
    <Container fluid className="p-">
      <div className="topbar">
        <Row className="align-items-center">
          <Col>
            <h3 className="text-center">Welcome to Dashboard</h3>
          </Col>
          {birthdayMessages.length > 0 && (
            <Card className="text-center shadow-sm border-0 rounded p-3 mt-3">
              {birthdayMessages.map((message, index) => (
                <Alert key={index} variant="success">
                  {message}
                </Alert>
              ))}
            </Card>
          )}
        </Row>
      </div>
      <Row className="mb-4">
        <Col xs={12} md={6} lg={3} className="mb-3">
          <Card className="dashboard-card">
            <TotalUsers setBirthdayMessages={setBirthdayMessages} />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-3">
          <Card className="dashboard-card">
            <TodayPresent />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-3">
          <Card className="dashboard-card">
            <TodayOnLeave />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-3">
          <Card className="dashboard-card">
            <TodayAbsent />
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} md={6} className="mb-3">
          <Card className="dashboard-card">
            <CalendarComponent />
          </Card>
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <Card className="dashboard-card">
            <h2 className="card-title">Announcements</h2>
            <p>Upcoming......</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdDashboard;
