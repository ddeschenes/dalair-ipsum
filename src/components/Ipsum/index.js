import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'
import merge from 'lodash/merge'
import get from 'lodash/get'

const Ipsum = () => {
  const { file, allDataJson } = useStaticQuery(queryIpsum)
  const custom = get(allDataJson, 'edges[0].node.custom')
  const base = get(allDataJson, 'edges[0].node.default')

  const generator = new IpsumGenerator(merge(base, custom))
  console.log(generator.makeParagraph(5))

  return (
    <div>
      <div className="article">
        <div className="container">
          <div className="info">
            <h1>dalair ipsum</h1>
          </div>
          <div className="content">
            <Img fixed={file.childImageSharp.fixed} />
            <div className="mt-3 mb-3">{generator.makeParagraph(100)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const queryIpsum = graphql`
  query IpsumQuery {
    file(relativePath: { eq: "dalair-2.jpg" }) {
      childImageSharp {
        fixed(quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allDataJson(limit: 1000) {
      edges {
        node {
          custom
          default
        }
      }
    }
  }
`
export class IpsumGenerator {
  words = []
  constructor(words = []) {
    this.words = shuffle(words)
  }

  makeSentence() {
    let sentence = ''
    const nbWords = random(8, 20)
    for (let i = 0; i < nbWords; i++) {
      const word = this.chooseWord()
      sentence += ` ${word}`
    }
    return `${sentence.trim()}.`
  }

  makeParagraph(nbParagraphs = 1) {
    let paragraph = []

    for (let i = 0; i < nbParagraphs; i++) {
      const sentence = this.makeSentence()
      paragraph.push(<p>{sentence}.</p>)
    }
    return <blockquote>{paragraph}</blockquote>
  }

  chooseWord() {
    return this.words[random(0, this.words.length - 1)]
  }
}

export default Ipsum
