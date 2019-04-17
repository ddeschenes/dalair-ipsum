import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'

const Meta = ({ site, title }) => {
  const siteTitle = get(site, 'title')
  title = title ? `${title} | ${siteTitle}` : siteTitle
  return (
    <Helmet
      title={title}
      meta={[
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:description',
          content: get(site, 'description'),
        },
        {
          property: 'og:url',
          content: `${get(site, 'url')}`,
        },
        {
          property: 'og:image',
          content: `${get(site, 'url')}/img/android-chrome-192x192.png`,
        },
      ]}
    />
  )
}
export default Meta
