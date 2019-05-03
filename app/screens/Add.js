import React, { Component } from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import { createStuff } from 'dl/db'

export default class extends Component {
  static navigationOptions = {
    title: 'Add'
  }

  state = {
    inputText: ''
  }

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
        <Input
          autoFocus={true}
          onChangeText={
            (text) => {
              this.setState({ inputText: text })
            }
          }
          onSubmitEditing={
            () => {
              if (this.state.inputText === '') {
                return
              }

              createStuff(this.state.inputText)
                .then(() => {
                  this.setState({ inputText: '' })
                  this.props.navigation.navigate('Home')
                })
            }
          }
          value={this.state.inputText}
        />
      </View>
    )
  }
}
