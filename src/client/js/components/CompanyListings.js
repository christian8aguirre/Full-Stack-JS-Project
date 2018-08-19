import React from 'react';

export default class Companies  extends React.Component {

  render(){
    return   <div className="page page--companies">
        <h2>Companies</h2>
        <div className="company-listing">
          <h3 className='company-listing__title'>Title</h3>
          <p className='company-listing__subtitle'>Subtitle</p>
          <p className='company-listing__description'>Description</p>
          <button className='company-listing__view-company-btn'>See More</button>
          <hr className='job-listing__divider'></hr>
        </div>
        <div className="company-listing">
          <h3 className='company-listing__title'>Title</h3>
          <p className='company-listing__subtitle'>Subtitle</p>
          <p className='company-listing__description'>Description</p>
          <button className='company-listing__view-company-btn'>See More</button>
          <hr className='job-listing__divider'></hr>
        </div>
        <div className="company-listing">
          <h3 className='company-listing__title'>Title</h3>
          <p className='company-listing__subtitle'>Subtitle</p>
          <p className='company-listing__description'>Description</p>
          <button className='company-listing__view-company-btn'>See More</button>
          <hr className='job-listing__divider'></hr>
        </div>
      </div>
  }
}
