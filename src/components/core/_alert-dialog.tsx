import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FC, ReactNode } from 'react';

interface IProps {
  triggerContent: ReactNode;
  dialogTitle: string;
  dialogDescription?: string;
  dialogAction: () => void;
}

const CoreAlertDialog: FC<IProps> = ({
  triggerContent,
  dialogTitle,
  dialogDescription,
  dialogAction,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerContent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={dialogAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CoreAlertDialog;
