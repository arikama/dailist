import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { colors } from 'dl/constants'

export default class extends Component {
  static propTypes = {
    onDidBlur: PropTypes.func,
    onDidFocus: PropTypes.func,
    onWillBlur: PropTypes.func,
    onWillFocus: PropTypes.func,
    style: PropTypes.object
  }

  render () {
    return (
      <View
        style={
          {
            backgroundColor: colors.WHITE,
            flex: 1,
            ...this.props.style
          }
        }
      >
        <NavigationEvents
          onDidBlur={
            (payload) => {
              if (!this.props.onDidBlur) return
              this.props.onDidBlur(payload)
            }
          }
          onDidFocus={
            (payload) => {
              if (!this.props.onDidFocus) return
              this.props.onDidFocus(payload)
            }
          }
          onWillBlur={
            (payload) => {
              if (!this.props.onWillBlur) return
              this.props.onWillBlur(payload)
            }
          }
          onWillFocus={
            (payload) => {
              if (!this.props.onWillFocus) return
              this.props.onWillFocus(payload)
            }
          }
        />
        {
          this.props.children
        }
      </View>
    )
  }
}
