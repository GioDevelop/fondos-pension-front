import React, { useState, useEffect } from 'react';
import InfoCard from '../components/InfoCard.js';
import BasicCard from '../components/BasicCard.js';
import axios from 'axios'; 
import Box from '@mui/material/Box';
import { Button, Container, Modal, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ConstructionOutlined } from '@mui/icons-material';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [saldo, setSaldo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedFundName, setSelectedFundName] = useState('');
  

  
  // Función asíncrona para obtener los datos de la API
  const fetchCards = async () => {
    try {
      const response = await axios.get('https://localhost:7229/api/Fund/FundsNotSuscribe?customerId=sadasd'); // Reemplaza '/api/funds' con tu endpoint real
      setCards(response.data.objectResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSaldo = async () => {
    try {
      const response = await axios.get('https://localhost:7229/api/Fund/BalanceAccount?customerId=sadasd'); // Reemplaza '/api/saldo' con tu endpoint real
      setSaldo(response.data.objectResponse);
    } catch (error) {
      console.error('Error fetching saldo:', error);
    }
  };

  const postingData = async (item) => {
    try {
      const response = await axios.post('https://localhost:7229/api/Fund/SubscribeFund', item);
      fetchSaldo();
      fetchCards();
      setSelectedFundName(item.name);
      alert(response.data.message[0].message);
      setModalOpen(true);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setInputValue('');
  };

  const handleSendEmail = async () => {
    try {
      const url = `https://localhost:7229/SendEmails?email=${inputValue}&fundName=${selectedFundName}`
      const response = await axios.post(url);
      alert('Email sent successfully');
      handleModalClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  const handleSendSMS = async () => {
    try {
      const url = `https://localhost:7229/SendSms?PhoneNumber=${inputValue}&fundName=${selectedFundName}`
      const response = await axios.post(url);
      alert('SMS sent successfully');
      handleModalClose();
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Error sending SMS');
    }
  };

  
  // Llama a la función asíncrona cuando el componente se monte
  useEffect(() => {
    fetchCards();
    fetchSaldo();
  }, []);

 
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', marginTop:'80px' }}>

        <Container >
        <BasicCard title="Bievenido, Adrian Valencia" description="Tu saldo disponible es:" price={saldo}
          
        />
        </Container>
      <Container sx={{justifyContent: 'left', marginTop:'50px', }} >
      <Typography variant="h4" color="text.secondary" sx={{justifyContent: 'left', marginBottom:'40px',  }}>
          Fondos de Inversion disponibles
        </Typography>
        
        <Grid container spacing={3}>
          {cards.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <InfoCard
                title={item.name}
                subtitle={item.subtitle}
                price={item.linkingAmount}
                buttonText='Invertir'
                postData={() => postingData(item)}
              />
            </Grid>
          ))}
        </Grid>

      </Container>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Enviar Notificación
          </Typography>
          <TextField
            id="modal-input"
            label="Correo o Número de Teléfono"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" onClick={()=>handleSendEmail()} sx={{ marginRight: 2 }}>
            Enviar Email
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSendSMS}>
            Enviar SMS
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;