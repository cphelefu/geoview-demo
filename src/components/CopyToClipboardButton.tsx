import { Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSnackbar } from "../providers/snackbarProvider";

interface CopyToClipboardButtonProps {
  textToCopy: string;
}

export const CopyToClipboardButton = (props: CopyToClipboardButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    navigator.clipboard.writeText(props.textToCopy);
    enqueueSnackbar('Copied to clipboard', { variant: 'success' });
  };

  return (
    <>
      <Button size="small" onClick={handleClick} variant="contained" color="primary" startIcon={<ContentCopyIcon />}>
        Copy to Clipboard
      </Button>
    </>
  );
};
