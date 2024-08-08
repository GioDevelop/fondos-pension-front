import React from 'react';
import Card from '@mui/material/Card';
import axios from 'axios'; 
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const InfoCard = ({ title, description, price, buttonText, postData }) => {
  

  return (
    <Card sx={{ maxWidth: 345, marginRight:"20px", padding:"20px" }}>
      
      <CardContent>
      
        <Typography variant="body" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
         <Typography variant="h4" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={postData} variant="contained" color="secondary">{buttonText}</Button>
      </CardActions>
    </Card>
  );
};

export default InfoCard;