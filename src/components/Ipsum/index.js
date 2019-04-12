import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'
import merge from 'lodash/merge'
import get from 'lodash/get'

import './style.scss'

export class Ipsum extends Component {
  ipsumGenerator = new IpsumGenerator()
  customWords = []
  baseWords = []

  constructor(props) {
    super(props)

    this.state = { dalairOnly: false, nbParagraphes: 0, submitted: false }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ submitted: false, nbParagraphes: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ submitted: true })
  }

  render() {
    return (
      <StaticQuery
        query={queryIpsum}
        render={data => {
          const { file, allDataJson } = data
          this.customWords = get(allDataJson, 'edges[0].node.custom')
          this.baseWords = get(allDataJson, 'edges[0].node.default')
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
                    <div className="row">
                      <div className="col">
                        <Img fixed={file.childImageSharp.fixed} />
                      </div>
                      <div className="col align-self-center section-ipsum">
                        <form onSubmit={this.handleSubmit}>
                          <i>
                            Yes sir Miller&nbsp;! V'là un lorem ipsum à mon
                            image&nbsp;! Essayes-le&nbsp;!
                          </i>
                          <div className="form-group pt-3">
                            <label htmlFor="input-paragraph">Paragraphes</label>
                            <input
                              type="number"
                              className="form-control"
                              id="input-paragraph"
                              placeholder="Entre ton nombre de paragraphes"
                              value={this.state.nbParagraphes}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-check pt-2 pb-2">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="check-dalair"
                              value={this.state.dalairOnly}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="check-dalair"
                            >
                              Dalair seulement
                            </label>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary mt-2"
                          >
                            Dalair Ipsum
                          </button>
                        </form>
                      </div>
                    </div>
                    {this.state.submitted && (
                      <div className="mt-3 mb-3">
                        {this.ipsumGenerator.generate(
                          this.customWords,
                          this.state.nbParagraphes
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      />
    )
  }
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

  generate(words = [], nbParagraphes) {
    this.words = shuffle(words)
    return this.makeParagraph(nbParagraphes)
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
