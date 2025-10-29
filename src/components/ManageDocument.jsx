import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import api from "./api";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Export,
} from "devextreme-react/data-grid";
import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

function ManageDocument() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" or "preview"
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentContent, setDocumentContent] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get(import.meta.env.VITE_API_CUSTOM_USERS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      });
      const filteredUsers = response?.data?.filter(
        (user) => user.role === "employee" || user.role === "hr"
      );
      setUsers(filteredUsers);
      // toast.success("Users loaded successfully!");
    } catch (error) {
      toast.error("Failed to fetch users!");
    }
  };

  const handleEdit = (user, documentType) => {
    fetchDocumentData(user.id, documentType, "edit");
  };

  const handlePreview = (user, documentType) => {
    fetchDocumentData(user.id, documentType, "preview");
  };

  const handleDownload = (userId, documentType) => {
    api
      .get(`${import.meta.env.VITE_API_LETTER}/${userId}/${documentType}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      })
      .then((response) => {
        const doc = new jsPDF();
        doc.text(20, 20, response.data);
        doc.save(`${documentType}.pdf`);
        toast.success(`${documentType} downloaded successfully!`);
      })
      .catch((error) => {
        toast.error("Failed to download document!");
        console.error("Error downloading document:", error);
      });
  };

  const handleDelete = (userId, documentType) => {
    api
      .delete(`${import.meta.env.VITE_API_LETTER}/${userId}/${documentType}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      })
      .then(() => {
        toast.success(`${documentType} deleted successfully!`);
        fetchUsers(); // Refresh list
      })
      .catch((error) => {
        toast.error("Failed to delete document!");
      });
  };

  const fetchDocumentData = async (userId, documentType, actionType) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_LETTER}/${userId}/${documentType}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      setSelectedDocument({ userId, documentType });
      setDocumentContent(response.data || "");
      setModalType(actionType);
      setShowModal(true);
      toast.success(`${documentType} loaded successfully!`);
    } catch (error) {
      toast.error("Failed to fetch document data!");
      console.error("Error fetching document data:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (
      !selectedDocument ||
      !selectedDocument.userId ||
      !selectedDocument.documentType ||
      !documentContent
    ) {
      toast.error("Missing data, cannot update document!");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_LETTER}/${
        selectedDocument.userId
      }/${selectedDocument.documentType}`;

      await api.put(
        url,
        { content: documentContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`${selectedDocument.documentType} updated successfully!`);
      fetchUsers();
      closeModal();
    } catch (error) {
      toast.error("Failed to update document!");
      console.error("Error updating document:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
    setDocumentContent("");
  };

  return (
   <div className="pt-4 px-2">
  {/* Header */}
  <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
    <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftCircle size={32} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Back</span>
        </button>

    <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Manage Document</h3>

      <Link to="/offer-letter">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-700 transition">
          Add Offer
        </button>
      </Link>
      <Link to="/experience-letter">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          Add Experience
        </button>
      </Link>
      <Link to="/noc-letter">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition">
          Add NOC
        </button>
      </Link>
  </div>

  {/* DataGrid Table */}
  <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3">
    <DataGrid
      dataSource={users}
      keyExpr="id"
      showBorders={true}
      rowAlternationEnabled={true}
      className="shadow-sm rounded"
      height="auto"
      columnAutoWidth={true}
      wordWrapEnabled={true}
      columnHidingEnabled={true}
    >
      <SearchPanel visible={true} placeholder="Search..." />
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Paging defaultPageSize={20} />

      <Column
        caption="#"
        width={50}
        cellRender={({ rowIndex }) => rowIndex + 1}
      />
      <Column dataField="id" caption="ID" />
      <Column dataField="username" caption="Name" />
      <Column dataField="role" caption="Role" />

      <Column
        caption="Offer Letter"
        cellRender={({ data }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-yellow-500 hover:text-yellow-600"
              onClick={() => handleEdit(data, "offer_letter")}
              title="Edit"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="text-blue-500 hover:text-blue-600"
              onClick={() => handlePreview(data, "offer_letter")}
              title="Preview"
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              className="text-red-600 hover:text-red-700"
              onClick={() => handleDelete(data.id, "offer_letter")}
              title="Delete"
            >
              <i className="bi bi-trash"></i>
            </button>
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handleDownload(data.id, "offer_letter")}
            >
              Download
            </button>
          </div>
        )}
      />

      <Column
        caption="Experience Letter"
        cellRender={({ data }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-yellow-500 hover:text-yellow-600"
              onClick={() => handleEdit(data, "experience_letter")}
              title="Edit"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="text-blue-500 hover:text-blue-600"
              onClick={() => handlePreview(data, "experience_letter")}
              title="Preview"
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              className="text-red-600 hover:text-red-700"
              onClick={() => handleDelete(data.id, "experience_letter")}
              title="Delete"
            >
              <i className="bi bi-trash"></i>
            </button>
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handleDownload(data.id, "experience_letter")}
            >
              Download
            </button>
          </div>
        )}
      />

      <Column
        caption="NOC"
        cellRender={({ data }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-yellow-500 hover:text-yellow-600"
              onClick={() => handleEdit(data, "noc")}
              title="Edit"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="text-blue-500 hover:text-blue-600"
              onClick={() => handlePreview(data, "noc")}
              title="Preview"
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              className="text-red-600 hover:text-red-700"
              onClick={() => handleDelete(data.id, "noc")}
              title="Delete"
            >
              <i className="bi bi-trash"></i>
            </button>
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handleDownload(data.id, "noc")}
            >
              Download
            </button>
          </div>
        )}
      />
    </DataGrid>
  </div>

  {/* Modal */}
  <Modal show={showModal} onHide={closeModal} size="lg">
    <Modal.Header closeButton className="bg-gray-100">
      <Modal.Title className="font-semibold">
        {modalType === "edit" ? "Edit Document" : "Preview Document"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {modalType === "edit" ? (
        <textarea
          rows={20}
          value={documentContent}
          onChange={(e) => setDocumentContent(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
      ) : (
        <pre className="whitespace-pre-wrap">{documentContent}</pre>
      )}
    </Modal.Body>
    <Modal.Footer className="space-x-2">
      <button
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={closeModal}
      >
        Close
      </button>
      {modalType === "edit" && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      )}
    </Modal.Footer>
  </Modal>
</div>

  );
}

export default ManageDocument;
