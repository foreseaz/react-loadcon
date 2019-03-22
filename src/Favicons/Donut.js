import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'

import { getCanvas, setFaviconTag } from '../utils'

class Donut extends React.Component {
  componentDidMount () {
    this.drawFavicon()
  }

  componentDidUpdate (prevProps) {
    const isPropsChanged = !isEqual(this.props, prevProps)
    if (isPropsChanged) {
      this.drawFavicon()
    }
  }

  drawFavicon () {
    const { donutWidth, percentage, color, background, shadow } = this.props
    const canvas = getCanvas()
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw shadow
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2), 0, Math.PI * 2, false)
      ctx.fillStyle = shadow
      ctx.fill()

      // Draw background
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, 0, Math.PI * 2, false)
      ctx.fillStyle = background
      ctx.fill()

      // Draw donut
      if (percentage > 0) {
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, (-0.5) * Math.PI, (-0.5 + 2 * percentage / 100) * Math.PI, false)
        ctx.lineTo(canvas.width / 2, canvas.height / 2)
        ctx.fillStyle = color
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - donutWidth, (-0.5) * Math.PI, (-0.5 + 2 * percentage / 100) * Math.PI, false)
        ctx.lineTo(canvas.width / 2, canvas.height / 2)
        ctx.fillStyle = background
        ctx.fill()
      }
    }

    setFaviconTag(canvas.toDataURL())
  }

  render () {
    return (null)
  }
}

Donut.propTypes = {
  donutWidth: PropTypes.number,
  percentage: PropTypes.number,
  color: PropTypes.string,
  background: PropTypes.string,
  shadow: PropTypes.string,
}

export default Donut
