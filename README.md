# react-loadcon

> React component to manipulate the favicon, for loading or progress.

[![NPM](https://img.shields.io/npm/v/react-loadcon.svg)](https://www.npmjs.com/package/react-loadcon) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-loadcon
```
or
```bash
yarn add react-loadcon
```

## Props

- `percentage: PropTypes.number.isRequired`, the percentage of loading progress for LoadCon.
- `type: PropTypes.oneOf(['pie', 'donut'])`, the theme of LoadCon, now has `PieCon` and `DonutCon`, and more themes will be added soon.
- `status: PropTypes.oneOf(['normal', 'active', 'exception', 'success'])`, load status of LoadCon, `normal` reset to default favicon, `active` set LoadCon according to the type prop, `exception` set ErrorCon and `success` set SuccessCon.
- `color: PropTypes.string`, color of loading indicator in hash format, default is `#25c639`.
- `background: PropTypes.string`, color of background in hash format, default is `#eeeeee`.
- `shadow: PropTypes.string`, color of 2 pixals border in hash format, default is `#ffffff`.
- `donutWidth: PropTypes.number`, width of DonutCon indicator in number, default is `8px`.

## Usage

```JavaScript
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
  }
```

## License

MIT © [foreseaz](https://github.com/foreseaz)
