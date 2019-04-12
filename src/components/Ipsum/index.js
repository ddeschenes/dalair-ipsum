import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'

const Ipsum = () => {
  const { file } = useStaticQuery(query)

  return (
    <div>
      <div className="article">
        <div className="container">
          <div className="info">
            <h1>Hello gatsby-image</h1>
          </div>
          <div className="content">
            <Img fixed={file.childImageSharp.fixed} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query DalairQuery {
    file(relativePath: { eq: "dalair-2.jpg" }) {
      childImageSharp {
        fixed(quality: 100) {
          ...GatsbyImageSharpFixed
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
    const nbWords = random(8, 14)
    for (let i = 0; i < nbWords; i++) {
      const word = this.chooseWord()
      sentence += ` ${word}`
    }
    return `${sentence.trim()}.`
  }

  makeParagraph(nbParagraphs = 1) {
    let paragraph = ''
    for (let i = 0; i < nbParagraphs; i++) {
      const sentence = this.makeSentence()
      paragraph += ` ${sentence}.`
    }
    return `${paragraph.trim()}`
  }

  chooseWord() {
    return this.words[random(0, this.words.length - 1)]
  }
}

export default Ipsum
