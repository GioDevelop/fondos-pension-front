import React, { useState, useEffect } from 'react';
import InfoCard from '../components/InfoCard.js';
import BasicCard from '../components/BasicCard.js';
import axios from 'axios'; 
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

const Cancelaciones = () => {

  const [cards, setCards] = useState([]);
  const [saldo, setSaldo] = useState(null);

  // Función asíncrona para obtener los datos de la API
  const fetchCards = async () => {
    try {
      const response = await axios.get('https://localhost:7229/api/Fund/MyFunds?customerId=sdfsdf'); // Reemplaza '/api/funds' con tu endpoint real
      console.log('response', response);
      
        setCards(response.data.objectResponse);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const fetchSaldo = async () => {
    try {
      const response = await axios.get('https://localhost:7229/api/Fund/BalanceAccount?customerId=sadasd'); // Reemplaza '/api/saldo' con tu endpoint real
      console.log('response', response);
      setSaldo(response.data.objectResponse);
    } catch (error) {
      console.error('Error fetching saldo:', error);
    }
  };
  
  const postingData = async (item) => {
    try {
      const response = await axios.post('https://localhost:7229/api/Fund/UnsuscribeFund', item);
      fetchSaldo();
      fetchCards()
      console.log('Post response:', response.data);
      alert(response.data.message[0].message);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  

  // Llama a la función asíncrona cuando el componente se monte
  useEffect(() => {
    fetchCards();
    fetchSaldo();
  }, []);


  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', marginTop:'80px' }}>

    
  <Container sx={{justifyContent: 'left', marginTop:'50px', }} >
  <Typography variant="h4" color="text.secondary" sx={{justifyContent: 'left', marginBottom:'40px',  }}>
      Mis fondos de inversión, Saldo: {saldo}


    </Typography>
    
 
  </Container>
  <Container>
  <Grid container spacing={3}>
  {cards.length > 0 ? (
          cards.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <InfoCard
                title={item.fund.name}
                subtitle={item.fund.subtitle}
                price={item.fund.linkingAmount}
                buttonText='Cancelar'
                postData={() => postingData(item.fund)}              
              />
            </Grid>
          ))
        ): (
            <Typography variant="body1" color="text.secondary">
              No hay fondos disponibles.
            </Typography>
          )}
        </Grid>
    

  </Container>
  
</Box>
);
};

export default Cancelaciones