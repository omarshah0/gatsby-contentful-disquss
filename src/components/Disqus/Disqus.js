import React from "react"
import { DiscussionEmbed } from "disqus-react"

function Disqus({ slug, title }) {
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  }
  return (
    <div>
      <DiscussionEmbed {...disqusConfig} />
    </div>
  )
}

export default Disqus
