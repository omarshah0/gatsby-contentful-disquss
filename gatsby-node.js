exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    {
      allContentfulRecipe {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic("Error Loading Recipes", JSON.stringify(result.errors))
  }

  result.data.allContentfulRecipe.nodes.forEach(recipe => {
    actions.createPage({
      path: `/recipe/${recipe.slug}/`,
      component: require.resolve(
        "./src/components/RecipeLayout/RecipeLayout.js"
      ),
      context: {
        slug: recipe.slug,
      },
    })
  })
}
