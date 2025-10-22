
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog";
import { Link } from "react-router";

type Props = {
  openAlert: boolean;
  setOpenAleart: any
};

function CreditLimitDialog({ openAlert, setOpenAleart }: Props) {
  return (
    <div>
      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Oops</AlertDialogTitle>
            <AlertDialogDescription>
              You dont have any credits left, Join unlimited Project Plan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAleart(false)}>
              Cancel
            </AlertDialogCancel>
            <Link to={"workspace/pricing"}>
              <AlertDialogAction>Pricing</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CreditLimitDialog