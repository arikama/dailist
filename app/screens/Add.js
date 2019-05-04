import React, { Component } from 'react'
import { ToastAndroid, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Circle } from 'dl/components'
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
              this.submit()
            }
          }
          value={this.state.inputText}
        />
        <View
          style={
            {
              bottom: 0,
              flexDirection: 'row',
              margin: dimensions.MARGIN_XLARGE,
              position: 'absolute',
              right: 0
            }
          }
        >
          <Circle
            iconName='arrow-back'
            onPress={
              () => {
                this.props.navigation.goBack()
              }
            }
          />
          <Circle
            containerStyle={
              {
                marginLeft: dimensions.MARGIN
              }
            }
            iconColor={this.state.inputText ? colors.MEDIUM_SEA_GREEN : colors.GREY}
            iconName='done'
            onPress={
              () => {
                this.submit()
              }
            }
          />
        </View>
      </View>
    )
  }

  submit () {
    if (this.state.inputText === '') {
      ToastAndroid.showWithGravity(
        "Can't add an empty item.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
      return
    }

    createStuff(this.state.inputText)
      .then(() => {
        this.setState({ inputText: '' })
        this.props.navigation.navigate('Home')
      })
  }
}
