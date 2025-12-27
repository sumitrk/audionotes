import NotesLayout from "./NotesLayout";
import EmptyState from "./EmptyState";
import Sidebar from "./Sidebar";
import { useNotes } from "@/contexts/NotesContext";
import { useRecording } from "@/contexts/RecordingContext";
import { motion, AnimatePresence } from "motion/react";
import RecordingBar from "../RecordingBar";

function PageLayout() {
  const { status } = useRecording();
  const { notes } = useNotes();
  return (
    <div className="grid grid-cols-[auto_1fr] bg-stone-100 w-screen h-screen">
      <AnimatePresence>
        {status === "recording" && (
          <motion.div
            className="w-full h-full bg-stone-900/30 absolute z-1"
            key="fade-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          ></motion.div>
        )}
      </AnimatePresence>
      <Sidebar />
      {!notes.length ? <EmptyState /> : <NotesLayout />}

      <RecordingBar />
    </div>
  );
}

export default PageLayout;
