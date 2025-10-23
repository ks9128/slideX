import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon, FolderIcon } from "lucide-react";
import type { Project } from "@/workspace/project/outline";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { firebaseDb } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { formatDate } from "date-fns";
import { Link } from "react-router";
function MyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useUser();

  useEffect(() => {
    user && Getprojects();
  }, [user]);
  const Getprojects = async () => {
    const q = query(
      collection(firebaseDb, "projects"),
      where("createdBy", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setProjects((prev: any) => [...prev, doc.data()]);
    });
  };
  const FormatDate = (Timestamp: any) => {
    const Formatdate = moment(Timestamp).fromNow();
    return Formatdate;
  };

  return (
    <div className="mx-32 mt-20 mb-10">
      <div className="flex justify-between items-center">
        <h2>My Projects</h2>
        <Button>+ Create New project</Button>
      </div>
      <div>
        {!projects.length ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderIcon />
              </EmptyMedia>
              <EmptyTitle>No Projects Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any projects yet. Get started by
                creating your first project.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button>Create Project</Button>
              </div>
            </EmptyContent>
            <Button
              variant="link"
              asChild
              className="text-muted-foreground"
              size="sm"
            >
              <a href="#">
                Learn More <ArrowUpRightIcon />
              </a>
            </Button>
          </Empty>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {projects.map((project, index) => (
              <Link to={"/workspace/project/" + project.projectId + "/editor"}>
                <div
                  className="p-4 border rounded-2xl shadow mt-3 space-y-1"
                  key={index}
                >
                  <img
                    src="src\assets\logo.png"
                    alt="png"
                    width={50}
                    height={50}
                  />
                  <h2 className="font-bold text-lg">
                    {project?.userInputPrompt}
                  </h2>
                  <h2 className="not-first:text-red-600">
                    {" "}
                    Total {project?.slides?.length} Slides{" "}
                  </h2>
                  <p className="text-gray-400">
                    {FormatDate(project?.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProjects;
