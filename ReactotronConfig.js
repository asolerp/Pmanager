/**
 * Copyright (C) SaigonMD, Inc - All Rights Reserved
 * Licensed under the MIT license.
 * Written by Tran Quan <tranquan221b@gmail.com>, July 2018
 */
/**
 * Log helper using Reactotron https://github.com/infinitered/reactotron
 * - log faster than console because no need to turn-on remote debug
 * - able to customize the message
 */
import Reactotron from 'reactotron-react-native'

class LogConfig {
  constructor() {
    this.isLogEnable = false
  }

  /**
   * Configure Reactotron and redirect console.log to Reactotron.log
   */
  configure(options) {
    this.isLogEnable = options.enableLog ? options.enableLog : false
    this.configureReactotron()
    this.connectConsoleToReactotron()
  }

  configureReactotron() {
    Reactotron.configure({
      name: 'App',
      host: '192.168.1.75',
    }).connect()

    // clear log on start
    Reactotron.clear()
  }

  connectConsoleToReactotron() {
    console.info = this.info
    console.log = this.log
    console.warn = this.warn
    console.error = this.error
  }

  log(message, ...args) {
    if (!this.isLogEnable) return
    Reactotron.display({
      name: 'LOG',
      preview: message,
      value: { message, args },
    })
  }

  info(message, ...args) {
    if (!this.isLogEnable) return
    Reactotron.display({
      name: 'INFO',
      preview: message,
      value: { message, args },
    })
  }

  warn(message, ...args) {
    if (!this.isLogEnable) return
    Reactotron.display({
      name: 'WARN',
      preview: message,
      value: { message, args },
      important: true,
    })
  }

  error(message, ...args) {
    if (!this.isLogEnable) return
    Reactotron.display({
      name: 'ERROR',
      preview: message,
      value: { message, args },
      important: true,
    })
  }
}

export default LogConfig
