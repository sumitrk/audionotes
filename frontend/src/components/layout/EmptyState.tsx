import { Home01Icon } from "../Icons";
import { HugeiconsIcon } from "@hugeicons/react";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col gap-6 items-center ">
        <HugeiconsIcon icon={Home01Icon} className="text-stone-300 w-16 h-16" />
        <div className="flex flex-col">
          <div className="text-center text-lg font-medium">
            No notes added yet
          </div>
          <div className="text-center text-stone-500 text-md font-regular">
            Record a note to see it here
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
