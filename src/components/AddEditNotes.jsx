import { X } from "lucide-react";
import useAddEditNote from "../hooks/useAddEditNote";
import ColorButtons from "./NoteColorBtns";
import { useGetKeyQuery } from "../api/endpoints/privateNoteEndpoints";

const AddEditNotes = ({ onClose, type, noteData }) => {
  const {
    title,
    content,
    handleNote,
    onChange,
    handleNoteColor,
    isLoading,
    editLoading,
    handlePrivateNote,
    isEncrypted,
  } = useAddEditNote({
    type,
    onClose,
    noteData,
  });

  const { data } = useGetKeyQuery();

  return (
    <div className="relative rounded-lg shadow-xl p-5  mx-auto !z-50">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Form Header */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        {type === "edit" ? "Edit Note" : "Add Note"}
      </h2>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Title
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded-md text-sm focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Enter title"
          value={title}
          name="title"
          onChange={onChange}
        />
      </div>

      {/* Content Textarea */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Content
        </label>
        <textarea
          className="w-full p-2 border rounded-md text-sm focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Enter content"
          rows={4}
          name="content"
          value={content}
          onChange={onChange}
        />
      </div>

      {/* Color Buttons */}
      <ColorButtons handleNoteColor={handleNoteColor} />

      {/* Private Note Option (Only for Adding Notes) */}
      {type === "add" && data?.success && (
        <div className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            checked={isEncrypted}
            onChange={handlePrivateNote}
            className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring focus:ring-blue-300"
          />
          <label className="text-sm font-medium text-gray-600">
            Create as Private Note
          </label>
        </div>
      )}

      {/* Submit Button */}
      <button
        className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
        onClick={handleNote}
        disabled={isLoading || editLoading}
      >
        {isLoading || editLoading
          ? "Processing..."
          : type === "edit"
          ? "Update Note"
          : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;
