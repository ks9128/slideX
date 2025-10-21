import { useEffect, useState } from "react";
import OutlineSection from "@/components/custom/OutlineSection";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "@/config/firebaseConfig";
import type {Project} from '../outline'
function Editor() {
    const {projectId} = useParams();
    const [projectDetail, setProjectDetail] = useState<Project>();
    const [loading, setLoading] = useState(false)
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
  return (
    <div className="grid grid-cols-5 p-10">
      <div className="col-span-2 h-screen overflow-auto">
        {/* outline  */} 
        <OutlineSection outline={projectDetail?.outline ?? []}
        handleUpdateOutline={()=>console.log()}
        loading={loading}/>

    </div>
      <div className="col-span-3">
        {/* Sliders  */}
        sliders
        </div>
    </div>
  );
}

export default Editor;
