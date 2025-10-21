import React from "react";
import { Skeleton } from "../ui/skeleton";
import { type Outline } from "@/workspace/project/outline/index";
import { ArrowRight, Edit, Ghost } from "lucide-react";
import { Button } from "../ui/button";
import EditOutlineDialog from "@/assets/EditOutlineDialog";
type Props = {
  loading: boolean;
  outline: Outline[];
  handleUpdateOutline: any,
};

function OutlineSection({ loading, outline, handleUpdateOutline }: Props) {



  return (
    <div className="mt-7">
      <h2 className="font-medium text-xl">Slider Outline</h2>
      {loading && (
        <div>
          {[1, 2, 3, 4].map((item, index) => (
            <Skeleton
              key={index}
              className="h-[60px] w-full rounded-2xl mb-4 "
            />
          ))}
        </div>
      )}

      <div className="mb-24">
        {outline?.map((item, index) => (
          <div
            key={index}
            className="max-w-3xl w-full p-3 rounded-2xl flex gap-6 items-center border mt-5 px-4"
          >
            <h2 className="font-bold text-2xl p-5 bg-gray-200 rounded-xl">
              {item.slideNo}
            </h2>
            <div className="flex gap-6 items-center justify-between">
              <div>
                <h2 className="font-bold">{item.slidePoint}</h2>
                <p>{item.outline}</p>
              </div>
            </div>
            <EditOutlineDialog outlineData={item} onUpdate={handleUpdateOutline}>
              <Button variant={"ghost"} size={"icon-lg"}><Edit /></Button>
            </EditOutlineDialog>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default OutlineSection;
