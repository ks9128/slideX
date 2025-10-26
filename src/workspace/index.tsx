import { Outlet, Navigate, useLocation } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../config/firebaseConfig.ts";
import { useContext, useEffect } from "react";
import { UserDetailContext } from "../context/UserDetailContext.tsx";
import Header from "@/components/custom/Header.tsx";
import PromptBox from "@/components/custom/PromptBox.tsx";
import MyProjects from "@/components/custom/MyProjects.tsx";

function Workspace() {
  const { user, isLoaded } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const location = useLocation();

  const CreateNewUser = async () => {
    if (user) {
      try {
        const docRef = doc(
          firebaseDb,
          "users",
          user?.primaryEmailAddress?.emailAddress ?? ""
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          setUserDetail(docSnap.data());
        } else {
          // insert new user in db
          const data = {
            fullName: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            createdAt: new Date(),
            credits: 2,
          };
          try {
            await setDoc(docRef, { ...data });
            setUserDetail(data);
            // console.log("User successfully created in database");
          } catch (setError) {
            // console.error("Error creating user in database:", setError);
          }
        }
      } catch (getError) {
        // console.error("Error checking if user exists:", getError);
      }
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      CreateNewUser();
    }
  }, [isLoaded, user]);

  // Wait until Clerk finishes loading the auth state
  if (!isLoaded) return null;

  // If not signed in user, redirect to home (or show a sign-in prompt)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Header />
      {location.pathname === "/workspace" && (
        <div>
          <PromptBox />
          <MyProjects />
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Workspace;
