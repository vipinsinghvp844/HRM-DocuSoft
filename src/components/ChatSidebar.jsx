import React, { useEffect, useState, useRef, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { format } from "date-fns";
import { WebSocketContext } from "./WebSocketContext";
import { useSelector } from "react-redux";

function ChatSidebar({
  selectUser,
  filteredUsers,
  searchItem,
  handleInputChange,
  getProfileImage,
  // getLastMessageForUser,
}) {
 
  const { userStatus } = useContext(WebSocketContext);
    const { TotalNotifications, AllUnseenUserAndMessages } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  return (
   <div className="flex flex-col h-screen">
  <div className="sticky top-30 z-10 bg-white p-3 border-b border-gray-200">
    <input
      type="text"
      value={searchItem}
      onChange={handleInputChange}
      placeholder="🔍 Search user..."
      className="w-full p-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  <div className="flex-1 overflow-y-auto">
    {filteredUsers.map((user) => {
      const unseenMessages =
        AllUnseenUserAndMessages?.[0]?.unread_messages?.find(
          (msg) => String(msg.sender_id) === String(user.id)
        )?.unread_count || 0;

      const isOnline = userStatus[String(user.id)]?.status === "online";

      return (
        <div
          key={user.id}
          onClick={() => selectUser(user)}
          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer transition"
        >
          <div className="relative mr-3">
            <img
              src={getProfileImage(user.id)}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span
              className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>

          <div className="flex-1">
            <p className="font-medium text-gray-800">{user.username}</p>
          </div>

          {unseenMessages > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {unseenMessages}
            </span>
          )}
        </div>
      );
    })}
  </div>
</div>

  );
}

export default ChatSidebar;
