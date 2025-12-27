import NoteCard from "../notes/NoteCard";
import NoteSkeleton from "../notes/NoteSkeleton";
import { useNotes } from "@/contexts/NotesContext";

function NotesLayout() {
  const { notes } = useNotes();

  return (
    <div className="p-3 h-full overflow-auto">
      {/* Notes container with header */}
      <div className="flex flex-col gap-3 border border-stone-200 rounded-lg bg-stone-50 h-full overflow-auto">
        <div className="font-phudu text-2xl font-semibold p-6 pb-2 bg-stone-50 sticky top-0">
          Your Notes
        </div>
        {/* Notes Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-[240px] gap-2 p-6 pt-4">
          {!notes.length && <NoteSkeleton />}
          {notes.length > 0 &&
            notes.map((note) =>
              note.status === "ready" ? (
                <NoteCard key={note.id} note={note} />
              ) : (
                <NoteSkeleton key={note.id} />
              )
            )}
        </div>
      </div>
    </div>
  );
}

export default NotesLayout;
