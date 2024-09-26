import { useContext, useState } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CGPVContext } from "../providers/cgpvContextProvider/CGPVContextProvider";
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ConfigTextEditor } from "./ConfigTextEditor";

interface ConfigSaveUploadButtonsProps {
  showCopy?: boolean;
  showDownload?: boolean;
  showUpload?: boolean;
}

export const ConfigSaveUploadButtons = (props: ConfigSaveUploadButtonsProps) => {

  const cgpvContext = useContext(CGPVContext);

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { configJson, handleConfigJsonChange } = cgpvContext;

  const { showCopy = false, showDownload = true, showUpload = true } = props;

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState<string>('');

  const handleCopy = () => {
    const txt = JSON.stringify(configJson, null, 4);
    navigator.clipboard.writeText(txt);

    setMsg('Copied to clipboard');
    setOpen(true);
  };

  const handleDownload = () => {
    const txt = JSON.stringify(configJson, null, 4);
    const data = `data:text/json;charset=utf-8,${encodeURIComponent(txt)}`;
    const filename = 'geo-config.json';
    const aTag = document.createElement('a');

    aTag.href = data;
    aTag.download = filename;
    aTag.click();

    setMsg('File successfully downloaded');
    setOpen(true);
  };

  //this function handles the upload of a json file. It reads the file and sets the file and calls the handleConfigJsonChange function.
  // it returns an error in the snackbar if the file is not a json file.
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const json = JSON.parse(content);
        handleConfigJsonChange(json);
        setMsg('File successfully uploaded');
        setOpen(true);
      } catch (error) {
        setMsg('Error: Invalid JSON file');
        console.error(error);
        setOpen(true);
      }
    };

    reader.readAsText(file);
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row',gap: 1 }}>
        {showCopy && <Button onClick={handleCopy} variant="contained" color="primary" size="small" startIcon={<ContentCopyIcon />}>
          Copy to Clipboard
        </Button>}
        {showDownload && <Button onClick={handleDownload} variant="contained" color="primary"  size="small" startIcon={<DownloadIcon />}>
          Save
        </Button>}
        {showUpload && <Button component="label" variant="contained" color="primary"  size="small" startIcon={<UploadFileIcon/>}>
          Upload
          <input type="file" accept=".json" hidden onChange={handleUpload} /> 
        </Button>}
        <ConfigTextEditor />
      </Box>
      <Snackbar
        message={msg}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

