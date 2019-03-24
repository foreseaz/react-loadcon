import React, { Component } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import LoadCon from 'react-loadcon'

export default class App extends Component {
  state = {
    status: 'normal',
    type: 'pie',
    percentage: 0
  }

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value })
    e.preventDefault()
  }

  asyncLoading = (hasError = false) => {
    this.setState({ status: 'active', percentage: 0 })

    const promise = new Promise((resolve, reject) => {
      let inter = setInterval(() => {
        const { percentage } = this.state

        let p = percentage + Math.random() * 1000 % 10
        p = p >= 100 ? 100 : p
        if (hasError && p > 70) {
          clearInterval(inter)
          reject()
        }
        if (p === 100) {
          clearInterval(inter)
          this.setState({ status: 'normal' })
          resolve()
        }

        this.setState({ percentage: p })
      }, 200)
    })

    return promise
  }

  raiseException = () => {
    this.asyncLoading(true).catch(e => {
      this.setState({ status: 'exception' })
      setTimeout(() => {
        this.setState({ status: 'normal' })
      }, 1500)
    })
  }

  raiseSuccess = () => {
    this.asyncLoading().then(() => {
      this.setState({ status: 'success' })
      setTimeout(() => {
        this.setState({ status: 'normal' })
      }, 1500)
    })
  }

  updateStatus = (status) => {
    this.setState({ status })
  }

  normalDoc = () => `\
  import React, { Component } from 'react'
  import LoadCon from 'react-loadcon'

  export default class ExampleComponent extends Component {
    state = {
      percentage: 0,    // isRequired
      status: 'normal', // oneOf(['normal', 'active', 'exception', 'success'])
      type: 'pie',      // oneOf(['pie', 'donut'])
    }

    componentDidMount () {
      this.apiCall()
    }

    apiCall = () => {
      this.setState({ status: 'active' })
      fetch(url)
        .then(res => return res.json())
        .then(data => {
          // normal loading
          this.setState({ status: 'normal' })

          // loading with success
          this.setState({ status: 'success' })
          setTimeout(() => {
            this.setState({ status: 'normal' })
          }, 1500)
        })
        .catch(e => {
          this.setState({ status: 'exception' })
          setTimeout(() => {
            this.setState({ status: 'normal' })
          }, 1500)
        })
    }

    render () {
      return (
        <LoadCon
          percentage={this.state.percentage}
          status={this.state.status}
          type={this.state.type}
        />
      )
    }
  }\
  `

  render () {
    return (
      <main className='container'>
        <LoadCon
          percentage={this.state.percentage}
          status={this.state.status}
          type={this.state.type}
        />
        <header className='nav'>
          <span className='title'>React LoadCon</span>
          <a
            className='github-button'
            href='https://github.com/foreseaz/react-loadcon'
            data-icon='octicon-star'
            data-size='large'
            data-show-count='true'
            aria-label='Star foreseaz/react-loadcon on GitHub'
          >
            Star
          </a>
        </header>
        <div className='control'>
          <div>
            <label>Favicon loading type:</label>
            <div className='select-wrapper'>
              <select value={this.state.type} onChange={this.handleTypeChange}>>
                <option value='pie'>Pie</option>
                <option value='donut'>Donut</option>
              </select>
            </div>
          </div>
          <div className='btns'>
            <button
              onClick={() => this.asyncLoading()}
            >
              Start Loading
            </button>
            <button
              onClick={this.raiseSuccess}
              className='success'
            >
              Loading Success
            </button>
            <button
              onClick={this.raiseException}
              className='error'
            >
              Loading Error
            </button>
          </div>
          <div>
            <SyntaxHighlighter
              language='javascript'
              style={atomOneDark}
              showLineNumbers
            >
              {this.normalDoc()}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className='author'>
          Foreseaz | 2019
        </div>
      </main>
    )
  }
}
