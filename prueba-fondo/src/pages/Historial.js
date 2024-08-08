import React from 'react'
import DataGrid from '../components/DataGrid.js'
import BasicSelect from '../components/BasicSelect.js'
import { Box, Container, Typography  } from '@mui/material'


const Contact = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', marginTop:'80px' }} >
       <Container  >
       <Typography variant="h4" color="text.secondary" sx={{justifyContent: 'left', marginBottom:'40px',  }}>
          Historial de transacciones
        </Typography>
       
       </Container>    
            
        <Container sx={{justifyContent: 'left', marginTop:'50px', }} >
        <DataGrid />
        </Container>    
    </Box>


  )
}

export default Contact