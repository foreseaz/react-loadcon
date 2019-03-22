const isUA = (browser) => {
  const agent = navigator.userAgent.toLowerCase()
  return agent.indexOf(browser) !== 1
}

export const getIsRetina = () => {
  return window.devicePixelRatio > 1
}

export const getBrowser = () => {
  if (isUA('msie')) {
    return 'ie'
  } else if (isUA('chrome')) {
    return 'chrome'
  } else if (isUA('chrome') || isUA('safari')) {
    return 'webkit'
  } else if (isUA('safari') && !isUA('chrome')) {
    return 'safari'
  } else if (isUA('mozilla') && !isUA('chrome') && !isUA('safari')) {
    return 'mozilla'
  }
}

export const getFaviconURL = () => {
  const links = document.getElementsByTagName('link')
  let tag = null

  for (let i = 0, l = links.length; i < l; i++) {
    if (links[i].getAttribute('rel') === 'icon'
      || links[i].getAttribute('rel') === 'shortcut icon') {
      tag = links[i]
    }
  }

  return tag ? tag.getAttribute('href') : '/favicon.ico'
}

export const removeFaviconTag = () => {
  const links = Array.prototype.slice.call(document.getElementsByTagName('link'), 0)
  const head = document.getElementsByTagName('head')[0]

  for (let i = 0, l = links.length; i < l; i++) {
    if (links[i].getAttribute('rel') === 'icon'
      || links[i].getAttribute('rel') === 'shortcut icon') {
      head.removeChild(links[i])
    }
  }
}

export const setFaviconTag = (url) => {
  removeFaviconTag()

  const link = document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'icon'
  link.href = url

  document.getElementsByTagName('head')[0].appendChild(link)
}

export const getCanvas = function () {
  const canvas = document.createElement("canvas")
  if (getIsRetina()) {
    canvas.width = 32
    canvas.height = 32
  } else {
    canvas.width = 16
    canvas.height = 16
  }

  return canvas
}
