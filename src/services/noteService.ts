import axios from "axios";
import type { Note } from "../types/note";
const BASE_URL = "https://notehub-public.goit.study/api/notes";
export interface FetchNotesResponse {
  // page: number;
  results: Note[];
  // total_pages: number;
  // total_results: number;
}

export async function fetchNotes(): Promise<FetchNotesResponse> {
  // search: string
  // page: number
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}`, {
    params: {
      // search,
      // include_adult: false,
      // language: "en-US",
      // page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);

  return response.data;
}
