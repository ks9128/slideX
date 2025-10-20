import OutlineSection from "@/components/custom/OutlineSection";
import SliderStyle from "@/components/custom/SliderStyle";
import { firebaseDb } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

type Project = {
  userInputPrompt: string;
  projectId: string;
  createdAt: string;
};

function Outline() {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectDetail, setProjectDetail] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      GetProjectId();
    } else {
      setLoading(false);
    }
  }, [projectId]);

  const GetProjectId = async () => {
    try {
      setLoading(true);
      const docRef = doc(firebaseDb, "projects", projectId ?? "");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProjectDetail(docSnap.data() as Project);
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
        <SliderStyle />
        <OutlineSection />
      </div>
    </div>
  );
}

export default Outline;
