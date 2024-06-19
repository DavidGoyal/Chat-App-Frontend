import ErrorIcon from '@mui/icons-material/Error';
import { Container, Stack, Typography } from "@mui/material";
import { LinkComponent } from '../components/styles/StyledComponents';

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{height:"100vh"}}>
      <Stack alignItems={"center"} spacing={"2rem"} justifyContent={"center"} height={"100%"}>
        <ErrorIcon sx={{fontSize:"10rem"}}/>
        <Typography variant='h1'>404</Typography>
        <Typography variant='h3'>Page Not Found</Typography>
        <LinkComponent to="/">Go Back Home</LinkComponent>
      </Stack>
    </Container>
  )
}

export default NotFound