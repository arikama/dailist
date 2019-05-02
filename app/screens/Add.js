import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class extends Component {
  render () {
    return (
      <View
        style={
          {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
          }
        }
      >
        <Text>Add Screen</Text>
      </View>
    )
  }
}
