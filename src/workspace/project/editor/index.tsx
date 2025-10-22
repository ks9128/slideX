import { useEffect, useState } from "react";
import OutlineSection from "@/components/custom/OutlineSection";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb, GeminiAiLiveModel } from "@/config/firebaseConfig";
import type { Project } from "../outline";
import SliderFrame from "@/components/custom/SliderFrame";

const SLIDER_PROMPT = `Generate HTML (TailwindCSS + Flowbite UI + Lucide Icons) code for a 16:9 ppt slider in Modern Dark style.
{DESIGN_STYLE}: No responsive design; use a fixed 16:9 layout for Slides.
Use Flowbite component structure. Use different layouts depending on content and slide type.
Use TailwindCSS colors like primary, accent, emphasis, background etc., and include colors from {COLORS_CODE}.
MetaData for Slider: {METADATA}

- Ensure images are optimized to fit inside their container div and do not overflow.
- Use proper width/height constraints on images so they scale down if needed to remain inside the slide.
- Maintain 16:9 aspect ratio for all slides and ALL media.
- Use CSS classes like 'object-cover' or 'object-contain' for images to prevent stretching or overflow.
- Use grid or flex layouts to properly divide the slide so elements do not overlap.

Generate Image if needed using:
'https://ik.imagekit.io/ks9128k/ik-genimg-prompt-{imagePrompt}/{altImageName}.jpg'
Replace {imagePrompt} with relevant image prompt and altImageName with a random image name.

<!-- Slide Content Wrapper (Fixed 16:9 Aspect Ratio) -->
<div class="w-[800px] h-[500px] relative overflow-hidden">
  <!-- Slide content here -->
</div>
Also do not add any overlay - Avoid this :
  <div class="absolute inset-0 bg-gradient-to-br from-primary-to-secondary opacity-20"></div>

Just provide body content for 1 slider. Make sure all content, including images, stays within the main slide div and preserves the 16:9 ratio.`;


function Editor() {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<Project>();
  const [loading, setLoading] = useState(false);
  const [sliders,setSliders] = useState<any>();
  useEffect(() => {
    if (projectId) {
      GetProjectId();
    }
  }, [projectId]);

  const GetProjectId = async () => {
    setLoading(true);
    const docRef = doc(firebaseDb, "projects", projectId ?? "");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return;
    }
    console.log(docSnap.data());
    setProjectDetail(docSnap.data() as Project);
    setLoading(false);
  };

  useEffect(() => {
    if (projectDetail && !projectDetail.slides?.length) {
      // GenerateSlides();

    }
  }, [projectDetail]);

  const GenerateSlides = async () => {
    console.log("GenerateSlides function called!");
    const prompt = SLIDER_PROMPT.replace('{DESIGN_STYLE}',projectDetail?.designStyle?.designGuide ?? "" ).replace('{COLORS_CODE}',JSON.stringify(projectDetail?.designStyle?.colors )).replace('{METADATA}',JSON.stringify(projectDetail?.outline[0]));
    
    const session = await GeminiAiLiveModel.connect();

    session.send(prompt);

    // Collect text from model's turn
    let text = "";
    const messages = session.receive();
    for await (const message of messages) {
      switch (message.type) {
        case "serverContent":
          if (message.turnComplete) {
            console.log(text);
          } else {
            const parts = message.modelTurn?.parts;
            if (parts) {
              text += parts.map((part) => part.text).join("");
              console.log(text)
              const finalText = text.replace('```html','').replace('```','');
              setSliders((prev: any) => {
                if(!prev) return []; //safety check

                const updated = [...prev];

                if(0<updated.length){
                  updated[0] = {code: finalText}
                }
                else{
                  //if index doest exist optionally push new 
                  updated[0] = {code:finalText};
                }
                return updated;
              } )
            }
          }
          break;
        case "toolCall":
        // Ignore
        case "toolCallCancellation":
        // Ignore
      }
    }
  };

  return (
    <div className="grid grid-cols-5 p-10">
      <div className="col-span-2 h-screen overflow-auto">
        {/* outline  */}
        <OutlineSection
          outline={projectDetail?.outline ?? []}
          handleUpdateOutline={() => console.log()}
          loading={loading}
        />
      </div>
      <div className="col-span-3">
        {/* Sliders  */}
        {sliders.map((slide: any,index: number) => {
          <SliderFrame slide={slide} key={index} colors={projectDetail?.designStyle.colors} >
          </SliderFrame>
        }))}
      </div>
    </div>
  );
}

export default Editor;
