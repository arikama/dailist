import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import { colors, dimensions } from 'dl/constants'

export default class extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  render () {
    return (
      <Icon
        color={colors.GREY}
        containerStyle={
          {
            alignItems: 'center',
            backgroundColor: colors.WHITE_SMOKE,
            borderRadius: dimensions.ICON_BORDER_RADIUS,
            bottom: 0,
            elevation: dimensions.ELEVATION,
            height: dimensions.ICON_SIZE,
            justifyContent: 'center',
            margin: dimensions.MARGIN_XLARGE,
            position: 'absolute',
            right: 0,
            width: dimensions.ICON_SIZE
          }
        }
        name='add'
        onPress={this.props.onPress}
        type='material'
      />
    )
  }
}
