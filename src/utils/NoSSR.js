import React, { Component } from 'react'

const DefaultOnSSR = () => (<span></span>)

class NoSSR extends Component {
  state = {
    canRender: false
  }

  componentDidMount() {
    this.setState({ canRender: true })
  }

  render() {
    const { children, onSSR = <DefaultOnSSR />} = this.props

    return (
      <React.Fragment>
        {this.state.canRender ? children : onSSR}
      </React.Fragment>
    )
  }
}

export default NoSSR
