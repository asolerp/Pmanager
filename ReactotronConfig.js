import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native'

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Reactotron In Expo demo',
    host: '192.168.1.33',
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

function useStateWrapper(fn) {
  const stateWatcher = initialState => {
    const response = fn(initialState)

    Reactotron.log(response)

    return response
  }
  return stateWatcher
}

export default useStateWrapper
