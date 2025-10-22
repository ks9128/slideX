import { SignInButton, useAuth, UserButton, useUser } from "@clerk/clerk-react";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router";
import { DiamondIcon, GemIcon } from "lucide-react";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

const MenuOptions = [
  {
    name: 'Workspace',
    path: '/workspace'
  },
  {
    name: 'Pricing',
    path: '/workspace/pricing'
  }
]

function Header() {
  const { user } = useUser();
  const location = useLocation();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  console.log(location.pathname);
  const { has } = useAuth();
  const hasUnlimitedAccess = has&&has({ plan: "unlimited" });
  return (
    <div className="flex items-center justify-between px-5 py-1.5 shadow">
      <img src={logo} alt="logo" width={40} height={40} />
      <ul className="flex gap-10">
        {MenuOptions.map((menu,index) => (
          <Link to={menu.path} key={index} className="">
            <h2>{menu.name}</h2>
          </Link>
        ))}
      </ul>
      {!user ? (
        <SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>
      ) : (
        <div className="flex items-center gap-5">
          <UserButton />
          {location.pathname.includes("workspace") ? (
             !hasUnlimitedAccess && <div className="flex items-center p-2 px-3 gap-0.5 bg-orange-100 rounded-full">
              <GemIcon size={'1.2rem'} /> {userDetail?.credits ?? 0}
            </div>
          ) : (
            <div>
              <Link to="/workspace">
                <Button size={"lg"}> Go to Workspace</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
