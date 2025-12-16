import {StarIcon, Folder01Icon, Home01Icon, VoiceIcon } from '../Icons'
import { HugeiconsIcon } from '@hugeicons/react'

function Sidebar() {
  return (
    <div className="flex flex-col w-14 pt-8 gap-8 items-center">
        <div>
            <HugeiconsIcon icon={VoiceIcon} className='text-stone-950 w-7 h-7' />
        </div>
       <div className='flex flex-col gap-2'>
           <div className='p-2 rounded-md bg-lime-200 hover:bg-lime-300'>
                <HugeiconsIcon icon={Home01Icon} className='text-lime-600 w-5 h-5' />
           </div>
           <div className='p-2 rounded-md hover:bg-stone-200'>
                <HugeiconsIcon icon={StarIcon} className='text-stone-600 w-5 h-5' />
           </div>
           <div className='p-2 rounded-md hover:bg-stone-200'>
                <HugeiconsIcon icon={Folder01Icon} className='text-stone-600 w-5 h-5' />
           </div>
       </div>
    </div>
  )
}

export default Sidebar