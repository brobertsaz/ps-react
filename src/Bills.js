import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const BILLS_QUERY = gql`
  query BillsQuery($first: Int) {
    allBills(first: $first) {
      nodes {
        id
        number
        title
        breakdown
      }
    }
  }
`

class Bills extends Component {
  render() {
    return (
      <div className='container'>
        <Query query={BILLS_QUERY} variables={{ first: 30 }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            return data.allBills.nodes.map(
              ({ id, number, title, breakdown }) => (
                <div className='container'>
                  <div className='card mt-3' key={id}>
                    <div className='card-body'>
                      <h5 className='card-title'>{number}</h5>
                      <p className='card-text'>{title}</p>
                      <p className='card-text'>{ReactHtmlParser(breakdown)}</p>
                      <Link to={`/bill/${id}`}>View</Link>
                    </div>
                  </div>
                </div>
              )
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Bills
