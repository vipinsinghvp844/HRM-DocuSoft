import { useState } from 'react';
import { Col, Container, Row, Card, Alert } from 'react-bootstrap';
import TotalUsers from './TotalUsers';
import TodayPresent from './TodayPresent';
import TodayOnLeave from './TodayOnLeave';
import TodayAbsent from './TodayAbsent';
import './AdDashboard.css';
import CalendarComponent from './CalendarComponent ';

const AdDashboard = () => {
  const [birthdayMessages, setBirthdayMessages] = useState("");
  const firstName = localStorage.getItem("firstname") || "";


  return (
    <>
      <Container fluid className="p-2 bg-gray-50 min-h-screen">
        <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          👋 Welcome Back,{" "}
          <span className="text-blue-600 underline decoration-wavy">
            {firstName}
          </span>
          !
        </h1>
        <p className="text-gray-600 mt-2">
          Have a great day ahead 😊
        </p>
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
      {/* <Container fluid className="p-3">
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome to Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-purple-500 to-purple-400 flex flex-col justify-between transition hover:scale-[1.02] hover:shadow-xl duration-200">
            <TotalUsers setBirthdayMessages={setBirthdayMessages} />
          </div>

          <div className="rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-green-500 to-emerald-400 flex flex-col justify-between transition hover:scale-[1.02] hover:shadow-xl duration-200">
            <TodayPresent />
          </div>

          <div className="rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-blue-500 to-cyan-400 flex flex-col justify-between transition hover:scale-[1.02] hover:shadow-xl duration-200">
            <TodayOnLeave />
          </div>

          <div className="rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-red-500 to-pink-400 flex flex-col justify-between transition hover:scale-[1.02] hover:shadow-xl duration-200">
            <TodayAbsent />
          </div>
        </div>

      </Container> */}
    </>
  );
};

export default AdDashboard;
