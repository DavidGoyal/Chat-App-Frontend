import { Container, Paper, Typography } from '@mui/material'
import {DataGrid} from "@mui/x-data-grid"

const Table = ({rows,columns,heading,rowHeight=52}) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          padding: "1rem 4rem",
          width: "100%",
          margin: "auto",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{ height: "80%" }}
          sx={{
            border:"none",
            ".table-header":{
                bgcolor:"black",
                color:"white"
            }
          }}
        />
      </Paper>
    </Container>
  );
}

export default Table