import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'
import merge from 'lodash/merge'
import get from 'lodash/get'

import './style.scss'

const Ipsum = () => {
  const { file, allDataJson } = useStaticQuery(queryIpsum)
  const custom = get(allDataJson, 'edges[0].node.custom')
  const base = get(allDataJson, 'edges[0].node.default')

  const generator = new IpsumGenerator(merge(base.slice(base.length), custom))

  return (
    <div>
      <div className="article">
        <div className="container">
          <div className="info">
            <h2>
              Mettez du Dalair dans votre lorem ipsum et essayez notre
              générateur !
            </h2>
          </div>
          <div className="content">
            <div class="row">
              <div class="col">
                <Img fixed={file.childImageSharp.fixed} />
              </div>
              <div class="col align-self-center section-ipsum">
                <form>
                  <div className="form-group">
                    <label for="input-paragraph">Paragraphes</label>
                    <input
                      type="number"
                      className="form-control"
                      id="input-paragraph"
                      placeholder="Entre ton nombre de paragraphes"
                    />
                  </div>
                  <div className="form-check pt-2 pb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="check-dalair"
                    />
                    <label className="form-check-label" for="check-dalair">
                      Dalair seulement
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    Dalair Ipsum
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-3 mb-3">{generator.makeParagraph(5)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const queryIpsum = graphql`
  query IpsumQuery {
    file(relativePath: { eq: "dalair-square.jpg" }) {
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
    const nbWords = random(6, 10)
    for (let i = 0; i < nbWords; i++) {
      const word = this.chooseWord()
      sentence += ` ${word}`
    }
    return `${sentence.trim()}.`
  }

  makeParagraph(nbParagraphs = 1) {
    let paragraphes = []
    for (let i = 0; i < nbParagraphs; i++) {
      const nbSentences = random(3, 7)
      let sentences = ''
      for (let j = 0; j < nbSentences; j++) {
        sentences += `${this.makeSentence().trim()} `
      }
      paragraphes.push(<p key={i}>{sentences}</p>)
    }
    return <blockquote>{paragraphes}</blockquote>
  }

  chooseWord() {
    return this.words[random(0, this.words.length - 1)]
  }
}

export default Ipsum
