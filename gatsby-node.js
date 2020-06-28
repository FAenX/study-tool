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

    createPage({
        path: `/`,
        component: path.resolve(`./src/views/index.jsx`),
        // The context is passed as props to the component as well
        // as into the component's GraphQL query.
        context: {
          dayId: date,
        }
    })
}

exports.createResolvers = ({ createResolvers, actions }) => {
  const resolvers = {
    
    Mutation: {
      updateTable: {
        type: [`mongodbTestTabledatas`],
        resolve: (source, args, context, info) => {
          ///////
          
          const posts = context.nodeModel.getAllNodes({ type: `mongodbTestTabledatas` })
          console.log(context, info)
          return posts
        }
      }
    }
  }
  createResolvers(resolvers)
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions

  const typeDefs = `
    type Mutation
  `
  createTypes(typeDefs)
}