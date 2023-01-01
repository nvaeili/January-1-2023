import React, { useEffect, useState } from "react";
import { db, firebaseApp } from "../../firebase";
import "./Dashboard.css";
// import {TableCell, TableRow, Table, TableHead, TableContainer, TableBody, ListItem} from "@mui/material";

import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';  
import DataGridCustomToolbar from '../../components/ComponentTools/DataGridCustomToolbar';
import SearchBar from "material-ui-search-bar";


function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
};


const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);




  // LOGIC FOR HOVERING IN THE TABLE TO SHOW FULL TEXT
  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: 1,
        height: 1,
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.string.isRequired,
};


const Completed = () => {
  
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState();
  // const [rows, setRows] = useState(originalRows)
  const requestSearch = searchedVal => {
    const filteredRows = rows.filter(row => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase())
    })
    setSearch(filteredRows)
  }

  function cancelSearch() {
    setSearch("");
    requestSearch(search);
  }
  const handleLogout = () => {
    firebaseApp.auth().signOut();
  };

  const columns = [
    // {field: "No.", headerName: "No.", width:70},
    // {field: "id", headerName:"ID", width: 130},
    {field: "status", headerName:"Status", width: 130, renderCell: renderCellExpand,type: 'singleSelect', valueOptions:['Pending', 'Fulfilled', 'Rejected'], editable: true, id: <firebase-auto-generated-id></firebase-auto-generated-id>},

    {field: "studentnumber", headerName:"StudentNumber", width: 130, renderCell: renderCellExpand, editable: false},
    {field: "lastName", headerName:"Last Name", width: 130, renderCell: renderCellExpand, editable: false},
    {field: "firstName", headerName:"First Name", width: 130, renderCell: renderCellExpand, editable: false},
    {field: "middleName", headerName:"Middle Name", width: 130, renderCell: renderCellExpand, editable: false},
    {field: "email", headerName:"Email", width: 130, renderCell: renderCellExpand, editable: false},
    {field: "contactnumber", headerName:"Contact Number", width: 130, renderCell: renderCellExpand, editable: false},
    {field: "collegeyear", headerName:"College Year", width: 130, renderCell: renderCellExpand, editable: false},
    {field: "currentyear", headerName:"Current Year", width: 130, renderCell: renderCellExpand,editable: false},
    {field: "classificationconcern", headerName:"COC", width: 130, renderCell: renderCellExpand, editable: false},
    {field: "natureconcern", headerName:"NOC", width: 130, renderCell: renderCellExpand, editable: false},
    // {field: "aboutconcern", headerName:"About Concern", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "concern", headerName:"Concern", width: 300, renderCell: renderCellExpand, editable: false},
  ]

  const rows = posts.map((row) => ({

    id: row.id,
    studentnumber: row.StudentNumber,
    firstName: row.firstName,
    lastName: row.lastName,
    middleName: row.middleName,
    email: row.Email,
    contactnumber: row.ContactNumber,
    collegeyear: row.CurrentCollege,
    currentyear: row.CurrentYear,
    classificationconcern: row.ClassificationConcern,
    natureconcern: row.NatureConcern,
    aboutconcern: row.AboutConcern,
    concern: row.Concern,
    status: row.Status


  }))
   

  useEffect(() => {
    const posts = [];
    // const subscriber = db.collection("forms").orderBy('ClassificationConcern', 'asc').onSnapshot((querySnapshot) => {
    const subscriber = db.collection("forms").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        posts.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setPosts(posts);
    });

    // return cleanup function
    return () => subscriber();
  }, [db]); 

const handleSearch = (event) => {
  setSearch(event.target.value);
};



  return (

    <div className="table-container" style={{height: "500px", width: ""}}>
      {/* <h1>Answers:</h1> */}
     {/* <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          value={search}
          onChange={handleSearch}
        /> */}

    <DataGrid
        sx={{
          justifyContent: 'center',
          boxShadow: 2,
          borderColor: 'primary.',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      rows={rows} 
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      experimentalFeatures={{ newEditingApi: true }}
      components={{
        Toolbar: DataGridCustomToolbar,
      }}
    
    
    />
    </div>
)}
export default Completed;