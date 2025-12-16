import type {Note} from '../../types/note'
import { HugeiconsIcon } from '@hugeicons/react'
import {PlayIcon} from '../Icons'

interface NotecardPropos {
    note: Note
}

function NoteCard({note}: NotecardPropos) {
  return (
    <>
    <div className='flex flex-col gap-2 p-4 border border-stone-200 rounded-2xl bg-white basis-1/2'>
        {/* Created at, Play audio */}
        <div className='flex flex-row justify-between items-center'>
            <div className='text-sm text-stone-300 font-medium'>{note.createdAt}</div>
            <div className='px-1.5 py-1 bg-stone-100 rounded-full flex flex-row items-center gap-.5'>
                <HugeiconsIcon icon={PlayIcon} className='w-3 h-3 text-stone-700' />
                <div className='text-stone-700 text-xs font-medium'>
                {note.durationSections}
                </div>
            </div>
        </div>

        {/* Header & Content */}
        <div className='flex flex-col gap-1'>
            <div className='text-lg font-semibold text-stone-900'>{note.title}</div>
            <div className='text-sm text-stone-600'>{note.body}</div>   
        </div>
    </div>
    </>
  )
}

export default NoteCard