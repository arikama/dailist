import React, { Component } from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import { colors, dimensions } from 'dl/constants'
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
            flex: 1
          }
        }
      >
        <Input
          autoFocus={true}
          inputContainerStyle={
            {
              borderBottomColor: colors.WHITE_SMOKE,
              borderBottomWidth: dimensions.BORDER_WIDTH
            }
          }
          label='Title'
          labelStyle={
            {
              color: colors.GREY
            }
          }
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
