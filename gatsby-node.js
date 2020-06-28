/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const moment = require('moment')


const date = moment().format("YYYYMMMMDD")+''

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    
    const data = await graphql(`
        query($dayId: String!){
            allMongodbTestTabledatas(filter: {day: {eq: $dayId }}) {
                edges {
                    node {
                    id
                    day
                    data
                }
            }
        }
    
    }
    `,{dayId: date})

    console.log(data)

    createPage({
        path: `/`,
        component: path.resolve(`./src/views/index.jsx`),
        // The context is passed as props to the component as well
        // as into the component's GraphQL query.
        context: {
          allData: data,
        }
    })

    

}