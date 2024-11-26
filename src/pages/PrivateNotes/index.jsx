import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteCardLayout from "../../components/NoteCardLayout";
import { useGetPrivateNoteQuery } from "../../api/endpoints/noteEndPoints";
import { useSelector } from "react-redux";

const PrivateNotes = () => {
  const { data, isLoading } = useGetPrivateNoteQuery();

  const { isVerified } = useSelector((store) => store.privateKey);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isVerified) {
      navigate("/settings/verify-key");
    }
  }, [navigate, isVerified]);
  return <NoteCardLayout data={data} isLoading={isLoading} />;
};

export default PrivateNotes;
