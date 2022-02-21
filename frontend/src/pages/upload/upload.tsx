import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import UploadLogo from "../../assets/svg/Upload.svg" 
import './upload.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerInterface } from '../../shared/models/rootReducer';
import { uploadPdf } from '../../redux/actions/pdf.action';
import CircularProgress from '@mui/material/CircularProgress';
import { removeProgress } from '../../redux/slices/pdf.slice';

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const { pdfData, loading } = useSelector(
    (state: RootReducerInterface) => state.pdf,
  );
  const uploadFile = useRef<HTMLInputElement>(null);
  const [isFileInvalid, setIsFileInvalid] = useState<boolean>(false);

  const onUplaod = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const files = target.files;

    if(!files || !files[0].type.includes("pdf")) {
      setIsFileInvalid(true);
      if(uploadFile.current) uploadFile.current.value = "";
      return;
    }
    setIsFileInvalid(false);

    const formData = new FormData();
    formData.append('file', files[0]);
    dispatch(uploadPdf(formData));
    if(uploadFile.current) uploadFile.current.value = "";
  }

  useEffect(() => {
    if(loading === 100) {
      setTimeout(() => {
        dispatch(removeProgress())
      }, 3000)
    }
  }, [loading])

  return (
    <div className="upload-container">
      <div className="upload-form">
        <h2 className="form-title">Upload PDF file</h2>
        <label htmlFor="upload" className="upload-label">
          <img src={UploadLogo} alt="" />
          <span>Add Dashlet</span>
        </label>
        <input ref={uploadFile} onChange={onUplaod} id="upload" type="file" className="upload-input" />
        {isFileInvalid && (
          <Typography component="div" variant="body1">
            <Box sx={{ color: 'error.main', mt: 1 }}>Incorrect file format</Box>
          </Typography>
        )}
        {loading && (
          <div className='progress-bar'>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress variant="determinate" value={loading} />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                >{`${Math.round(loading)}%`}</Typography>
              </Box>
            </Box>
          </div>
        )}
      </div>
      {pdfData && (
        <div className="pdf-result">
          {pdfData.data}
        </div>
      )}
    </div>
  );
}

export default Upload;
