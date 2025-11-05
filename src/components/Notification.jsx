import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchNotificationsAll,
  changeReadUnreadAction,
  ChangeAllReadUnreadAction,
} from "../../redux/actions/EmployeeDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpiner from "./LoaderSpiner";
import { ArrowLeftCircle, Bell, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

const Notification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TotalNotifications } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );
  const { AllProfilesImage } = useSelector(({ AllReducers }) => AllReducers);
  const placeholderImage = `${import.meta.env.VITE_API_BASE_URL}/2024/07/placeholder-image-hrm.png`;
  const getProfileImage = (userId) => {
    if (!AllProfilesImage) return placeholderImage;
    const profile = AllProfilesImage.find(
      (profile) => String(profile.user_id) === String(userId)
    );
    return profile?.profile_image && profile.profile_image.trim() !== ""
      ? profile.profile_image
      : placeholderImage;
  };

  useEffect(() => {
    fetchNotification(1);
  }, []);

  const fetchNotification = async (pageNumber) => {
    if (!hasMore) return;
    setIsLoading(true);
    try {
      const response = await dispatch(fetchNotificationsAll(pageNumber));
      const newNotifications = Array.isArray(response) ? response : [];

      if (newNotifications.length < 20) setHasMore(false);
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
      await dispatch(
        changeReadUnreadAction(notificationId, async () => {
          await dispatch(fetchNotificationsAll(page));
        })
      );

      if (notificationType === "Leave-Apply") {
        navigate(`/leave-requests?sender_id=${senderId}&start_date=${startDate}`);
      } else if (notificationType === "Attendance_Edit") {
        navigate("/my-attendance");
      } else if (notificationType === "Leave-actions") {
        navigate("/my-leaves");
      }
    } catch (e) {
      console.error("Error marking notification as read:", e);
    }
  };

  const handleAllDismissNotification = async () => {
    setIsReading(true);
    try {
      const res = await dispatch(
        ChangeAllReadUnreadAction(async (res) => {
          await dispatch(fetchNotificationsAll(page, () => { }));
        })
      );
      if (res.updated_count > 0) {
        toast.success(res.message);

      } else {
        toast.warning(res.message);
      }
    } catch (err) {
      console.error("Failed to read all notification", err);
    } finally {
      setIsReading(false);
    }
  };

  return (
    <div className="pt-4 px-2 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-start justify-center bg-white/60 z-10">
          <LoaderSpiner />
        </div>
      )}

      {/* Header */}
      <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftCircle size={32} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Back</span>
        </button>

        <h2 className="text-2xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <Bell className="text-blue-600" /> Notifications
        </h2>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          onClick={handleAllDismissNotification}
          disabled={isReading}
        >
          {isReading ? "Marking..." : "Mark All as Read"}
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {TotalNotifications.length > 0 ? (
          TotalNotifications.map((item) => {
            const match = item.message.match(/\d{4}-\d{2}-\d{2}/g);
            const startDate = match ? match[0] : null;
            const isRead = item.is_read == 1;
            return (
              <div
                key={item.id}
                onClick={() =>
                  handleDismissNotification(
                    item.id,
                    item.notification_type,
                    item.sender_id,
                    startDate
                  )
                }
                className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all duration-200 
            ${isRead
                    ? "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                    : "bg-blue-50 hover:bg-blue-100 border border-blue-300 shadow-sm"
                  }`}
              >
                {/* Left avatar icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full 
              ${isRead ? "bg-gray-200" : "bg-blue-500 text-white shadow-md"}`}
                >
                  <img
                src={getProfileImage(item.sender_id)}
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover cursor-pointer border"
              />
                </div>

                {/* Message content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p
                      className={`font-semibold text-base ${isRead ? "text-gray-600 mb-1" : "text-blue-800 mb-1"
                        }`}
                    >
                      {item.notification_type}
                    </p>
                    <small
                      className={`text-xs ${isRead ? "text-gray-400" : "text-blue-500"
                        }`}
                    >
                      {new Date(item.created_at).toLocaleString([], {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}

                    </small>
                  </div>

                  {item.title && (
                    <p
                      className={`text-sm font-medium ${isRead ? "text-gray-500 mb-1" : "text-gray-700 mb-1"
                        }`}
                    >
                      {item.title}
                    </p>
                  )}

                  <p
                    className={`text-sm leading-snug ${isRead ? "text-gray-500 mb-1" : "text-gray-700 mb-1"
                      }`}
                  >
                    {item.message.length > 80 ? (
                      <>
                        {expandedId === item.id
                          ? item.message
                          : `${item.message.slice(0, 80)}...`}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(expandedId === item.id ? null : item.id);
                          }}
                          className="ml-1 text-blue-500 text-xs font-medium hover:underline"
                        >
                          {expandedId === item.id ? "Show less" : "Show more"}
                        </button>
                      </>
                    ) : (
                      item.message
                    )}
                  </p>
                </div>

                {/* Unread dot */}
                {!isRead && (
                  <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-6">No notifications available.</p>
        )}
      </div>


      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={() => fetchNotification(page)}
            disabled={isLoading}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
