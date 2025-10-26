import { useEffect, useState } from "react";
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
import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDb } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
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
    const projectsList: any[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      projectsList.push(doc.data());
    });

    // Sort projects by createdAt date (newest first)
    projectsList.sort((a, b) => {
      const dateA = a.createdAt?.toDate
        ? a.createdAt.toDate()
        : new Date(a.createdAt);
      const dateB = b.createdAt?.toDate
        ? b.createdAt.toDate()
        : new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    setProjects(projectsList);
  };
  const FormatDate = (Timestamp: any) => {
    const Formatdate = moment(Timestamp).fromNow();
    return Formatdate;
  };

  return (
    <div className="mx-32 mt-20 mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">My Projects</h2>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors">
          + Create New Project
        </Button>
      </div>
      <div>
        {!projects.length ? (
          <Empty className="bg-background border border-border rounded-xl p-8">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderIcon className="text-foreground" />
              </EmptyMedia>
              <EmptyTitle className="text-foreground">
                No Projects Yet
              </EmptyTitle>
              <EmptyDescription className="text-muted-foreground">
                You haven&apos;t created any projects yet. Get started by
                creating your first project.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Create Project
                </Button>
              </div>
            </EmptyContent>
            <Button
              variant="link"
              asChild
              className="text-muted-foreground hover:text-foreground"
              size="sm"
            >
              <a href="#">
                Learn More <ArrowUpRightIcon className="ml-1" />
              </a>
            </Button>
          </Empty>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
            {projects.map((project, index) => (
              <Link
                to={"/workspace/project/" + project.projectId + "/editor"}
                key={index}
              >
                <div className="group bg-background border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full hover:border-primary/30">
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs font-medium bg-muted/50 text-muted-foreground px-2 py-1 rounded-full">
                        {project?.slides?.length || 0} slides
                      </span>
                    </div>
                    <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {project?.userInputPrompt || "Untitled Project"}
                    </h2>
                    <div className="mt-auto pt-3">
                      <p className="text-muted-foreground text-sm flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {FormatDate(project?.createdAt)}
                      </p>
                    </div>
                  </div>
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
