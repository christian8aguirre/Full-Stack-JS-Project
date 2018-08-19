import React from 'react';
import {Link} from 'react-router-dom'

export default class JobListings extends React.Component {

  render(){
    return   <div className="page page--jobslist">
        <h2>Job Listings</h2>
        <div className="job-listing">
          <h3 className='job-listing__title'>Title</h3>
          <p className='job-listing__location'>Location</p>
          <button className='job_listing__view-job-btn'>See More</button>
          <hr className='job-listing__divider'></hr>
        </div>
        <div className="job-listing">
          <h3 className='job-listing__title'>Title</h3>
          <p className='job-listing__location'>Location</p>
          <button className='job_listing__view-job-btn'>See More</button>
          <hr className='job-listing__divider'></hr>
        </div>
        <div className="job-listing">
          <h3 className='job-listing__title'>Title</h3>
          <p className='job-listing__location'>Location</p>
          <button className='job_listing__view-job-btn'>See More</button>
          <hr className='job-listing__divider'></hr>
        </div>
        
      </div>
  }
}
