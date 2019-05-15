import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const BILL_QUERY = gql`
  query BillQuery($billId: ID!) {
    bill(id: $billId) {
      id
      number
      title
      breakdown
    }
  }
`

class Bill extends Component {
  render() {
    console.log(this.props.match.params)
    return (
      <Query
        query={BILL_QUERY}
        variables={{ billId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          return (
            <div className="container">
              <div className="card mt-3" key={data.bill.id}>
                <div className="card-body">
                  <h5 className="card-title">{data.bill.number}</h5>
                  <p className="card-text">{data.bill.title}</p>
                  <p className="card-text">
                    {ReactHtmlParser(data.bill.breakdown)}
                  </p>
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Bill
