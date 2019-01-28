import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import GoalChart from '../components/GoalChart'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const chartData = posts.map(post => {
      return post.node.frontmatter
    })

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <GoalChart posts={chartData} />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <div><small>{node.frontmatter.date}</small></div>
              <div><small>M: {node.frontmatter.morningbrush ? 'Y': 'N'}, E: {node.frontmatter.eveningbrush ? 'Y' : 'N'}, W: {node.frontmatter.watergoal ? 'Y' : 'N'}, A: {node.frontmatter.avoidedalchohol ? 'Y' : 'N'}, Ex: {node.frontmatter.exercised ? 'Y' : 'N'}, Z: {node.frontmatter.bedtime}</small></div>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            morningbrush
            eveningbrush
            watergoal
            avoidedalchohol
            exercised
            bedtime
          }
        }
      }
    }
  }
`
