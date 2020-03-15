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
import { AsyncStorage } from 'react-native'

class LogConfig {
  constructor() {
    this.isLogEnable = false
  }

  /**
   * Configure Reactotron and redirect console.log to Reactotron.log
   */
  configure() {
    this.configureReactotron()
    this.connectConsoleToReactotron()
  }

  configureReactotron() {
    Reactotron.setAsyncStorageHandler(AsyncStorage)
      .configure({
        name: 'Reactotron In Expo demo',
        host: '192.168.1.63',
      })
      .useReactNative({
        asyncStorage: false,
        networking: {
          ignoreUrls: /symbolicate|127.0.0.1/,
        },
        editor: false,
        errors: { veto: stackFrame => false },
        overlay: false,
      })
      .connect()

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
    return Reactotron.display({
      name: 'LOG',
      preview: message,
      value: { message, args },
    })
  }

  info(message, ...args) {
    return Reactotron.display({
      name: 'INFO',
      preview: message,
      value: { message, args },
    })
  }

  warn(message, ...args) {
    return Reactotron.display({
      name: 'WARN',
      preview: message,
      value: { message, args },
      important: true,
    })
  }

  error(message, ...args) {
    return Reactotron.display({
      name: 'ERROR',
      preview: message,
      value: { message, args },
      important: true,
    })
  }
}

export default LogConfig
