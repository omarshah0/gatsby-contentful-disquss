import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

function Home() {
  const rawData = useStaticQuery(graphql`
    query MyQuery {
      allContentfulRecipe {
        nodes {
          title
          recipeDescription {
            recipeDescription
          }
          thumbnail {
            fluid(toFormat: WEBP) {
              ...GatsbyContentfulFluid
            }
          }
          author {
            facebook
            twitter
            name
          }
          slug
        }
      }
    }
  `)
  const data = rawData.allContentfulRecipe.nodes
  console.log(data)
  return (
    <div className="home">
      {data.map((recipe, index) => (
        <div className="container max column no__padding" key={index}>
          <div className="card__image">
            <Link to={`/recipe/${recipe.slug}`}>
              <Img fluid={recipe.thumbnail.fluid} alt={recipe.title} />
            </Link>
          </div>
          <div className="card__info">
            <div className="card__title">
              <Link to={`/recipe/${recipe.slug}`}>
                <h2>{recipe.title}</h2>
              </Link>
            </div>
            <div className="creator__info">
              <img
                className="recipe__info__creator__image"
                src="https://picsum.photos/200"
                alt="Creator"
              ></img>
              <div className="creator__info__avatar">
                {/* ////////////////////////////////////////////// */}
                {recipe.author.twitter ? (
                  <a
                    href={`https://www.twitter.com/${
                      recipe.author.twitter.split("@")[1]
                    }`}
                    target="__blank"
                  >
                    Omar Farooq
                  </a>
                ) : (
                  <p>{recipe.author.name}</p>
                )}
                {/* ////////////////////////////////////////////// */}
                {recipe.author.facebook && (
                  <a href={recipe.author.facebook} target="__blank">
                    Facebook
                  </a>
                )}
                {recipe.author.twitter && (
                  <a
                    href={`https://www.twitter.com/${
                      recipe.author.twitter.split("@")[1]
                    }`}
                    target="__blank"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>
            <div className="card__description">
              <p>{recipe.recipeDescription.recipeDescription}</p>
            </div>
            <div className="card__click">
              <Link to={`/recipe/${recipe.slug}`}>View Now</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
