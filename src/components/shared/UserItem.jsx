/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { transformImage } from '../../lib/features';

const UserItem = ({user, handler, handlerIsLoading,addIcon=true,styling={}}) => {

    const {name,_id,avatar}=user

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transformImage(avatar)} />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          width={"100%"}
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: addIcon?"primary.main":"error.main",
            color: "white",
            "&:hover": { bgcolor: addIcon?"primary.dark":"error.dark" },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {addIcon ? <AddIcon /> : <RemoveIcon/>}
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default memo(UserItem)