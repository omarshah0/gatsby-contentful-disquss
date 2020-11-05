import React from "react"
import Layout from "../layout"
import { graphql } from "gatsby"
import SEO from "../seo"
import Img from "gatsby-image"
import Disqus from "../Disqus/Disqus"
import "./Recipe.css"

export const query = graphql`
  query($slug: String!) {
    recipe: contentfulRecipe(slug: { eq: $slug }) {
      title
      recipeDescription {
        recipeDescription
      }
      serves
      prepTime
      cookTime
      thumbnail {
        fluid(toFormat: WEBP) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
      ingredients {
        quantity
        ingredientName {
          ingredientName
        }
      }
      stepsForCooking {
        title
        stepDetail {
          stepDetail
        }
        description {
          description
        }
        image {
          fluid(toFormat: WEBP) {
            ...GatsbyContentfulFluid
          }
        }
      }
      author {
        name
        facebook
        twitter
      }
      seo {
        title
        metaDescription {
          metaDescription
        }
      }
      slug
      createdAt
    }
  }
`
function RecipeLayout({ data: { recipe } }) {
  console.log(recipe)
  const rawDate = new Date(recipe.createdAt)
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const outputDate = rawDate.toLocaleDateString(undefined, options)

  return (
    <Layout>
      <SEO
        title={recipe.seo.title}
        description={recipe.seo.metaDescription.metaDescription}
        author={recipe.author.twitter}
        imageURL={recipe.thumbnail.file.url}
      />
      <div className="container first">
        <div className="recipe__info">
          <h1 className="recipe__info__title">{recipe.title}</h1>
          <div className="creator__info">
            <img
              className="recipe__info__creator__image"
              src="https://picsum.photos/200"
              alt="Creator"
            ></img>
            <div className="creator__info__avatar">
              <p>{recipe.author.name}</p>
              <span>{outputDate}</span>
            </div>
          </div>
          <p>{recipe.recipeDescription.recipeDescription}</p>
          <div className="recipe__timing">
            <div>
              <h2>Serves</h2>
              <p>{recipe.serves}</p>
            </div>
            <div>
              <h2>Prep Time</h2>
              <p>{recipe.prepTime}</p>
            </div>
            <div>
              <h2>Cook Time</h2>
              <p>{recipe.cookTime}</p>
            </div>
          </div>
        </div>
        <div className="recipe__image">
          <Img fluid={recipe.thumbnail.fluid} alt={recipe.title} />
        </div>
      </div>
      {/* //////////////////////////////////// */}
      <div className="container column">
        <h2>Ingredients</h2>
        {recipe.ingredients.map((ingredient, key) => (
          <div className="ingredients" key={key}>
            <p className="ingredient__quantity">{ingredient.quantity}</p>
            <p className="ingredient__name">
              {ingredient.ingredientName.ingredientName}
            </p>
          </div>
        ))}
      </div>
      {/* //////////////////////////////////// */}
      {recipe.stepsForCooking.map((step, index) => (
        <div className="container" key={index}>
          <div className="recipe__info">
            <h2 className="recipe__step">
              <span>{index + 1}.</span>
              {step.description.description}
            </h2>
            {step.stepDetail && (
              <p className="recipe__description">
                {step.stepDetail.stepDetail}
              </p>
            )}
          </div>
          {step.image.fluid.src && (
            <div className="recipe__image">
              <Img fluid={step.image.fluid} alt={step.description} />
            </div>
          )}
        </div>
      ))}
      {/* ///////////////////////////////////////////// */}
      <div style={{ width: "98%", marginTop: "1rem" }}>
        <Disqus title={recipe.title} slug={`recipe/${recipe.slug}`} />
      </div>
    </Layout>
  )
}

export default RecipeLayout
