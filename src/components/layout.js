/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header siteTitle="Home" />
      <main>{children}</main>
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            display: "block",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#595959",
            marginBottom: "1rem",
          }}
        >
          Data powered by{" "}
          <span style={{ fontSize: "18px", fontWeight: "600" }}>
            Contentful ❤
          </span>
        </span>
        <span
          style={{
            display: "block",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#595959",
            marginBottom: "0.9rem",
          }}
        >
          Comments powered by{" "}
          <span style={{ fontSize: "18px", fontWeight: "600" }}>Disqus ❤</span>
        </span>
      </div>
      <Footer siteTitle="Home" />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
