import React from 'react';
import Company from './CompanyCard';
import request from 'superagent';

export default class CompanyListings  extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      companyApiData : []
    }
  }

  componentWillMount(){
    request
    .get('/api/companies')
    .then(serverRes =>{
      this.setState({
        companyApiData: serverRes.body
      })
    })
  }
  render(){
    const companylistings = this.state.companyApiData
    return   <div className="page page--companies">
        <h2>Companies</h2>
        {companylistings.map(companylistingsObj => {
          return <Company 
            {...companylistingsObj}
            key = {companylistingsObj.id}
          />
          })
        }
      </div>
  }
}
