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
  words = []

  constructor(props) {
    super(props)

    this.state = {
      dalairOnly: true,
      nbParagraphes: '',
      submitted: false,
      previous: <div />,
    }

    this.handleParagraphChange = this.handleParagraphChange.bind(this)
    this.handleDalairOnlyChange = this.handleDalairOnlyChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleParagraphChange(event) {
    this.setState({ submitted: false, nbParagraphes: event.target.value })
  }

  handleDalairOnlyChange(event) {
    const checked = event.target.checked
    this.setState({ submitted: false, dalairOnly: checked })
    this.words = checked
      ? this.customWords.slice()
      : this.customWords.concat(this.baseWords)
  }

  handleFormSubmit(event) {
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
          this.words = this.state.dalairOnly
            ? this.customWords.slice()
            : this.customWords.concat(this.baseWords)
          return (
            <div>
              <div className="article">
                <div className="container">
                  <div className="info">
                    <h2>
                      Mets du Dalair dans ton lorem ipsum et essayes le
                      générateur !
                    </h2>
                  </div>
                  <div className="content">
                    <div className="row">
                      <div className="col">
                        <Img fixed={file.childImageSharp.fixed} />
                      </div>
                      <div className="col align-self-center section-ipsum">
                        {this.showForm()}
                      </div>
                    </div>
                    {this.showIpsum()}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      />
    )
  }
  showForm() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <i>
          Yes sir Miller&nbsp;! V'là un lorem ipsum à mon image&nbsp;!
          Essayes-le&nbsp;!
        </i>
        <div className="form-group pt-3">
          <label htmlFor="input-paragraph">Paragraphes</label>
          <input
            type="number"
            className="form-control"
            max="99"
            min="1"
            maxLength="2"
            required="{true}"
            id="input-paragraph"
            placeholder="Entre ton nombre de paragraphes"
            value={this.state.nbParagraphes}
            onChange={this.handleParagraphChange}
          />
        </div>
        <div className="form-check pt-2 pb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="check-dalair"
            checked={this.state.dalairOnly}
            onChange={this.handleDalairOnlyChange}
          />
          <label className="form-check-label" htmlFor="check-dalair">
            Dalair seulement
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Dalair Ipsum
        </button>
      </form>
    )
  }
  showIpsum() {
    return (
      (this.state.submitted && (
        <div className="mt-3 mb-3">
          {
            (this.previous = this.ipsumGenerator.generate(
              this.words,
              this.state.nbParagraphes
            ))
          }
        </div>
      )) || <div className="mt-3 mb-3">{this.previous}</div>
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
  PONCTUATIONS = ['!', '.', '?', ';']
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
    return this.appendEol(sentence)
  }

  appendEol(sentence) {
    const eol = this.PONCTUATIONS.some(punctuation =>
      sentence.endsWith(punctuation)
    )
    return eol ? sentence.trim() : `${sentence.trim()}.`
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
