import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Loader2Icon, Sparkles, X } from "lucide-react";

type Props = {
  position: { x: number; y: number } | null;
  onClose: () => void;
  handleAiChange: any;
  loading: boolean;
};

function FloatingActionTool({
  position,
  onClose,
  handleAiChange,
  loading,
}: Props) {
  const [userAiPrompt, setUserAiPrompt] = useState<string>();
  if (!position) return;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (userAiPrompt) {
      handleAiChange(userAiPrompt);
      setUserAiPrompt("");
    }
  };

  return (
    <div
      className="absolute z-50 bg-white text-sm px-3 py-2 rounded-lg shadow-xl border flex pointer-events-auto"
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: "translate(-50%, 0)", // Center horizontally
      }}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Sparkles className="h-4 w-4" />
        <input
          type="text"
          placeholder="Edit with Ai"
          className="outline-none border-none min-w-[150px]"
          onChange={(e) => setUserAiPrompt(e.target.value)}
          disabled={loading}
          value={userAiPrompt || ""}
        />
        {userAiPrompt && (
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            type="submit" // Make it a submit button
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
        {loading && <Loader2Icon className="animate-spin" />}
      </form>

      <Button variant={"ghost"} size={"icon-sm"} onClick={onClose}>
        <X />
      </Button>
    </div>
  );
}

export default FloatingActionTool;
