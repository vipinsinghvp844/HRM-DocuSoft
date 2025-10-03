import React, { useContext, useEffect } from "react";
import { WebSocketContext } from "./WebSocketContext";

const ChatWindow = ({
  selectedUser,
  userId,
  messages,
  isLoading,
  handleSendMessage,
  newMessage,
  setNewMessage,
  profileImage,
  isSending,
  chatBoxRef,
  editingMessageId,
  contextMenu,
  setContextMenu,
  setEditedMessage,
  setEditingMessageId,
  editedMessage,
  handleEditMessage,
  handleDeleteMessage,
  EmojiPicker,
  showEmojiPicker,
  setShowEmojiPicker,
  showModal,
  file,
  setShowModal,
  preview,
  handleFileChange,
  handleKeyDown,
  onBack,
}) => {
  const { userStatus } = useContext(WebSocketContext);
  const online = userStatus?.[String(selectedUser?.id)]?.status || false;
  const lastSeen = userStatus?.[String(selectedUser?.id)]?.last_updated;

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [contextMenu]);

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Please select a chat to start messaging
      </div>
    );
  }

  const handleContextMenu = (e, msgId) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();

    let posX = rect.right;
    let posY = rect.top;

    // screen width check
    if (posX + 150 > window.innerWidth) {
      posX = rect.left - 10; // left side khol do agar right side full hai
    }

    setContextMenu({
      visible: true,
      x: posX,
      y: posY,
      messageId: msgId,
    });
  };


  return (
    <div className="flex flex-col h-screen bg-white border-l border-gray-200 relative">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-300 sticky top-0 bg-white z-20">
        {onBack && (
          <button
            className="md:hidden text-lg px-2 py-1 rounded hover:bg-gray-100"
            onClick={onBack}
          >
            ←
          </button>
        )}
        <img
          src={profileImage}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h5 className="text-lg font-semibold">{selectedUser.username}</h5>
          {online === "online" ? (
            <span className="text-sm text-green-500">Online</span>
          ) : (
            <span className="text-sm text-gray-500">{lastSeen}</span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-2"
        ref={chatBoxRef}
      >
        {isLoading && (
          <div className="flex justify-center items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-4 border-t-4 border-gray-200"></div>
            Loading messages...
          </div>
        )}

        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-5">
            <h6 className="text-lg">No messages yet</h6>
            <p className="text-sm">Start the conversation by sending a message!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isSender = msg.sender_id === String(userId);
            const messageTime = new Date(msg.timestamp).toLocaleTimeString(
              "en-US",
              { hour: "2-digit", minute: "2-digit" }
            );
            const messageDate = new Date(msg.timestamp).toLocaleDateString("en-US");
            const previousMessageDate =
              index > 0
                ? new Date(messages[index - 1].timestamp).toLocaleDateString("en-US")
                : null;

            return (
              <React.Fragment key={`${msg.id}-${index}`}>
                {messageDate !== previousMessageDate && (
                  <div className="flex justify-center my-2">
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-600">
                      {messageDate}
                    </span>
                  </div>
                )}

                <div
                  className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}
                  onContextMenu={(e) => handleContextMenu(e, msg.id)}
                >
                  <div
                    className={`relative inline-block max-w-[70%] break-words  py-2 pr-20 ps-2 rounded-lg ${isSender
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    {/* Image / Video */}
                    {msg.base64_image_data &&
                      (msg.media_type === "image" ? (
                        <img
                          src={`data:image/jpeg;base64,${msg.base64_image_data}`}
                          alt="Media"
                          className="rounded-lg max-w-full mb-2"
                        />
                      ) : (
                        <video controls className="rounded-lg max-w-full mb-2">
                          <source
                            src={`data:video/mp4;base64,${msg.base64_image_data}`}
                            type="video/mp4"
                          />
                        </video>
                      ))}

                    {/* Editable message */}
                    {editingMessageId === msg.id && isSender ? (
                      <input
                        type="text"
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        onBlur={() => handleEditMessage(msg.id)}
                        autoFocus
                        className="w-full border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <div>{msg.message}</div>
                    )}

                    {/* Time & ticks */}
                    <div className="absolute bottom-1 right-2 flex items-center gap-1 text-xs text-gray-300">
                      {messageTime}
                      {isSender &&
                        (msg.read_status === "1" ? (
                          <i className="bi bi-check2-all text-blue-300"></i>
                        ) : (
                          <i className="bi bi-check"></i>
                        ))}
                    </div>
                  </div>
                </div>
              </React.Fragment>

            );
          })
        )}

        {/* Context Menu */}
        {contextMenu.visible && (
          <div
            className="absolute bg-white shadow-lg rounded border border-gray-200 p-2 z-50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <div
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                const messageToEdit = messages.find(
                  (m) => m.id === contextMenu.messageId
                );
                setEditedMessage(messageToEdit.message);
                setEditingMessageId(contextMenu.messageId);
                setContextMenu({ ...contextMenu, visible: false });
              }}
            >
              Edit
            </div>
            <div
              className="px-3 py-1 hover:bg-red-100 text-red-500 cursor-pointer"
              onClick={() => {
                handleDeleteMessage(contextMenu.messageId);
                setContextMenu({ ...contextMenu, visible: false });
              }}
            >
              Delete
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center p-2 border-t border-gray-300 relative">
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-2 z-50">
            <EmojiPicker onEmojiClick={(emoji) => setNewMessage((prev) => prev + emoji.emoji)} />
          </div>
        )}

        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊
        </button>

        <label
          htmlFor="fileInputmedia"
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
        >
          📎
        </label>
        <input
          id="fileInputmedia"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          hidden
        />

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-3 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSendMessage}
          disabled={isSending}
          className={`p-2 rounded-full ${isSending ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
        >
          {isSending ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : (
            <i className="bi bi-send"></i>
          )}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
            <div className="flex justify-between items-center p-3 border-b border-gray-300">
              <h5 className="font-semibold">Preview</h5>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {file?.type.startsWith("image") ? (
                <img src={preview} alt="Preview" className="w-full rounded" />
              ) : (
                <video src={preview} controls className="w-full rounded" />
              )}
            </div>
            <div className="flex justify-end gap-2 p-3 border-t border-gray-300">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                onClick={async () => {
                  await handleSendMessage();
                  setShowModal(false);
                }}
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
