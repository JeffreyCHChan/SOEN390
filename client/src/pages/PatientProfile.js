import React from 'react';
import {Container, Box, Grid, CssBaseline, Button, Card, styled, Paper} from '@mui/material';
import Axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
  }));


function PatientProfile() {
  return (
  <div>
      <Container component="main">
        <CssBaseline />
      <Box sx={{padding:5}}>
          
      <Card sx={{ maxWidth: 275, textAlign:'center'}}><h1>Patient Profile </h1></Card>
      </Box>
    <Container>
        <Grid container spacing={2}>
        <Grid item xs={4}>
            <Item>Patient Name:</Item>
        </Grid>
        <Grid item xs={4}>
            <Item>Patient ID:</Item>
        </Grid>
        <Grid item xs={4}>
            <Item>Covid-19 Status:</Item>
        </Grid>
        <br></br>
        <Grid item xs={4}>
            <Item>Doctor:</Item>
        </Grid>
        </Grid>
    </Container>

    <Box sx={{padding:5}}>
      
    <Button sx={{mr:42}} variant="outlined" href="#outlined-buttons" >
        EDIT INFO
    </Button>

    <Button variant="outlined" href="#outlined-buttons" href="/SymptomForm">
        SYMPTOM FORM
    </Button>

    <Button sx={{ml:32}} variant="outlined" href="#outlined-buttons" >
        BOOK APPOINTMENT
    </Button>

    <br></br>


    <Button sx={{mt:2, ml:53}} variant="outlined" href="#outlined-buttons" >
        Edit CURRENT STATUS
    </Button>
    </Box>
    </Container>

  </div>
  );
}


export default PatientProfile;