/* eslint-disable react/prop-types */
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFileMenu, toggleUploadingLoader } from '../../redux/reducers/misc';
import ImageIcon from '@mui/icons-material/Image';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useRef } from 'react';
import { toast } from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../../redux/api/api';


const FileMenu = ({anchorEl,chatId}) => {
  const {isFileMenu}=useSelector(state=>state.misc)
  const dispatch=useDispatch();

  const imageRef=useRef(null);
  const audioRef=useRef(null);
  const videoRef=useRef(null);
  const fileRef=useRef(null);

  const [sendAttachments]=useSendAttachmentsMutation();

  const selectRef=(ref)=>{
    ref.current?.click();
  }

  const fileChangeHandler=async(e,keys)=>{
    const files=Array.from(e.target.files);

    if(files.length<=0) return;

    if(files.length>5) return toast.error(`You can only upload maximum 5 ${keys} at a time`);

    dispatch(toggleUploadingLoader(true));

    const toastId=toast.loading(`Uploading ${keys}`);

    dispatch(toggleFileMenu(false));

    try {
      const formData=new FormData();
      formData.append("chatId",chatId)

      for(let i=0;i<files.length;i++){
        formData.append("files", files[i]);
      }
      
      const res=await sendAttachments(formData);

      if(res.data){
        toast.success(`${keys} sent successfuly`,{id:toastId})
      }
      else{
        toast.error(`Failed to send ${keys}`,{id:toastId})
      }
    } 
    catch (error) {
      toast.error(error,{id:toastId})
    }
    finally{
      dispatch(toggleUploadingLoader(false));
    }

  }

  return (
    <Menu
      open={isFileMenu}
      anchorEl={anchorEl}
      onClose={() => dispatch(toggleFileMenu(false))}
    >
      <div style={{ width: "10rem" }}>
        <MenuList>
          <MenuItem onClick={()=>selectRef(imageRef)}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/gif"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>

          <MenuItem onClick={()=>selectRef(audioRef)}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav, audio/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>

          <MenuItem onClick={()=>selectRef(videoRef)}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>

          <MenuItem onClick={()=>selectRef(fileRef)}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
}

export default FileMenu