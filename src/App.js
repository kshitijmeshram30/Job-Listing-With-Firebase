import React, { useState, useEffect} from 'react';
import {Box, Grid,  ThemeProvider, CircularProgress, Button } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModel from "./components/Job/NewJobModel";
import fetchJobCustom from "./components/Job/JobCard";
import { firestore, app } from './firebase/config';
import {Close as CloseIcon } from '@material-ui/icons'

export default() => {
  const [jobs, setJobs]= useState([]);
  const [loading, setLoading]= useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [newJobModel, setNewJobModel] = useState(false);

  const fetchJobs = async() => {
    setCustomSearch(false);
    setLoading(true);
    const req = await firestore
    .collection("jobs")
    .orderBy("postedOn", "desc")
    .get();
  const tempJobs = req.docs.map((job) => ({
    ...job.data(),
    id: job.id,
    postedOn: job.data().postedOn.toDate(),
  }));
  setJobs(tempJobs);
  setLoading(false);
  };

  const fetchJobCusom = async jobSearch => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
    .collection("jobs")
    .orderBy("postedOn", "desc")
    .where("location", '==', jobSearch.location)
    .where("type", '==', jobSearch.type)
    .get();
  const tempJobs = req.docs.map((job) => ({
    ...job.data(),
    id: job.id,
    postedOn: job.data().postedOn.toDate(),
  }));
  setJobs(tempJobs);
  setLoading(false);
  }

  const postJob = async jobDetails => {
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    });
    fetchJobs();
  }; 

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
  <ThemeProvider theme = {theme} >
    <Header openNewJobModel={() => setNewJobModel(true)} />
    <NewJobModel closeModel={() => setNewJobModel(false)} 
    NewJobModel={NewJobModel}
    postJob={postJob}
    />
    <Box mb={3}>
    <Grid container justify="center">
      <Grid item xs={10}>
        <SearchBar fetchJobCustom={fetchJobCustom} />
        {loading ? (
          <Box display="flex" justifyContent="center"> <CircularProgress /> </Box>
        ): (
          <>
          {customSearch && (
            <Box my={2} display="flex" justifyContent="flex-end">
          <Button onClick={fetchJobs}>
            <CloseIcon size={20} />
            Custom Search
          </Button>
          </Box>
          )}
          {jobs.map((job) => (
            <JobCard key={job.id} {...job}/>)
          )}
        </>
        )}
      </Grid>
    </Grid>
    </Box>
  </ThemeProvider>
  );
};