import type { Note } from "../../types/note"
import NoteCard from "../notes/NoteCard"
import RecordingBar from "../RecordingBar"
import GenerateNoteCard from "../notes/GenerateNoteCard"

const note : Note = {
    id: 1,
    title: 'Note 1',
    body: "Nice. So it generated audio mount of my app and it truncated the text. We'll play around with the UI. We can also see, firstly, how the layout works and how the recording feature works and all that. And, yeah, just check. Whatever. Maybe I'll create a roadmap of stuff.",
    createdAt: '2021-01-01',
    durationSections: 23,
    tags: ['tag1', 'tag2'],
    isFavourite: false,
    status: 'ready'
}

const note2 : Note = {
  id: 1,
  title: 'Note 1',
  body: "Nice. We'll play around with the UI. We can also see, firstly, how the layout works and how the recording feature works and all that. And, yeah, just check. Whatever. Maybe I'll create a roadmap of stuff.",
  createdAt: '2021-01-01',
  durationSections: 23,
  tags: ['tag1', 'tag2'],
  isFavourite: false,
  status: 'ready'
}


function  NotesLayout() {
  return (
    <div className="p-3 h-full overflow-auto"> 
    {/* Notes container with header */}
        <div className="flex flex-col gap-3 border border-stone-200 rounded-lg bg-stone-50 h-full overflow-auto">
            <div className="font-phudu text-2xl font-semibold p-6 pb-2 bg-stone-50 sticky top-0">
                Your Notes
            </div>
            {/* Notes Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-[240px] gap-2 p-6 pt-4">
              <NoteCard note={note} />
              <NoteCard note={note2} />
              <NoteCard note={note} />
              <NoteCard note={note} />
              <GenerateNoteCard />
              
            </div>

        </div>
        {/* Recording bar */}
        <RecordingBar />
    
    
    

    </div>
  )
}

export default  NotesLayout