import React, { useContext, useEffect } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import { WebSocketContext } from "./WebSocketContext";
import "./ChatWindow.css";

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

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Close context menu when clicking outside
  // inside useEffect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu.visible) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };

    const handleScroll = () => {
      if (contextMenu.visible) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [contextMenu, setContextMenu]);


  if (!selectedUser) {
    return (
      <div className="chat-empty">
        Please select a user to start chatting.
      </div>
    );
  }

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        {onBack && (
          <button
            className="btn  d-md-none"
            onClick={onBack}
          >
            ←
          </button>
        )}
        <img src={profileImage} alt="profile" className="chat-profile-img" />
        <div>
          <h5 className="mb-0">{selectedUser.username}</h5>
          {online === "online" ? (
            <span className="chat-status-online">Online</span>
          ) : (
            <span className="chat-status-offline">{lastSeen}</span>
          )}
        </div>
      </div>

      {/* Messages Box */}
      <Container className="chat-box" ref={chatBoxRef}>
        {isLoading && (
          <div className="chat-loading">
            <Spinner size="sm" /> Loading messages...
          </div>
        )}

        {messages.length === 0 ? (
          <div className="text-center text-muted">
            <h6>No messages yet</h6>
            <p>Start the conversation by sending a message!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isSender = msg.sender_id === String(userId);
            const messageTime = new Date(msg.timestamp).toLocaleTimeString(
              "en-US",
              { hour: "2-digit", minute: "2-digit" }
            );
            const messageDate = new Date(
              msg.timestamp
            ).toLocaleDateString("en-US");
            const previousMessageDate =
              index > 0
                ? new Date(
                  messages[index - 1].timestamp
                ).toLocaleDateString("en-US")
                : null;

            return (
              <React.Fragment key={msg.id}>
                {messageDate !== previousMessageDate && (
                  <Row className="justify-content-center">
                    <Col xs="auto">
                      <div className="chat-date-separator">{messageDate}</div>
                    </Col>
                  </Row>
                )}

                <Row
                  className={`my-1 ${isSender ? "justify-content-end" : "justify-content-start"
                    }`}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    const posX = e.clientX + window.scrollX;
                    const posY = e.clientY + window.scrollY;

                    setContextMenu({
                      visible: true,
                      x: posX,
                      y: posY,
                      messageId: msg.id,
                    });
                  }}
                >
                  <Col xs="auto">
                    {/* Media */}
                    {msg.base64_image_data &&
                      (msg.media_type === "image" ? (
                        <img
                          src={`data:image/jpeg;base64,${msg.base64_image_data}`}
                          alt="Media"
                          className="chat-media"
                        />
                      ) : (
                        <video controls className="chat-media">
                          <source
                            src={`data:video/mp4;base64,${msg.base64_image_data}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      ))}

                    {/* Editable or Normal Message */}
                    {editingMessageId === msg.id && isSender ? (
                      <input
                        type="text"
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        onBlur={() => handleEditMessage(msg.id)}
                        autoFocus
                        className="chat-edit-input"
                      />
                    ) : (
                      <div
                        className={`chat-message ${isSender
                          ? "chat-message-sent"
                          : "chat-message-received"
                          }`}
                      >
                        {msg.message === "This message was deleted" ? (
                          <i key={msg.id}>{msg.message}</i>
                        ) : (
                          <div key={msg.id}>{msg.message}</div>
                        )}

                        <i className="chat-time">{messageTime}</i>

                        {isSender &&
                          (msg.read_status === "1" ? (
                            <i className="bi bi-check2-all text-primary ms-2"></i>
                          ) : (
                            msg.read_status === "0" && (
                              <i className="bi bi-check ms-2"></i>
                            )
                          ))}
                      </div>
                    )}
                  </Col>
                </Row>
              </React.Fragment>
            );
          })
        )}

        {/* Context Menu */}
        {contextMenu.visible && (
          <div
            className="chat-context-menu"
            style={{
              top: `${contextMenu.y}px`,
              left: `${contextMenu.x}px`,
            }}
          >
            <div
              className="chat-context-item"
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
              className="chat-context-item text-danger"
              onClick={() => {
                handleDeleteMessage(contextMenu.messageId);
                setContextMenu({ ...contextMenu, visible: false });
              }}
            >
              Delete
            </div>
          </div>
        )}

      </Container>

      {/* Input Area */}
      <Form className="chat-input-area">
        {showEmojiPicker && (
          <div className="chat-emoji-picker">
            <EmojiPicker
              onEmojiClick={(emoji) =>
                setNewMessage((prev) => prev + emoji.emoji)
              }
            />
          </div>
        )}

        <Button
          type="button"
          variant="light"
          className="emoji-btn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊
        </Button>

        <i
          className="bi bi-paperclip chat-attach-icon"
          onClick={() => document.getElementById("fileInputmedia").click()}
        />
        <input
          id="fileInputmedia"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          hidden
        />

        <Form.Group controlId="newMessage" className="w-100 ms-2">
          <Form.Control
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
        </Form.Group>

        <Button
          variant="danger"
          className="send-btn"
          onClick={handleSendMessage}
          disabled={isSending}
        >
          {isSending ? <Spinner size="sm" animation="border" /> : <i className="bi bi-send"></i>}
        </Button>
      </Form>

      {/* File Preview Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {file?.type.startsWith("image") ? (
            <img src={preview} alt="Preview" className="chat-preview-img" />
          ) : (
            <video src={preview} controls className="chat-preview-video" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await handleSendMessage();
              setShowModal(false);
            }}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChatWindow;
