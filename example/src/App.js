import React, { Component } from 'react'

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
          <div className='star'>
          </div>
        </div>
      </main>
    )
  }
}
