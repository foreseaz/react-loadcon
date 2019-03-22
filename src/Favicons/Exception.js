import React from 'react'
import PropTypes from 'prop-types'

import { getCanvas, setFaviconTag } from '../utils'

class Exception extends React.Component {
  componentDidMount () {
    this.drawFavicon()
  }

  drawFavicon () {
    const { color } = this.props
    const canvas = getCanvas()
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, 0, Math.PI * 2, false)
    ctx.fillStyle = color
    ctx.fill()

    // Draw cross
    ctx.beginPath()
    ctx.moveTo(canvas.width / 3, canvas.height / 3)
    ctx.lineTo(2 * canvas.width / 3, 2 * canvas.height / 3)
    ctx.lineWidth = 3
    ctx.strokeStyle = '#fff'
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(canvas.width / 3, 2 * canvas.height / 3)
    ctx.lineTo(2 * canvas.width / 3, canvas.height / 3)
    ctx.lineWidth = 3
    ctx.strokeStyle = '#fff'
    ctx.stroke()

    setFaviconTag(canvas.toDataURL())
  }

  render () {
    return (null)
  }
}

Exception.propTypes = {
  color: PropTypes.string,
}

Exception.defaultProps = {
  color: '#ff564e'
}

export default Exception
