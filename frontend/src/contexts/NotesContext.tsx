import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type Note } from "@/types/note";

type NotesContextType = {
  // State
  notes: Note[];

  // Lifecycle methods
  fetchNotes: () => Promise<void>;
  createNote: () => string;
  updateNote: (id: string, patch: Partial<Note>) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
    g;
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:4000/notes");
    const { noteList } = await response.json();
    setNotes(noteList);
    setIsLoading(false);
  };

  const createNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Generating note...",
      body: "",
      created_at: new Date().toISOString(),
      duration: 0,
      tags: [],
      is_favourite: false,
      status: "uploading",
    };

    setNotes((prev) => [newNote, ...prev]);
    return newNote.id;
  };

  const updateNote = (id: string, patch: Partial<Note>) => {
    // console.log("📝 updateNote called with:", { id, patch });
    setNotes((prev) => {
      const updated = prev.map((note) =>
        note.id === id ? { ...note, ...patch } : note
      );
      //   console.log("📝 Notes after update:", updated);
      return updated;
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{ notes, createNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
