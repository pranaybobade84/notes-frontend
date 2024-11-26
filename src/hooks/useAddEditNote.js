import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useAddNoteMutation,
  useEditNoteMutation,
} from "../api/endpoints/noteEndPoints";

const useAddEditNote = ({ type, noteData, onClose }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    title: noteData?.title || "",
    content: noteData?.content || "",
    noteColor: noteData?.noteColor || "#ffffff",
    isEncrypted: noteData?.isEncrypted || false,
  });

  const { title, content, noteColor, isEncrypted } = formData;

  // RTK Query Mutations
  const [
    addNote,
    {
      isSuccess: addSuccess,
      isError: addError,
      data: addData,
      error: addApiError,
      isLoading: addLoading,
    },
  ] = useAddNoteMutation();

  const [
    editNote,
    {
      isSuccess: editSuccess,
      isError: editError,
      data: editData,
      error: editApiError,
      isLoading: editLoading,
    },
  ] = useEditNoteMutation();

  // Shared state updater for inputs
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update note color
  const handleNoteColor = (style) => {
    setFormData((prev) => ({
      ...prev,
      noteColor: style?.bg,
    }));
  };

  // Toggle private note encryption
  const handlePrivateNote = (e) => {
    setFormData((prev) => ({
      ...prev,
      isEncrypted: e.target.checked,
    }));
  };

  // Add or Edit Note Handler
  const handleNote = async () => {
    if (!title || !content) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (type === "add") {
        await addNote(formData).unwrap();
      } else if (type === "edit") {
        await editNote({
          id: noteData?._id,
          title,
          content,
          noteColor,
        }).unwrap();
      }
    } catch (err) {
      toast.error("Error while saving note");
      console.error(err); // Log the error for debugging
    }
  };

  // Shared toast handler
  const handleToast = (isSuccess, successMessage, isError, errorMessage) => {
    if (isSuccess) {
      toast.success(successMessage);
      setFormData({
        title: "",
        content: "",
        noteColor: "#ffffff",
        isEncrypted: false,
      }); // Reset form
      onClose(); // Close the modal or form
    }
    if (isError) {
      toast.error(errorMessage);
    }
  };

  // Handle success and error for addNote
  useEffect(() => {
    if (type === "add") {
      handleToast(
        addSuccess,
        addData?.message,
        addError,
        addApiError?.data?.message
      );
    }
  }, [addSuccess, addError, addData, addApiError, type]);

  // Handle success and error for editNote
  useEffect(() => {
    if (type === "edit") {
      handleToast(
        editSuccess,
        editData?.message,
        editError,
        editApiError?.data?.message
      );
    }
  }, [editSuccess, editError, editData, editApiError, type]);

  // Return actions and states
  return {
    onChange,
    handleNote,
    title,
    content,
    handleNoteColor,
    noteColor,
    isLoading: addLoading || editLoading,
    handlePrivateNote,
    isEncrypted,
  };
};

export default useAddEditNote;
