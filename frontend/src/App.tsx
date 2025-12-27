import "./App.css";
import { RecordingProvider } from "./contexts/RecordingContext";
import { NotesProvider } from "./contexts/NotesContext";
import PageLayout from "./components/layout/PageLayout";

function App() {
  return (
    <NotesProvider>
      <RecordingProvider>
        <PageLayout />
      </RecordingProvider>
    </NotesProvider>
  );
}

export default App;
