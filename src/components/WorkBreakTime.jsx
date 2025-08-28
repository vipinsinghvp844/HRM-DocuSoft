import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const WorkBreakTime = () => {
  const { userId } = useParams();
  const [workDuration, setWorkDuration] = useState({ hours: 0, minutes: 0 });
  const [breakDuration, setBreakDuration] = useState({ hours: 0, minutes: 0 });

  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const year = new Date().getFullYear();
const convertMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};
  useEffect(() => {
    const fetchAttData = async () => {
      try {
        const response = await axios.get(
          `https://devsite.digitalpractice.net/devsite/wp-json/jwt-auth/v1/get-attendance-records/${userId}/?month=${month}&year=${year}`, {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
             },
           }
        );
        const records = response.data;

        let totalWorkMinutes = 0;
        let totalBreakMinutes = 0;

        records.forEach((rec) => {
          totalWorkMinutes += parseFloat(rec.total_work || 0);
          totalBreakMinutes += parseFloat(rec.total_break || 0);
        });

        setWorkDuration(convertMinutes(totalWorkMinutes));
        setBreakDuration(convertMinutes(totalBreakMinutes));
      } catch (error) {
        console.error("failed to fetch attendance", error);
      }
    };

    fetchAttData();
  }, [userId, month, year]);

  return (
    <>
      <p>
        <b>Total Work Time:</b> {workDuration.hours}h {workDuration.minutes}m
      </p>
      <p>
        <b>Total Break Time:</b> {breakDuration.hours}h {breakDuration.minutes}m
      </p>
    </>
  );
};

export default WorkBreakTime;
