const { Model } = require('objection')

class Job extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'jobs';
  }

  static get relationMappings(){
    const Company = require('./Company.js')

    return{
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'jobs.company_id',
          to: 'companies.id'
          }
        }
      }
    }
  }

  module.exports = Job