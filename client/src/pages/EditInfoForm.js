import { Paper, FormControl, FormLabel, TextField, Button } from '@mui/material';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

//This variable represents a function that will be called when the
//user submits the form with their updated data. The updated data will be 
//sent to the server.js file so that the user's data can be altered in
//the database.
let submitEditInfoForm = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  Axios.post('http://localhost:8080/editedPatientData', {
    //patientid: id
    fname: data.get('firstName'),
    lname: data.get('lastName'),
    email: data.get('patientEmail'),
    phone: data.get('patientPhone'),
    healthinsurance: data.get('patientHI'),
  }).then(() => {
    console.log('success');
  });
};


function EditInfoForm() {

  //These variables are used to get the current patient's data.
  //The const allows us to store the data in a variable using useState()
  //and the stopeffect will make sure that our useEffect() will only 
  //run one time.
  const [editPatientData, setEditPatientData] = useState([]);
  let stopeffect = 1;

  //This useEffect() will run after the page renders. It will
  //get the patients data by using a get and going to the 
  //server.js file to execute the code to query for the current data.
  useEffect(() => {
    Axios.get('http://localhost:8080/editPatientProfileData', {
      //send the patient id here
    }).then((response) => {
      setEditPatientData(response.data);
      console.log(response);
    });
  }, [stopeffect]);

  let patientFName = editPatientData.map((val, key) => { return val.FName });
  let patientLName = editPatientData.map((val, key) => { return val.LName });
  let patientHealthInsurance = editPatientData.map((val, key) => { return val.HealthInsurance });
  let patientPhoneNumber = editPatientData.map((val, key) => { return val.Phone });
  let patientEmail = editPatientData.map((val, key) => { return val.Email });

  // Allows patients to edit their information adding appropriate info in the text fields

  return (
    <div align="Center">
      <Paper elevation={24} component="form" onLoad onSubmit={submitEditInfoForm} sx={{ width: 700, height: 1000, mt: 10 }}>
        <h1>Edit Profile Information</h1>

        <FormControl>
          <FormLabel id="firstName" sx={{ mb: 3 }}>
            Please enter your first name
          </FormLabel>
          <TextField id="firstName" name="firstName" required label="First Name" variant="filled" type="text" inputProps={{ maxLength: 15 }} sx={{ mb: 5 }} />
        </FormControl>

        <br></br>

        <FormControl>
          <FormLabel id="lastName" sx={{ mb: 3 }}>
            Please enter your last name
          </FormLabel>
          <TextField id="lastName" name="lastName" required label="Last Name" variant="filled" type="text" inputProps={{ maxLength: 15 }} sx={{ mb: 5 }} />
        </FormControl>

        <br></br>

        {/* <FormControl>
          <FormLabel id="birthday" sx={{ mb: 3 }}>
            Please enter your birthday
          </FormLabel>

          <Stack component="date" noValidate spacing={3}>
            <TextField id="birthday" label="Birthday" type="date" defaultValue="2022-02-24" sx={{ width: 220, textAlign: 'center' }} InputLabelProps={{ shrink: true, }}
            /></Stack>
        </FormControl> */}

        <br></br>

        <FormControl>
          <FormLabel id="patientHI" sx={{ mb: 3 }}>
            Health Insurance Number
          </FormLabel>
          <TextField id="patientHI" name="patientHI" required label="Health Insurance" variant="filled" type="text" inputProps={{ maxLength: 10 }} sx={{ mb: 5 }} />
        </FormControl>

        <br></br>

        <FormControl>
          <FormLabel id="patientPhone" sx={{ mb: 3 }}>
            Please enter your phone number
          </FormLabel>
          <TextField id="patientPhone" name="patientPhone" required label="Phone number" variant="filled" type="number" inputProps={{ maxLength: 9 }} sx={{ mb: 5 }} />
        </FormControl>

        <br></br>

        <FormControl>
          <FormLabel id="patientEmail" sx={{ mb: 3 }}>
            Please enter your email address
          </FormLabel>
          <TextField id="patientEmail" name="patientEmail" required label="Email address" variant="filled" type="text" inputProps={{ maxLength: 240 }} sx={{ mb: 5 }} />
        </FormControl>

        <br></br>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>

      </Paper>

    </div>
  );
}

export default EditInfoForm;