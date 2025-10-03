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
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            👋 Welcome Back,{" "}
            <span className="text-blue-600 underline decoration-wavy">
              {firstName}
            </span>
            !
          </h1>
          <p className="text-gray-600 mt-2">Have a great day ahead 😊</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <TotalUsers setBirthdayMessages={setBirthdayMessages} />
          <TodayPresent />
          <TodayOnLeave />
          <TodayAbsent />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <CalendarComponent />
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📢 Announcements</h2>
            <p className="text-gray-600">Upcoming......</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default AdDashboard;
