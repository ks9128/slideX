import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router";
function Hero() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center mt-28 space-y-4">
      <h2 className="font-bold text-5xl ">
        {" "}
        From Idea to <span className="text-primary">Presentation</span> in One
        Click⚡
      </h2>
      <p className="text-xl text-gray-500 max-w-2xl text-center ">
        Generate professional, visually appealing presentations in seconds using
        the power of AI. Simply enter your topic, and our intelligent PPT
        generator creates well-organized slides with accurate content, sleek
        design, and impactful visuals — instantly.
      </p>
      <div className="flex gap-5 mt-10">
        <Button size={"lg"} variant={"outline"}>
          Watch Video <Play />
        </Button>
        {!user ? (
          <SignInButton mode="modal">
            <Button size={"lg"}> Get started</Button>
          </SignInButton>
        ) : (
          <Link to="/workspace">
            <Button size={"lg"}> Go to Workspace</Button>
          </Link>
        )}
      </div>
      <div className="relative max-w-3xl mt-10 ">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="src/assets/main_image.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
  );
}

export default Hero;
