import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { init } from 'dl/db'

export default class extends Component {
  render () {
    return (
      <View>
        <Text>Home</Text>
      </View>
    )
  }

  componentDidMount () {
    init()
  }
}
