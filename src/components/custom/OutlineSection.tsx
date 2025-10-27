import { Skeleton } from "../ui/skeleton";
import { type Outline } from "@/workspace/project/outline/index";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import EditOutlineDialog from "@/assets/EditOutlineDialog";
type Props = {
  loading: boolean;
  outline: Outline[];
  handleUpdateOutline: any;
  editable?: boolean; // Added editable prop
};

function OutlineSection({
  loading,
  outline,
  handleUpdateOutline,
  editable = true,
}: Props) {
  // Added editable to destructuring with default value

  return (
    <div className="mt-8 px-4">
      <h2 className="font-bold text-2xl sm:text-3xl text-foreground mb-4 flex items-center gap-2">
        <span className="bg-primary w-1 h-6 rounded-full"></span>
        <span>Slide Outline</span>
      </h2>
      {loading && (
        <div>
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton
              key={index}
              className="h-[70px] w-full rounded-2xl mb-4 bg-accent/30 animate-pulse"
            />
          ))}
        </div>
      )}

      <div className="mb-24">
        {outline?.map((item, index) => (
          <div
            key={index}
            className="w-full p-4 rounded-2xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center border border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-300 mt-4"
          >
            <h2 className="font-bold text-xl sm:text-2xl p-3 sm:p-4 bg-primary/10 text-primary rounded-xl min-w-[40px] sm:min-w-[60px] text-center">
              {item.slideNo}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between flex-grow">
              <div className="flex-1">
                <h2 className="font-bold text-lg sm:text-xl text-foreground mb-1">
                  {item.slidePoint}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.outline}
                </p>
              </div>
            </div>
            {editable && ( // Conditionally render the edit button
              <EditOutlineDialog
                outlineData={item}
                onUpdate={handleUpdateOutline}
              >
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Edit className="h-5 w-5" />
                </Button>
              </EditOutlineDialog>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OutlineSection;
