import OutlineSection from "@/components/custom/OutlineSection";
import SliderStyle, { type DesignStyle } from "@/components/custom/SliderStyle";
import { firebaseDb } from "@/config/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GeminiAiModel } from "@/config/firebaseConfig";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";


const OUTLINE_PROMPT = `Generate a PowerPoint slide outline for the topic {userInput}. Create {noOfSliders} slides in total. Each slide should include a topic name and a 2-line descriptive outline that clearly explains what content the slide will cover.
Include the following structure:
The first slide should be a Welcome screen.
The second slide should be an Agenda screen.
The final slide should be a Thank You screen.
Return the response only in JSON format, following this schema:
[
  {
    "slideNo": "",
    "slidePoint": "",
    "outline": ""
  }
]
`;

const DUMMYOUTLINE = [
  {
    slideNo: "1",
    slidePoint: "Welcome to Our Presentation",
    outline:
      "A warm introduction to the topic of AI-powered presentation generators.\nSetting the stage for an insightful exploration into this innovative technology.",
  },
  {
    slideNo: "2",
    slidePoint: "Today's Agenda",
    outline:
      "An overview of the key topics we will cover throughout this session.\nProviding a clear roadmap of what to expect from the presentation.",
  },
  {
    slideNo: "3",
    slidePoint: "Defining AI-Powered PPT Generators",
    outline:
      "Explaining what these tools are and how they leverage artificial intelligence.\nHighlighting their core function in automating presentation creation.",
  },
  {
    slideNo: "4",
    slidePoint: "How Do AI PPT Generators Work?",
    outline:
      "Detailing the input-output process and the AI technologies involved.\nExploring how algorithms transform raw information into structured slides.",
  },
  {
    slideNo: "5",
    slidePoint: "Key Benefits & Features",
    outline:
      "Showcasing the primary benefits like time-saving, consistency, and design quality.\nHighlighting features such as content generation, design automation, and intelligent suggestions.",
  },
  {
    slideNo: "6",
    slidePoint: "Use Cases & Applications",
    outline:
      "Illustrating practical scenarios across various industries and professions.\nProviding examples of how individuals and businesses leverage these tools effectively.",
  },
  {
    slideNo: "7",
    slidePoint: "The Future of AI in Presentations",
    outline:
      "Discussing upcoming advancements and the potential impact on presentation creation.\nForecasting how AI will continue to shape and enhance our communication methods.",
  },
  {
    slideNo: "8",
    slidePoint: "Thank You & Q&A",
    outline:
      "Expressing gratitude for attendance and opening the floor for questions.\nConcluding the session and encouraging further engagement with the audience.",
  },
];

export type Project = {
  userInputPrompt: string;
  projectId: string;
  createdAt: string;
  noOfSlider: string;
  outline: Outline[];
  slides: any[];
  designStyle: DesignStyle;
};
export type Outline = {
  slideNo: string;
  slidePoint: string;
  outline: string;
};

function Outline() {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectDetail, setProjectDetail] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateDbLoading, setUpdateDbLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outline, setOutline] = useState<Outline[]>(DUMMYOUTLINE);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle>()

  useEffect(() => {
    if (projectId) {
      GetProjectId();
    } else {
      setLoading(false);
    }
  }, [projectId]);

  const GenerateSlidersOutline = async (projectData: Project) => {
    setLoading(true);
    try {
      // Provide a prompt that contains text
      const prompt = OUTLINE_PROMPT.replace(
        "{userInput}",
        projectData?.userInputPrompt
      ).replace("{noOfSliders}", projectData?.noOfSlider);

      // To generate text output, call generateContent with the text input
      const result = await GeminiAiModel.generateContent(prompt);

      const response = result.response;
      const text = response.text();
      console.log(text);
      const rawJson = text.replace("```json", "").replace("```", "");
      const JSONData = JSON.parse(rawJson);
      setOutline(JSONData);
    } catch (error) {
      console.error("Error generating outline:", error);
      setError("Failed to generate outline");
    } finally {
      setLoading(false);
    }
  };

  const GetProjectId = async () => {
    try {
      setLoading(true);
      const docRef = doc(firebaseDb, "projects", projectId ?? "");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const projectData = docSnap.data() as Project;
        setProjectDetail(projectData);
        // Only generate outline if it doesn't exist yet
        if (!projectData.outline) {
          GenerateSlidersOutline(projectData);
        } else {
          // If outline exists in project data, use it
          setOutline(projectData.outline);
        }
      } else {
        setError("Project not found");
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOutline = (index: string, value: Outline) => {
    setOutline((prev) =>
      prev.map((item) =>
        item.slideNo === index ? { ...item, ...value } : item
      )
    );
  };

  const onGenerateSlider = async () => {
    setUpdateDbLoading(true);
    //undate db
    await setDoc(doc(firebaseDb, "projects", projectId ?? ""),{
      designStyle: selectedStyle,
      outline: outline,
    },{
      merge: true
    })
    setUpdateDbLoading(false);

    //Navigate to slider-Editor page

  }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!projectDetail) {
    return <div className="p-4">No project data available</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Setting and Slider Outline</h2>
        <SliderStyle
          selectStyle={(value: DesignStyle) => setSelectedStyle(value)}
        />
        <OutlineSection
          loading={loading}
          outline={outline || []}
          handleUpdateOutline={(index: string, value: Outline) =>
            handleUpdateOutline(index, value)
          }
        />
      </div>
      <Button
        size={"lg"}
        className="fixed bottom-6 transform left-1/2 -translate-x-1/2"
        onClick={onGenerateSlider}
        disabled={updateDbLoading || loading}
      >
        {updateDbLoading && <Loader2Icon className="animate-spin" />}
        Generate Sliders <ArrowRight />
      </Button>
    </div>
  );
}

export default Outline;
