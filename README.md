# react-loadcon

> React component for manipulating the favicon, for loading or progress.

[![NPM](https://img.shields.io/npm/v/react-loadcon.svg)](https://www.npmjs.com/package/react-loadcon) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-loadcon
```

## Usage

```jsx
import React, { Component } from 'react'

import LoadCon from 'react-loadcon'

class Example extends Component {
  state = {
    type: 'pie', // ['pie', 'donut']
    status: 'normal', // ['normal', 'active', 'exception', 'success']
    percentage: 0 // 0 - 100
  }

  render () {
    const { type, percentage, status } = this.state
    return (
      <LoadCon
        percentage={percentage}
        status={status}
        type={type}
      />
    )
  }
}
```

## License

MIT © [foreseaz](https://github.com/foreseaz)
