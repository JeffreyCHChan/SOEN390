import React from 'react';
import {Container, Box, Grid, CssBaseline, Button, Card, styled, Paper, formHelperTextClasses} from '@mui/material';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useState} from 'react';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
  }));


function DoctorViewingPatient() {
    const location = useLocation(); //get data passed on through previous page (DoctorPatientProfile page)
    const [patientData, setPatientData] = useState([]); //Patient data used in rendering of page
    const [viewedList, setViewedList] = useState([]); //list of patients whose profiles have been reviewed

    var tempDoctorID = 6;
    let stopeffect = 1;

    let isViewed = false; //variable to verify if patient profile has been viewed, to be used for disabling or enabling MARK AS READ button
    if (viewedList.map(el => el.ID).includes(location.state.ID)){ //if the PatientID is present in the list of Viewed Patients then set isViewed to true
        isViewed = true;
    }
    
    useEffect(()=>{ //When page is loaded, get requests will get patient data as well as a list of patients whose profiles have been viewed
        Axios.get("http://localhost:8080/doctorViewingPatientData", { params: {id: location.state.ID}}).then((response) => {
            setPatientData(response.data);
        });
        Axios.get("http://localhost:8080/Viewed").then((response) => {
            setViewedList(response.data);
            console.log(response.data);
        });   
    }, [stopeffect]); 

    let markAsReviewed = () => { //When clicking the MARK AS REVIEWED button, this will send the patient and doctor information to the DB viewed table
        const currentDate = new Date();
        const timestamp = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        Axios.post("http://localhost:8080/markViewed", {
            PatientID: location.state.ID,
            DoctorID: tempDoctorID,
            datetime: timestamp
        }).then(()=>{
            console.log("success")
        });
    };

    let requestForm = () => { //When clicking the REQUEST SYMPTOM FORM button, this will update the SymptomRequested attribute in the patient tale to true
        Axios.post("http://localhost:8080/requestForm", {
            PatientID: location.state.ID
        }).then(()=>{
            console.log("success")
        });
    }

    let previousSymptoms = () => { //This function gets the list of all the patients previous symptom forms (to be rendered on a page in later sprint)
        Axios.get("http://localhost:8080/doctorViewingPreviousSymptoms", { params: {id: location.state.ID}}).then((response) => {
            console.log("success");
        });  
    }

    let flagPatient = () => { //When clicking the REQUEST SYMPTOM FORM button, this will update the SymptomRequested attribute in the patient tale to true
        Axios.post("http://localhost:8080/flagPatient", {
            PatientID: location.state.ID
        }).then(()=>{
            console.log("success")
        });
    }

    return (
        <div>
            <Container component="main">
                <CssBaseline />
                <Box sx={{padding:5}}>
                        
                <Card sx={{ maxWidth: 275, textAlign:'center'}}><h1>Patient Profile </h1></Card>
                </Box>
                <Container>
                {patientData.map((val, key) =>{ 
                    return(
                        <Grid container spacing={2} key={key}>
                            <Grid item xs={4}>
                                <Item>Patient Name: {val.Fname + " " + val.Lname}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Patient ID: {val.ID}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Covid-19 Status: {val.Status}</Item>
                            </Grid>
                            <br></br>
                            <Grid item xs={4}>
                                <Item>Doctor: {val.DoctorFirst + " " + val.DoctorLast}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Email: {val.Email}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Phone Number: {val.Phone}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Birthday: {val.Birthday.substring(0, 10)}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Address: {val.Address}</Item>
                            </Grid>
                        </Grid>
                    )
                })}
                </Container>
              
                <Box sx={{padding:5}}>
               

                {/* I made it href back to the page so that the page refreshes and the doctor 
                can see whether or not they have requested a symptom form.*/}
                <Button variant="outlined" href="#outlined-buttons" onClick={requestForm} href="/DoctorViewingPatient">
                    REQUEST SYMPTOM FORM
                </Button>
              
                {/* I'm thinking that we make a new page called PreviousSymptoms where all
                of the symptom forms will be sent.*/}
                <Button sx={{ml: 65}} variant="outlined" href="#outlined-buttons" onClick={previousSymptoms} href="/PreviousSymptoms">
                    VIEW PREVIOUS SYMPTOM FORMS
                </Button>

                {/* If patient profile has been reviewed already, the MARK AS REVIEWED button will be disabled */}
                {isViewed ? (<Button sx={{ml:55}} variant="outlined" onClick={markAsReviewed} disabled href="/DoctorViewingPatient">MARK AS REVIEWED</Button>) : 
                (<Button sx={{ml:55}} variant="outlined" onClick={markAsReviewed} href="/DoctorViewingPatient">MARK AS REVIEWED</Button>)}
                <br></br> <br></br>
                <Button sx={{ml:58}} variant="outlined" href="#outlined-buttons" onClick={flagPatient} href="/DoctorViewingPatient">
                    FLAG PATIENT
                </Button>
              
                </Box>
            </Container>
              
        </div>
    );

}


export default DoctorViewingPatient;