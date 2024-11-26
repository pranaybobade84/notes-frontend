import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useAddToEncryptionMutation,
  useDeleteNoteMutation,
  useEditPinNoteMutation,
} from "../api/endpoints/noteEndPoints";

const useNoteActions = (initialPinStatus, noteId) => {
  const [
    deleteNote,
    {
      data: deleteData,
      isSuccess: deleteSuccess,
      isError: deleteError,
      error: deleteApiErr,
    },
  ] = useDeleteNoteMutation();

  const [
    handleEncryption,
    {
      data: encData,
      isSuccess: encSuccess,
      isError: encIsError,
      error: encApiErr,
    },
  ] = useAddToEncryptionMutation();

  const [
    togglePin,
    {
      data: pinData,
      isSuccess: pinSuccess,
      isError: pinError,
      error: pinApiError,
    },
  ] = useEditPinNoteMutation();

  const handleToast = (isSuccess, successMessage, isError, errorMessage) => {
    if (isSuccess) toast.success(successMessage);
    if (isError) toast.error(errorMessage);
  };

  const handleDelete = async () => {
    try {
      await deleteNote({ id: noteId }).unwrap();
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Error while deleting note");
    }
  };

  const handlePinToggle = async () => {
    try {
      await togglePin({ id: noteId, pinStatus: !initialPinStatus }).unwrap();
    } catch (err) {
      console.error("Pin Toggle Error:", err);
      toast.error("Error while pinning note");
    }
  };

  const handleOnEncryption = async (status) => {
    try {
      console.log("Status", status);
      await handleEncryption({ id: noteId, isEncrypted: status }).unwrap();
    } catch (err) {
      console.error("Encryption Error:", err);
      toast.error(err?.data?.message || "Error while encrypting note");
    }
  };

  useEffect(() => {
    handleToast(
      deleteSuccess,
      deleteData?.message,
      deleteError,
      deleteApiErr?.data?.message
    );
  }, [deleteSuccess, deleteError, deleteData, deleteApiErr]);

  useEffect(() => {
    handleToast(
      pinSuccess,
      pinData?.message,
      pinError,
      pinApiError?.data?.message
    );
  }, [pinSuccess, pinError, pinData, pinApiError]);

  useEffect(() => {
    handleToast(
      encSuccess,
      encData?.message,
      encIsError,
      encApiErr?.data?.message
    );
  }, [encSuccess, encIsError, encData, encApiErr]);

  return { handleDelete, handlePinToggle, handleOnEncryption };
};

export default useNoteActions;
