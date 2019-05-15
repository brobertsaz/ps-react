import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Bills = props => (
  <Query
    query={gql`
      {
        allBills(first: 30) {
          nodes {
            id
            number
            title
            breakdown
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      console.log(props)
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :</p>
      return data.allBills.nodes.map(({ id, number, title, breakdown }) => (
        <div className="container">
          <div className="card mt-3" key={id}>
            <div className="card-body">
              <h5 className="card-title">{number}</h5>
              <p className="card-text">{title}</p>
              <p className="card-text">{ReactHtmlParser(breakdown)}</p>
              <Link to={`/bill/${id}`}>View</Link>
            </div>
          </div>
        </div>
      ))
    }}
  </Query>
)
export default Bills
