import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const BasicCard = ({ title, description, price,  }) => {
  return (
    <Card sx={{ maxWidth: 345, marginRight:"20px", padding:"20px" }}>
      
      <CardContent>
      
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
         <Typography variant="h3" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
      
    </Card>
  );
};

export default BasicCard;