/* eslint-disable react/prop-types */
import { Avatar, AvatarGroup, Box, Stack } from "@mui/material"
import { transformImage } from "../../lib/features";


const AvatarCard = ({avatar=[],max=4}) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max} sx={{position:"relative"}}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((item, index) => (
            <Avatar
              key={index}
              src={transformImage(item)}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: {
                    xs: `${0.5 + index}rem`,
                    sm: `${index}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
}

export default AvatarCard