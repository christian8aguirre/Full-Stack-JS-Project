import React from 'react';
import {Link} from 'react-router-dom';
import Job from './JobCard';
import request from 'superagent';

export default class JobListings extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      jobsApiData : []
    }
  }

  componentWillMount(){
    request
    .get('/api/jobs')
    .then(serverRes =>{
      this.setState({
        jobsApiData: serverRes.body
      })
    })
  }

  render(){
    const listingsJobData = this.state.jobsApiData
    return   <div className="page page--jobslist">
        <h2>Job Listings</h2>
        {/* render JobCard components here ... */}
        {listingsJobData.map(listingJobDataObj =>{
          return < Job
            {...listingJobDataObj}
            key = {listingJobDataObj.id+listingJobDataObj.name}
          />
        })}
      </div>
  }
}
