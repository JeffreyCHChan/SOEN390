import Paper from '@mui/material/Paper';
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

// function submitSymptoms(){

//   document.getElementById("temperature").submit();
//   document.getElementById("breathing").submit();
//   document.getElementById("chest").submit();
//   document.getElementById("fatigue").submit();
//   document.getElementById("fever").submit();
//   document.getElementById("cough").submit();
//   document.getElementById("smell").submit();
//   document.getElementById("taste").submit();
//   document.getElementById("symptoms").submit();

//   return(null);
// }



function SymptomForm() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitredirect = 'PatientProfile'
    console.log({
      temperature: data.get('temperature'),
      breathing: data.get('breathing'),
      chest: data.get('chest'),
      fatigue: data.get('fatigue'),
      fever: data.get('fever'),
      cough: data.get('cough'),
      smell: data.get('smell'),
      taste: data.get('taste'),
      symptoms: data.get('symptoms')
      

    });
  };


  return (
  <div align="Center">
    <Paper  elevation={24} component="form" onSubmit={handleSubmit, redirectPatientProfile}  sx={{width: 700, height:2000, mt:10}}> 
      <h1>Symptoms</h1>


      <FormControl>
        <FormLabel id="temperature" sx={{mb:3}}>
          Please enter your temperature (in degrees Celsius)
        </FormLabel>
        <TextField id="temperature" name="temperature" required label="Temperature (°C)" variant="filled" type="number" inputProps={{ maxLength: 3 }} sx={{mb:5}}/>
      </FormControl>

    
      <FormControl>
        <FormLabel sx={{mb:3}}>
          Difficulty Breathing
        </FormLabel>

        <RadioGroup
          row
          aria-labelledby="breathing"
          name="position"
          defaultValue="top"
          sx={{mb:5}}
          id="breathing"
          name="breathing"
        >

          <FormControlLabel
            value="1"
            control={<Radio required={true} />}
            label="1 (None)"
            labelPlacement="top"
            required
          />

          <FormControlLabel
            value="2"
            control={<Radio required={true} />}
            label="2"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel
            value="3"
            control={<Radio required={true} />}
            label="3"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel 
            value="4" 
            control={<Radio required={true} />} 
            label="4" 
            labelPlacement="top"
          />

          <FormControlLabel 
            value="5" 
            control={<Radio required={true} />} 
            label="5 (Extreme)" 
            labelPlacement="top"
            sx={{ml:0.5}}
          />

        </RadioGroup>
      </FormControl>
    
      <FormControl>

        <FormLabel id="chest-pain" sx={{mb:3}}>
          Chest Pain
        </FormLabel>

        <RadioGroup
          row
          aria-labelledby="chest-pain"
          name="chest"
          defaultValue="top"
          sx={{mb:5}}
        >

          <FormControlLabel
            value="1"
            control={<Radio required={true} />} 
            label="1 (None)"
            labelPlacement="top"
          />

          <FormControlLabel
            value="2"
            control={<Radio required={true} />} 
            label="2"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel
            value="3"
            control={<Radio required={true} />} 
            label="3"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel 
            value="4" 
            control={<Radio required={true} />} 
            label="4" 
            labelPlacement="top"
          />

          <FormControlLabel 
            value="5" 
            control={<Radio required={true} />}  
            label="5 (Extreme)" 
            labelPlacement="top"
            sx={{ml:0.5}}
          />

        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="fatigue" sx={{mb:3}}>
          Fatigue
        </FormLabel>

        <RadioGroup
          row
          aria-labelledby="fatigue"
          name="fatigue"
          defaultValue="top"
          sx={{mb:5}}
        >

          <FormControlLabel
            value="1"
            control={<Radio required={true} />} 
            label="1 (None)"
            labelPlacement="top"
          />

          <FormControlLabel
            value="2"
            control={<Radio required={true} />} 
            label="2"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel
            value="3"
            control={<Radio required={true} />} 
            label="3"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel 
            value="4" 
            control={<Radio required={true} />} 
            label="4" 
            labelPlacement="top"
          />

          <FormControlLabel 
            value="5" 
            control={<Radio required={true} />} 
            label="5 (Extreme)" 
            labelPlacement="top"
            sx={{ml:0.5}}
          />

        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="fever" sx={{mb:3}}>
          Fever
        </FormLabel>

        <RadioGroup
          row
          aria-labelledby="fever"
          name="fever"
          defaultValue="top"
          sx={{mb:5}}
        >
          <FormControlLabel
            value="1"
            control={<Radio required={true} />} 
            label="1 (None)"
            labelPlacement="top"
          />

          <FormControlLabel
            value="2"
            control={<Radio required={true} />} 
            label="2"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel
            value="3"
            control={<Radio required={true} />} 
            label="3"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel 
            value="4" 
            control={<Radio required={true} />} 
            label="4" 
            labelPlacement="top"
          />

          <FormControlLabel 
            value="5" 
            control={<Radio required={true} />}  
            label="5 (Extreme)" 
            labelPlacement="top"
            sx={{ml:0.5}}
          />

        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="cough" sx={{mb:3}}>
          Cough
        </FormLabel>

        <RadioGroup
          row
          aria-labelledby="cough"
          name="cough"
          defaultValue="top"
          sx={{mb:5}}
        >
          <FormControlLabel
            value="1"
            control={<Radio required={true} />} 
            label="1 (None)"
            labelPlacement="top"
          />

          <FormControlLabel
            value="2"
            control={<Radio required={true} />} 
            label="2"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel
            value="3"
            control={<Radio required={true} />} 
            label="3"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel 
            value="4" 
            control={<Radio required={true} />}  
            label="4" 
            labelPlacement="top"
          />

          <FormControlLabel 
            value="5" 
            control={<Radio required={true} />} 
            label="5 (Extreme)" 
            labelPlacement="top"
            sx={{ml:0.5}}
          />

        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="smell" sx={{mb:3}}>
          Loss of Smell
        </FormLabel>

        <RadioGroup
          row
          aria-labelledby="smell"
          name="smell"
          defaultValue="top"
          sx={{mb:5}}
        >
          <FormControlLabel
            value="1"
            control={<Radio required={true} />} 
            label="1 (None)"
            labelPlacement="top"
          />

          <FormControlLabel
            value="2"
            control={<Radio required={true} />} 
            label="2"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel
            value="3"
            control={<Radio required={true} />} 
            label="3"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel 
            value="4" 
            control={<Radio required={true} />} 
            label="4" 
            labelPlacement="top"
          />

          <FormControlLabel 
            value="5" 
            control={<Radio required={true} />} 
            label="5 (Extreme)" 
            labelPlacement="top"
            sx={{ml:0.5}}
          />

        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="taste" sx={{mb:3}}>
          Loss of Taste
        </FormLabel>

        <RadioGroup
          row
          aria-labelledby="taste"
          name="taste"
          defaultValue="top"
          sx={{mb:5}}
        >
          <FormControlLabel
            value="1"
            control={<Radio required={true} />} 
            label="1 (None)"
            labelPlacement="top"
          />

          <FormControlLabel
            value="2"
            control={<Radio required={true} />} 
            label="2"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel
            value="3"
            control={<Radio required={true} />} 
            label="3"
            labelPlacement="top"
            sx={{mr:3}}
          />

          <FormControlLabel 
            value="4" 
            control={<Radio required={true} />} 
            label="4" 
            labelPlacement="top"
          />

          <FormControlLabel 
            value="5" 
            control={<Radio required={true} />} 
            label="5 (Extreme)" 
            labelPlacement="top"
            sx={{ml:0.5}}
          />

        </RadioGroup>
      </FormControl>

      <div>
        <FormControl>
            <FormLabel id="symptoms" sx={{mb:3}}>Any Additional Symptoms (Optional)?</FormLabel>
            <TextField
              id="symptoms"
              multiline
              rows={4}
              label="Enter Any Other Symptoms Here"
              variant="filled"
              name="symptoms" 
              sx={{width:350}}
            />
        </FormControl>
      </div>
  

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} href="/PatientProfile">
        Submit
      </Button>

    </Paper>

  </div>
  );
}


export default SymptomForm;