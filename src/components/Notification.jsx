import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchNotificationsAll,
  changeReadUnreadAction,
} from "../../redux/actions/EmployeeDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import "./Notification.css";
import LoaderSpiner from "./LoaderSpiner";
import { ArrowLeftCircle } from "lucide-react";

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TotalNotifications, } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  useEffect(() => {
    fetchNotification(1);
  }, []);

  const fetchNotification = async (pageNumber) => {
    if (!hasMore) return;
    setIsLoading(true);
    try {
      const response = await dispatch(fetchNotificationsAll(pageNumber, (data) => {
        
      } ));
      const newNotifications = Array.isArray(response) ? response : [];


      if (newNotifications.length < 20) setHasMore(false);

      setNotification((prev) => {
        const uniqueNotification = newNotifications.filter(
          (newNotif) => !prev.some((notif) => notif.id === newNotif.id)
        );
        return [...prev, ...uniqueNotification];
      });

      setPage(pageNumber + 1);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissNotification = async (
    notificationId,
    notificationType,
    senderId,
    startDate
  ) => {
    
    try {
      setLoading(true);
      await dispatch(
        changeReadUnreadAction(notificationId, async () => {
          setLoading(false);
          await dispatch(fetchNotificationsAll(page, (res) => {
            // console.log(res,"respmse");
            
          }));
        })
      );

      setNotification((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, is_read: 1 } : notif
        )
      );

      if (notificationType === "Leave-Apply") {
        navigate(
          `/leave-requests?sender_id=${senderId}&start_date=${startDate}`
        );
      } else if (notificationType === "Attendance_Edit") {
        navigate("/my-attendance");
      } else if (notificationType === "Leave-actions") {
        navigate("/my-leaves");
      }
    } catch (e) {
      console.error("Error marking notification as read:", e);
    } finally {
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <LoaderSpiner />
        </div>
      )}
      <div className="pt-4 px-2">
        <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
          <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftCircle size={32} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Back</span>
        </button>
        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Notifications</h3>
        </div>

        <Row>
          {TotalNotifications.length > 0 ? (
            TotalNotifications.map((item) => {
              const match = item.message.match(/\d{4}-\d{2}-\d{2}/g);
              const startDate = match ? match[0] : null;

              return (
                <Col key={item.id} md={12} className="mb-2">
                  <div
                    className={`notification-item ${
                      item.is_read == 1 ? "read" : ""
                    }`}
                    onClick={() =>
                      handleDismissNotification(
                        item.id,
                        item.notification_type,
                        item.sender_id,
                        startDate
                      )
                    }
                  >
                    <p>
                      <strong>{item.notification_type}</strong>
                      {item.title && <span> - {item.title}</span>}
                      <br />
                      {item.message}
                    </p>
                    <small>{new Date(item.created_at).toLocaleString()}</small>
                  </div>
                </Col>
              );
            })
          ) : (
            <Col md={12}>
              <p>No notifications available.</p>
            </Col>
          )}
        </Row>

        {hasMore && (
          <Row className="text-center">
            <Col md={12}>
              <Button
                onClick={() => fetchNotification(page)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Notification;
