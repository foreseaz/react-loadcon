import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'

import NoSSR from './utils/NoSSR'
import { getFaviconURL, setFaviconTag } from './utils'

import PieCon from './Favicons/Pie'
import DonutCon from './Favicons/Donut'
import ExceptionCon from './Favicons/Exception'
import SuccessCon from './Favicons/Success'

class LoadCon extends React.Component {
  state = {
    originalFaviconURL: null
  }

  componentDidMount () {
    this.setState({
      originalFaviconURL: getFaviconURL()
    })
  }

  componentDidUpdate (prevProps) {
    const isPropsChanged = !isEqual(this.props, prevProps)
    if (isPropsChanged) {
      if (this.props.status === 'normal') {
        this._resetFavicon()
      }
    }
  }

  _renderFavicon = () => {
    switch (this.props.type) {
      default:
      case 'pie':
        return <PieCon {...this.props} />
      case 'donut':
        return <DonutCon {...this.props} />
    }
  }

  _resetFavicon = () => {
    const { originalFaviconURL } = this.state
    setFaviconTag(originalFaviconURL)
  }

  render() {
    const { status } = this.props
    return (
      <NoSSR>
        {status === 'active' && this._renderFavicon()}
        {status === 'exception' && <ExceptionCon />}
        {status === 'success' && <SuccessCon />}
      </NoSSR>
    )
  }
}

LoadCon.propTypes = {
  percentage: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['pie', 'donut']),
  status: PropTypes.oneOf(['normal', 'active', 'exception', 'success']),
  color: PropTypes.string,
  background: PropTypes.string,
  shadow: PropTypes.string,
  donutWidth: PropTypes.number,
}

LoadCon.defaultProps = {
  percentage: 0,
  type: 'pie',
  status: 'normal',
  color: '#25c639',
  background: '#eee',
  shadow: '#fff',
  donutWidth: 8,
}

export default LoadCon
