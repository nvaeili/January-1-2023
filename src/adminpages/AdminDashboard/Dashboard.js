import React, { useEffect, useState, useMemo } from "react";
import "./Dashboard.css";
// import {TableCell, TableRow, Table, TableHead, TableContainer, TableBody, ListItem} from "@mui/material";
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar,} from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import  {firebaseApp, db} from '../../firebase';
import DataGridCustomToolbar from '../../components/ComponentTools/DataGridCustomToolbar';

import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import MiniDrawer from "./AdminSidebar";

const drawerWidth = 240;

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

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

  React.useEffect(() => {
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


const Dashboard = () => {
  
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  // const [searchInput, setSearchInput] = useState("");
  // const [dark, setDark] = useState(true);

  // const darkTheme = useMemo (() => createTheme({
  //   palette: {
  //     mode: dark ? 'dark' : 'light'
  //   }

  // }), [dark])

  // const handleLogout = () => {
  //   firebaseApp.auth().signOut();
  // };


  const columns = [
    // {field: "No.", headerName: "No.", width:70},
    // {field: "id", headerName:"ID", width: 130},
    {field: "studentnumber", headerName:"Student Number", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "lastName", headerName:"Last Name", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "firstName", headerName:"First Name", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "middleName", headerName:"iddle Name", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "email", headerName:"Email", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "contactnumber", headerName:"Contact Number", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "collegeyear", headerName:"College Year", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "currentyear", headerName:"Current Year", width: 130, renderCell: renderCellExpand,editable: true},
    {field: "classificationconcern", headerName:"COC", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "natureconcern", headerName:"NOC", width: 130, renderCell: renderCellExpand, editable: true},
    // {field: "aboutconcern", headerName:"About Concern", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "concern", headerName:"Concern", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "status", headerName:"Status", width: 130, renderCell: renderCellExpand, editable: true},
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
    // <div>HELLO WORLD</div>
    <>
    <MiniDrawer/>
    <div className="table-container" style={{height: "500px", width: ""}}>

      {/* <button className="logoutButton" onClick={handleLogout}>Logout</button> */}
      
      {/* <h1>Answers:</h1> */}
     {/* <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          value={search}
          onChange={handleSearch}
        /> */}
    
    {/* <DataGrid
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
    /> */}
    </div> 
    </>
)}
export default Dashboard;