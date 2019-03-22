import React, { Component } from 'react'

import LoadCon from 'react-loadcon'

export default class App extends Component {
  state = {
    status: 'normal',
    type: 'donut',
    percentage: 0
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
      <div>
        <LoadCon
          percentage={this.state.percentage}
          status={this.state.status}
          type={this.state.type}
        />

        <button onClick={() => this.asyncLoading()}>start loading</button>
        <button onClick={this.raiseException}>loading error</button>
        <button onClick={this.raiseSuccess}>loading success</button>
      </div>
    )
  }
}
