import React from 'react'
import PropTypes from 'prop-types'

import { getCanvas, setFaviconTag } from '../utils'

class Success extends React.Component {
  componentDidMount () {
    this.drawFavicon()
  }

  drawFavicon () {
    const { color } = this.props
    const canvas = getCanvas()
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, 0, Math.PI * 2, false)
      ctx.fillStyle = color
      ctx.fill()

      // Draw tick
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.22, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.45, canvas.height * 0.7)
      ctx.lineTo(canvas.width * 0.73, canvas.height * 0.3)
      ctx.lineWidth = 3
      ctx.strokeStyle = '#fff'
      ctx.stroke()
    }

    setFaviconTag(canvas.toDataURL())
  }

  render () {
    return (null)
  }
}

Success.propTypes = {
  color: PropTypes.string,
}

Success.defaultProps = {
  color: '#25c639'
}

export default Success
