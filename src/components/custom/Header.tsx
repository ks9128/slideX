import { SignInButton, useAuth, UserButton, useUser } from "@clerk/clerk-react";
import logo from "../../assets/logo_slidex.png";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router";
import {
  GemIcon,
  GithubIcon,
  LinkedinIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useContext, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

const MenuOptions = [
  {
    name: "Workspace",
    path: "/workspace",
  },
  {
    name: "Pricing",
    path: "/workspace/pricing",
  },
];

function Header() {
  const { user } = useUser();
  const location = useLocation();
  const { userDetail } = useContext(UserDetailContext);
  const { has } = useAuth();
  const hasUnlimitedAccess = has && has({ plan: "unlimited" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact matching for active state
  const isActive = (path: string) => {
    if (path === "/workspace") {
      // For workspace, we want exact match or when it's the root workspace path
      // but not when we're on a sub-path like /workspace/pricing
      return (
        location.pathname === "/workspace" ||
        (location.pathname.startsWith("/workspace") &&
          !location.pathname.includes("/pricing"))
      );
    }
    // For other paths, exact match
    return location.pathname === path;
  };

  return (
    <nav className="relative bg-white shadow-sm border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-between sm:items-stretch">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img alt="SlideX" src={logo} className="h-10 w-auto" />
              </Link>
            </div>
            {user && (
              <div className="hidden sm:ml-6 sm:block sm:w-full">
                <div className="flex justify-center space-x-1">
                  {MenuOptions.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? "bg-primary/15 text-primary font-semibold"
                          : "text-foreground hover:bg-accent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Social icons */}
            <div className="hidden md:flex items-center space-x-1 mr-4">
              <a
                href="https://github.com/ks9128"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/khalidsaifullah-ks/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>

            {!user ? (
              <SignInButton mode="modal">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary hover:bg-primary/90 px-3 py-1.5 text-sm rounded-lg transition-colors shadow-sm"
                >
                  Get Started
                </Button>
              </SignInButton>
            ) : (
              <div className="flex items-center gap-2">
                {location.pathname.includes("workspace") ? (
                  !hasUnlimitedAccess && (
                    <div className="hidden md:flex items-center px-3 py-1 gap-1 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200 shadow-xs animate-pulse">
                      <GemIcon size={"1rem"} className="text-amber-600" />
                      <span className="text-xs font-semibold text-amber-800">
                        {userDetail?.credits ?? 0}
                      </span>
                    </div>
                  )
                ) : (
                  <Link to="/workspace" className="hidden md:block">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary/10 px-3 py-1.5 text-sm rounded-lg transition-colors shadow-sm"
                    >
                      Workspace
                    </Button>
                  </Link>
                )}
                <UserButton />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {user && mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {MenuOptions.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`block rounded-lg px-4 py-2 text-base font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile social icons */}
            <div className="flex items-center space-x-4 pt-4 pb-2">
              <a
                href="https://github.com/ks9128"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/khalidsaifullah-ks/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
