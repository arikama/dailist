import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, dimensions } from 'dl/constants'

export default class extends Component {
  static propTypes = {
    greeting: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    style: PropTypes.object
  }

  render () {
    return (
      <View
        style={
          {
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            ...this.props.style
          }
        }
      >
        <Icon
          color={colors.GREY}
          name={this.props.iconName}
          size={dimensions.ICON_SIZE}
          type='material'
        />
        <Text
          style={
            {
              color: colors.GREY,
              padding: dimensions.PADDING_LARGE
            }
          }
        >
          {this.props.greeting}
        </Text>
      </View>
    )
  }
}
