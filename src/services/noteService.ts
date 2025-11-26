import axios from "axios";
import type { Note } from "../types/note";
const BASE_URL = "https://notehub-public.goit.study/api/notes";
export interface FetchNotesResponse {
  page: number;
  notes: Note[];
  totalPages: number;
  // total_results: number;
}

export async function fetchNotes(
  search: string,
  page: number
): Promise<FetchNotesResponse> {
  // search: string
  // page: number
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}`, {
    params: {
      search,
      // include_adult: false,
      // language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);

  return response.data;
}
