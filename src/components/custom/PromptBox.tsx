import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { ArrowUp, Loader2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

function PromptBox() {
  const [userInput, setUserInput] = useState<string>("");
  const [noOfSlider, setNoOfSlider] = useState<string>("4 to 6");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const CreateandSaveProject = async () => {
    //save proj to db
    const projectId = uuidv4();
    setLoading(true);
    await setDoc(doc(firebaseDb, "projects", projectId), {
      projectId: projectId,
      userInputPrompt: userInput,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: Date.now(),
      noOfSlider: noOfSlider,
    });
    setLoading(false);
    navigate("/workspace/project/" + projectId + "/outline");
  };
  return (
    <div className="w-full flex items-center justify-center mt-16 px-4 sm:mt-28">
      <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-2xl">
        <h2 className="font-bold text-3xl sm:text-4xl">
          Describe any topic, we'll design the{" "}
          <span className="text-primary">PPT</span> slides!
        </h2>
        <p className="text-lg sm:text-xl text-gray-500">
          Your design will be saved in new project
        </p>

        <InputGroup>
          <InputGroupTextarea
            className="min-h-32"
            placeholder="Enter what kind of slide you want to create?"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <InputGroupAddon align={"block-end"}>
            <Select onValueChange={(value) => setNoOfSlider(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select no of slides" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>No of Slides</SelectLabel>
                  <SelectItem value="4 to 6">4-6 Sliders</SelectItem>
                  <SelectItem value="6 to 8">6-8 Sliders</SelectItem>
                  <SelectItem value="8 to 10">8-10 Sliders</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <InputGroupButton
              variant={"default"}
              className="rounded-full ml-auto"
              size={"icon-sm"}
              onClick={() => CreateandSaveProject()}
              disabled={!userInput}
            >
              {loading ? <Loader2Icon className="animate-spin" /> : <ArrowUp />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}

export default PromptBox;
