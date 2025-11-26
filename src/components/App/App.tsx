import css from "./App.module.css";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.value);
  //   setSearch(event.target.value);
  // };
  const { data, isLoading } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page),
  });
  const debounceSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      setPage(1);
    },
    300
  );
  const totalPages = data?.totalPages ?? 0;
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox search={search} onChange={debounceSearch} />
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
          <button className={css.button}>Create note +</button>
        </header>
        {isLoading && <p>Loading notes...</p>}
        {data && !isLoading && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}

export default App;
