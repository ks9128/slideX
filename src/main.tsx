import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Workspace from "./workspace/index.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { UserDetailContext } from "./context/UserDetailContext.tsx";
import Outline from "./workspace/project/outline/index.tsx";
import Editor from "./workspace/project/editor/index.tsx";
import Pricing from "./workspace/pricing/index.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="workspace" element={<Workspace />}>
          <Route path="project/:projectId/outline" element={<Outline />} />
          <Route path="project/:projectId/editor" element={<Editor />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
      </Route>
    </>
  )
);

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function Root() {
  const [userDetail, setUserDetail] = useState();
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <RouterProvider router={router} />
      </UserDetailContext.Provider>
    </ClerkProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
