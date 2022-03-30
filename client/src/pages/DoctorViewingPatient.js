import React from 'react';
import { Container, Box, Grid, CssBaseline, Button, Card, styled, Paper, Typography } from '@mui/material';
import Axios from 'axios';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


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

    var tempDoctorID = parseInt(localStorage.getItem('id'));
    let stopeffect = 1;

    let isViewed = false; //variable to verify if patient profile has been viewed, to be used for disabling or enabling MARK AS READ button
    if (viewedList.map(el => el.ID).includes(location.state.ID)) { //if the PatientID is present in the list of Viewed Patients then set isViewed to true
        isViewed = true;
    }



    useEffect(() => { //When page is loaded, get requests will get patient data as well as a list of patients whose profiles have been viewed
        Axios.get("http://localhost:8080/doctorViewingPatientData", { params: { id: location.state.ID } }).then((response) => {
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
            PatientDocID: patientData.map((val, key) => { return val.DoctorID })[0],
            DoctorID: tempDoctorID,
            datetime: timestamp
        }).then(() => {
            console.log("success")
        }).catch((err) => console.log(err));
    };

    let requestForm = () => { //When clicking the REQUEST SYMPTOM FORM button, this will update the SymptomRequested attribute in the patient tale to true
        Axios.post("http://localhost:8080/requestForm", {
            PatientID: location.state.ID
        }).then(() => {
            console.log("success")
        });
    }

    let previousSymptoms = () => { //This function gets the list of all the patients previous symptom forms (to be rendered on a page in later sprint)
        Axios.get("http://localhost:8080/doctorViewingPreviousSymptoms", { params: { id: location.state.ID } }).then((response) => {
            console.log("success");
        });
    }

    let flagPatient = () => { //When clicking the REQUEST SYMPTOM FORM button, this will update the SymptomRequested attribute in the patient tale to true
        Axios.post("http://localhost:8080/flagPatient", {
            PatientID: location.state.ID
        }).then(() => {
            console.log("success")
        });
    }

    let unflagPatient = () => { //When clicking the UNFLAG button, this will update the Flagged attribute in the patient tale to false
        Axios.post("http://localhost:8080/unflagPatient", {
            PatientID: location.state.ID //The patient ID is being passed to the post method
        }).then(() => {
            console.log("success")
        });
    }

    let acceptChat = () => { //When clicking the ACCEPT CHAt button, this will update the ChatPermission attribute in the patient tale to true
        Axios.post("http://localhost:8080/acceptChat", {
            PatientID: location.state.ID //The patient ID is being passed to the post method
        }).then(() => {
            console.log("success")
            window.location.href = "/DoctorViewingPatient"
        });
    }

    let isChatAccepted = false; //variable to verify if patient has already been granted permission to chat, to be used for disabling or enabling ACCEPT CHAT button
    let isChatAcceptedArray = patientData.map((val, key) => { return val.ChatPermission });
    if (isChatAcceptedArray[0] === 1) {
        isChatAccepted = true;
    }

    let isNewPatient = false; //variable to verify if a patient is new
    let isNewPatientArray = patientData.map((val, key) => { return val.NewPatient });
    if (isNewPatientArray[0] === 1) {
        isNewPatient = true;
    }

    let isFlagged = false; //variable to verify if patient has already been flagged, to be used for displaying either the FLAG or UNFLAG butttons
    let isFlaggedArray = patientData.map((val, key) => { return val.Flagged });
    if (isFlaggedArray[0] === 1) {
        isFlagged = true;
    }

    let isChatRequested = false; //variable to verify if the patient has requested to chat with the doctor.
    let isChatRequestedArray = patientData.map((val, key) => {return val.ChatRequested});
    if (isChatRequestedArray[0] === 1){ 
        isChatRequested = true;
    }

    let patientsDoctorID = patientData.map((val, key) => { return val.DoctorID })[0]; //retrieving the id of the patient's doctor

    let viewingDoctorsPatient = false; //variable to validate whether the doctor is viewing one of their own patients to restrict some actions.
    if(patientsDoctorID === parseInt(localStorage.getItem("id"))){
        viewingDoctorsPatient = true;
    }

    return (
        <>
            {
                localStorage.getItem("role") != ('Doctor' || 'Admin') && <Navigate to={"/"} refresh={true} />
            }
            <Container component="main" >
                <CssBaseline />
                {patientData.map((val, key) => {
                    return (
                        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <Typography component="h1" variant="h2">
                                Patient Profile
                            </Typography>
                            {/* Displays the first block related to Patient Information */}
                            <Grid container spacing={2} sx={{mt: 5}}>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                    <Typography component="h1" variant="h5">
                                        Medical Information
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Patient Name:<br /> {val.Fname + " " + val.Lname}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Patient ID:<br /> {val.ID}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Covid-19 Status:<br /> {val.Status}
                                    </Item>
                                </Grid>
                            </Grid>
                            {/* Displays the second block related to Patient Information */}
                            <Grid container spacing={2} sx={{mt: 5}}>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Doctor:<br /> {val.DoctorFirst + " " + val.DoctorLast}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Email:<br /> {val.Email}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Phone Number:<br /> {val.Phone}
                                    </Item>
                                </Grid>
                            </Grid>
                            {/* Displays the third block related to Patient Information */}
                            <Grid container spacing={2} sx={{mt: 5}}>
                                <Grid item xs={12} md={6} >
                                    <Item>
                                        Birthday:<br /> {val.Birthday ? val.Birthday.substring(0, 10) : '19/19/1999'}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Item>
                                        Address:<br/> {val.Address}
                                    </Item>
                                </Grid>
                            </Grid>
                            {/* Displays the last block related to the clickable buttons */}
                            <Box sx={{ mt: 10 }}>
                                <Grid container fullwidth spacing={1}>
                                    {/* Button linked to this page in order to refresh it*/}
                                    <Button xs={12} sm={3} sx={{ margin: 1 }} variant="contained" onClick={requestForm} href='/DoctorViewingPatient'>
                                        REQUEST SYMPTOM FORM
                                    </Button>
                                    {/* Displaying the appropriate button base on if the patient is flagged or not */}
                                    {isFlagged ? (<Button xs={12} sm={3} sx={{ margin: 1 }} variant="contained" onClick={unflagPatient} href='/DoctorViewingPatient'>UNFLAG PATIENT</Button>) :
                                        (<Button xs={12} sm={3} sx={{ margin: 1 }} variant="contained" onClick={flagPatient} href='/DoctorViewingPatient'>FLAG PATIENT</Button>)}

                                    {/* Feature has not yet been implemented*/}
                                    
                                    <Link to='/DoctorFileDownload' state={{ ID: val.ID }} style={{ textDecoration: 'none' }}>
                                        <Button xs={12} sm={3} sx={{ margin: 1 }} variant="contained" onClick={previousSymptoms} href='/PreviousSymptoms'>
                                            PATIENT FILES
                                        </Button>
                                    </Link>
                                    
                                    {/* If the patient has not been viewed since an update or is a new patient, the doctors will be able
                                    to mark them as reviewed. The act of marking a patient as reviewed will only be allowed for their own doctor. */}
                                    {((!isViewed || isNewPatient) && viewingDoctorsPatient) ? (<Button xs={12} sm={3} sx={{ margin: 1 }} variant="contained" onClick={markAsReviewed} href='/DoctorViewingPatient'>MARK AS REVIEWED</Button>) :
                                        (<Button xs={12} sm={3} sx={{ margin: 1 }} variant="contained" onClick={markAsReviewed} disabled href='/DoctorViewingPatient'>MARK AS REVIEWED</Button>)}
                                    {/* This button will allow the doctor to accept a chat from a patient, initially  the chat is disabled.
                                    This action can only be performed by the patients own doctor. */}
                                    {(!isChatRequested || isChatAccepted || !viewingDoctorsPatient) ? (
                                        // Display chat only if the chat is accepted and it is your patient
                                        (isChatAccepted && viewingDoctorsPatient)?( 
                                    <Link to='/LiveChatDoctor' state={{ ID: val.ID }} style={{ textDecoration: 'none' }}>
                                        <Button xs={12} sm={3} sx={{ margin: 1 }}  variant="contained" href='/LiveChatDoctor'>CHAT</Button>
                                    </Link>):
                                    (<Button xs={12} sm={3} sx={{ margin: 1 }} disabled variant="contained">ACCEPT CHAT</Button>)
                                    ) :
                                    (<Button xs={12} sm={3} sx={{ margin: 1 }} variant="contained" onClick={acceptChat}>ACCEPT CHAT</Button>)}
                                </Grid>
                            </Box>
                        </Box>
                    )
                })}
            </Container>
        </>
    );
}
export default DoctorViewingPatient;