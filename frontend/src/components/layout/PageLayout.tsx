import NotesLayout from "./NotesLayout"
import Sidebar from "./Sidebar"


function PageLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] bg-stone-100 w-screen h-screen">
        <Sidebar />
        <NotesLayout />
    </div>
  )
}

export default PageLayout