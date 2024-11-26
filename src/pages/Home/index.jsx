import { useGetNotesQuery } from "../../api/endpoints/noteEndPoints";
import NoteCardLayout from "../../components/NoteCardLayout";

const Home = () => {
  const { data, isLoading } = useGetNotesQuery();

  return <NoteCardLayout data={data} isLoading={isLoading} />;
};

export default Home;
