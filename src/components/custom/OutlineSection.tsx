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
    <div className="mt-8">
      <h2 className="font-bold text-3xl text-foreground mb-4 flex items-center gap-2">
        <span className="bg-primary w-1 h-6 rounded-full"></span>
        <span>Slide Outline</span>
      </h2>
      {loading && (
        <div>
          {[1, 2, 3, 4].map((item, index) => (
            <Skeleton
              key={index}
              className="h-[70px] w-full rounded-2xl mb-4 "
            />
          ))}
        </div>
      )}

      <div className="mb-24">
        {outline?.map((item, index) => (
          <div
            key={index}
            className="max-w-3xl w-full p-4 rounded-2xl flex gap-6 items-center border border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-300 mt-4"
          >
            <h2 className="font-bold text-2xl p-4 bg-primary/10 text-primary rounded-xl min-w-[60px] text-center">
              {item.slideNo}
            </h2>
            <div className="flex gap-6 items-center justify-between flex-grow">
              <div className="flex-1">
                <h2 className="font-bold text-lg text-foreground mb-1">
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
