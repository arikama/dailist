import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import { colors, dimensions } from 'dl/constants'

export default class extends Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    iconColor: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    onPress: PropTypes.func
  }

  render () {
    return (
      <Icon
        color={this.props.iconColor || colors.GREY}
        containerStyle={
          {
            alignItems: 'center',
            backgroundColor: colors.WHITE_SMOKE,
            borderRadius: dimensions.ICON_BORDER_RADIUS,
            elevation: dimensions.ELEVATION,
            height: dimensions.ICON_SIZE,
            justifyContent: 'center',
            width: dimensions.ICON_SIZE,
            ...this.props.containerStyle
          }
        }
        name={this.props.iconName}
        onPress={this.props.onPress}
        type='material'
        underlayColor={colors.WHITE_SMOKE}
      />
    )
  }
}
