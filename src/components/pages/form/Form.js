import React, { useState, useEffect} from "react";
import "./GrievanceForm.css";
import { db } from "../../../firebase";
import toast, { Toaster } from "react-hot-toast";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
// import Autocomplete from '@mui/material/Autocomplete';
import {Button} from '../../Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { FilePresentRounded } from '@mui/icons-material';


const Form = () => {
  const MAX_LENGTH_SN = 9;
  const MAX_LENGTH_CN = 11;
  const MAX_EXPLANATION = 1000;

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [studentNumber, setstudentNumber] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [currentCollege, setcurrentCollege] = useState("");
  const [currentYear, setcurrentYear] = useState("");
  const [classConcern, setclassConcern] = useState("");
  const [natureConcern, setnatureConcern] = useState("");
  const [concern, setConcern] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loader, setLoader] = useState(false);

  // const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");



  // const [message, setMessage] = useState('');
  // const [error, setError] = useState(null);



  const handleSubmit = (e) => {
    if (firstName === "" && lastName ==="" && middleName === "" && email === "" && studentNumber === "" && contactNumber === ""  && currentCollege === "" && currentYear === "" && classConcern === "" && natureConcern === "" && concern === "") console.log("missing field");
    else {
    e.preventDefault();
    setLoader(true)
    

    db.collection("forms")
      .add({
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        Email: email,
        StudentNumber: studentNumber,
        ContactNumber: contactNumber,
        CurrentCollege: currentCollege,
        CurrentYear: currentYear,
        ClassificationConcern: classConcern,
        NatureConcern: natureConcern,
        Concern: concern,
        Status: status
      })
      .then(() => {
        toast.success("Grievance Form Submitted");
        setLoader(false)
      })
      .catch((error) => {
        toast.error("Something went wrong")
        // alert(error.message);
        setLoader(false);
      });

    setfirstName("");
    setlastName("");
    setmiddleName("");
    setEmail("");
    setstudentNumber("");
    setcontactNumber("");
    setcurrentCollege("");
    setcurrentYear("");
    setclassConcern("");
    setnatureConcern("");
    setConcern("");
    setStatus("Pending")
  }
};


// STUDENT NUMBER
useEffect(() => {

  if (studentNumber.length < MAX_LENGTH_SN) {
    setErrorMessage("Format: 9 digits");
  } else if (studentNumber.length > MAX_LENGTH_SN) {
    setErrorMessage("The number exceeded the limit")
  } 

}, [studentNumber, errorMessage]);

// EMAIL

  useEffect(() => {
    if (!email.endsWith('@plm.edu.ph')) {
      setErrorMessage2("Format:___@plm.edu.ph")
    } else if (email.endsWith('@plm.edu.ph')) {
      setErrorMessage2("Valid Email")
    } 
  }, [email, errorMessage2]);

// CONTACT NUMBER

useEffect(() => {

  if (contactNumber.length < MAX_LENGTH_CN) {
    setErrorMessage3("Format: 11 Digits");
  } else if (contactNumber.length > MAX_LENGTH_CN) {
    setErrorMessage3("The number exceeded the limit")
  }
}, [contactNumber, errorMessage3]);

// SHORT DESCRIPTION

useEffect(() => {
  if(concern.length < MAX_EXPLANATION) {
    setErrorMessage4("Give a short narrative of your concern")
  } else if (concern.length > MAX_EXPLANATION){
    setErrorMessage4("You have reached the maximum character limit")
  }
}, [concern, errorMessage4])

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Toaster />

      <div className="placeholder__wrapper">
        <div className="desc1">
          <p>
            {/* The name and photo associated with your Google account will be
            recorded when you upload files and submit this form. Your email is
            not part of your response. */}
            This online Student Assistance and Grievance Help Desk Form is created 
            by the PLM Supreme Student Council - Student Rights and Welfare Commission to assist the PLM students 
            with their concerns and to continue serving the demands of its constituents as the PLM community shifts all 
            transactions on digital platforms for the Academic Year 2020-2021. 
          </p>
          <p>
            Let the PLM-SSC STRAW Commissions know your urgent concerns or questions by simply filling out and submitting 
            this form (The student council and student directors from the PLM-SSC STRAW Commission may reach you through your 
            contact details to assist you further on your concern/s).
          </p>
          <p>
          The information that you will disclose with us will remain confidential until, with your consent, it is necessary 
          for taking action. #NagkakaisangPamantasan
          </p>
        </div>

        <Divider/>

        <h2 className="studentProfile">Student Profile</h2>

    <Box
      sx={{
        marginTop: '20px',
        flexFlow: 'row',
        width: 900,
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      
      {/*STUDENT NUMBER*/}
      <TextField
        fullWidth
        error={studentNumber.length > MAX_LENGTH_SN}
        helperText={errorMessage}
        label="Student Number"
        id="outlined-error"
        value={studentNumber}
        onChange={(e) => setstudentNumber(e.target.value)}
        inputProps={{
          type: "text",
          inputMode: "numeric",
          pattern: "[0-9]{9}",
        }}
        required
      />

      {/*EMAIL ADDRESS*/}
      <TextField
        fullWidth
        helperText={errorMessage2}
        label="Email Address"
        id="outlined-error"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        inputProps={{
          type: "text",
          pattern: ".*@plm.edu.ph$",
        }}
        required 
        />

      {/*CONTACT NUMBER*/}
      <TextField
        fullWidth
        error = {contactNumber.length > MAX_LENGTH_CN}
        helperText={errorMessage3}
        label="Contact Number"
        id="outlined-error"
        value={contactNumber}
        onChange={(e) => setcontactNumber(e.target.value)}
        inputProps={{
          type: "text",
          inputMode: "numeric",
          pattern: "[0-9]{11}",
        }}
        required
      />
      
    </Box>  



    <Box
      sx={{
        marginTop: '40px',
        marginBottom: '20px',
        flexFlow: 'row',
        width: 900,
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      {/*LAST NAME*/}
      <TextField
        fullWidth
        helperText={"Please enter your Last Name"}
        label="Last Name"
        id="outlined-error"
        value={lastName}
        onChange={(e) => setlastName(e.target.value)}
        required 
      />
      {/*FIRST NAME*/}
      <TextField
        fullWidth
        helperText={"Please enter your First Name"}
        label="First Name"
        id="outlined-error"
        value={firstName}
        onChange={(e) => setfirstName(e.target.value)}
        required 
      />
      {/*middle NAME*/}
       <TextField
        fullWidth
        helperText={"Please enter your Middle Name"}
        label="Middle Name"
        id="outlined-error"
        value={middleName}
        onChange={(e) => setmiddleName(e.target.value)}
      />
      
    </Box>  
    <Divider light/>

    
    <Box
      sx={{
        marginTop: '40px',
        marginBottom: '20px',
        flexFlow: 'row',
        width: 900,
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >

      {/*CURRENT COLLEGE*/}
      <FormControl 
         sx={{
          m: 1, 
          minWidth: 120,
          width: 900,
        }}>
        <InputLabel id="demo-simple-select-helper-label">Current College</InputLabel>
        <Select
          value={currentCollege}
          label="Current College"
          onChange={(e) => setcurrentCollege(e.target.value)}
          required
        >

          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"College of Architecture and Urban Planning"}>College of Architecture and Urban Planning</MenuItem>
          <MenuItem value={"College of Education"}>College of Education</MenuItem>
          <MenuItem value={"College of Engineering and Technology"}>College of Engineering and Technology</MenuItem>
          <MenuItem value={"College of Humanities, Arts, and Social Sciences"}>College of Humanities, Arts, and Social Sciences</MenuItem>
          <MenuItem value={"College of Law"}>College of Law</MenuItem>
          <MenuItem value={"College of Nursing"}>College of Nursing</MenuItem>
          <MenuItem value={"College of College of Physical Therapy"}>College of College of Physical Therapy</MenuItem>
          <MenuItem value={"College of Science"}>College of Science</MenuItem>
          <MenuItem value={"PLM Business School"}>PLM Business School</MenuItem>
          <MenuItem value={"PLM School of Government"}>PLM School of Government</MenuItem>
        </Select>
        <FormHelperText>Please choose your current college</FormHelperText>
      </FormControl>

      {/*CURRENT YEAR LEVEL*/}
      <FormControl 
         sx={{
          m: 1, 
          minWidth: 120,
          width: 900,
        }}>
        <InputLabel id="demo-simple-select-helper-label">Current Year Level</InputLabel>
        <Select
          value={currentYear}
          label="Current Year Level"
          onChange={(e) => setcurrentYear(e.target.value)}
          required
        >

          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"1st Year"}>1st Year</MenuItem>
          <MenuItem value={"2nd Year"}>2nd Year</MenuItem>
          <MenuItem value={"3rd Year"}>3rd Year</MenuItem>
          <MenuItem value={"4th Year"}>4th Year</MenuItem>
          <MenuItem value={"5th Year"}>5th Year</MenuItem>
          <MenuItem value={"6th Year"}>6th Year</MenuItem>
          <MenuItem value={"7th Year"}>7th Year</MenuItem>
        </Select>
        <FormHelperText>Please choose your current year level</FormHelperText>
      </FormControl>
    </Box>


    <Box
      sx={{
        marginTop: '40px',
        justifyContent: "space-between",
        marginBottom: '20px',
        flexFlow: 'row',
        width: 900,
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >

      {/*CLASSIFICATION OF CONCERNS*/}
      <FormControl 
         sx={{
          m: 1, 
          minWidth: 120,
          width: 900,

        }}>
        <InputLabel id="demo-simple-select-helper-label">Classification of Concern</InputLabel>
        <Select
          value={classConcern}
          label="Classification of Concern"
          onChange={(e) => setclassConcern(e.target.value)}
          required
        >

          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Grievances"}>Grievances</MenuItem>
          <MenuItem value={"Queries"}>Queries</MenuItem>
          <MenuItem value={"Suggestions"}>Suggestions</MenuItem>
        </Select>
        <FormHelperText>Please choose the correct classification</FormHelperText>
      </FormControl>

       {/*NATURE OF CONCERN*/}
      <FormControl 
         sx={{
          m: 1, 
          minWidth: 120,
          width: 900,

        }}>
        <InputLabel id="demo-simple-select-helper-label">Nature of Concern</InputLabel>
        <Select
          value={natureConcern}
          label="Nature of Concern"
          onChange={(e) => setnatureConcern(e.target.value)}
          required
        >

          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Academic"}>Academic</MenuItem>
          <MenuItem value={"Non-Academic"}>Non-Academic</MenuItem>
        </Select>
        <FormHelperText>Please choose the nature of concern</FormHelperText>
      </FormControl>
    </Box>

    {/*CONCERN*/}
    <Box sx={{
    marginTop: '40px',
    marginBottom: '20px',
    flexFlow: 'row',
    width: 900,
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    '& > :not(style)': { m: 1 },
    
  }}
  component="form"
  autoComplete="off"
  
  >
  <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Concern"
          helperText={errorMessage4}
          error={concern.length > MAX_EXPLANATION}
          multiline
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          minRows={5}
        />   
  </Box>

  </div>
      <div className="forInput">
        <button
          type="submit"
          style={{ background: loader ? "#ccc" : "#F4E12F", }}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;


