import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LoaderSpiner from "./LoaderSpiner";
import api from './api';
import { ArrowLeftCircle } from 'lucide-react';
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";

function EmDocuments() {
  const [documents, setDocuments] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchDocuments();
  }, []);

  const userId = localStorage.getItem('user_id');

  const fetchDocuments = async () => {
    setIsLoading(true);
    
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_LETTER}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      }
    );
    setDocuments(response.data);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      setStatus("You do not have permission to view these documents.");
    } else {
      toast.info(`No document Available`);
    }
  } finally {
    setIsLoading(false);
  }
};
function transformDocuments(documents) {
  let transformed = [];
  documents.forEach((doc, index) => {
    if (doc.offer_letter) {
      transformed.push({
        id: `${index}-offer`,
        file_name: "Offer Letter",
        description: "Offer of Employment for the position.",
        file_url: doc.offer_letter,
      });
    }
    if (doc.experience_letter) {
      transformed.push({
        id: `${index}-experience`,
        file_name: "Experience Letter",
        description: "Experience letter details.",
        file_url: doc.experience_letter,
      });
    }
    if (doc.noc) {
      transformed.push({
        id: `${index}-noc`,
        file_name: "NOC",
        description: "No Objection Certificate details.",
        file_url: doc.noc,
      });
    }
  });
  return transformed;
}


  return (
    <div className="pt-4 px-2">
  <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
    <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftCircle size={32} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Back</span>
        </button>
    <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Employee Documents</h3>
  </div>

  <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3 relative">
    <DataGrid
      dataSource={isLoading ? [] : transformDocuments(documents)}
      keyExpr="id"
      showBorders={true}
      rowAlternationEnabled={true}
      className="shadow-sm rounded table-grid-2 table-grid w-100"
      height="auto"
      columnAutoWidth={true}
      wordWrapEnabled={true}
      columnHidingEnabled={true}
    >
      <SearchPanel visible={true} placeholder="Search documents..." />
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Paging defaultPageSize={10} />

      <Column dataField="file_name" caption="File Name" />
      <Column dataField="description" caption="Description" />
      <Column
        caption="Download"
        cellRender={({ data }) => (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            onClick={() => handleDownload(data.file_url, data.file_name)}
          >
            Download
          </button>
        )}
      />
    </DataGrid>

    {isLoading && (
      <div className="flex justify-center items-center h-48">
        <LoaderSpiner />
      </div>
    )}

    {!isLoading && documents.length === 0 && (
      <p className="text-center text-gray-500 mt-4">No document available</p>
    )}
  </div>
</div>

  );

  function handleDownload(content, fileName) {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.txt`;
    document.body.appendChild(element);
    element.click();
  }
}

export default EmDocuments;
