import { fetchNotes } from "../../services/noteService";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });
  return <></>;
}

export default App;
