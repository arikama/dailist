import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { dimensions } from 'dl/constants'

export default class extends Component {
  static propTypes = {
    onSwipeableLeftOpen: PropTypes.func,
    onSwipeableLeftWillOpen: PropTypes.func,
    onSwipeableRightOpen: PropTypes.func,
    onSwipeableRightWillOpen: PropTypes.func,
    renderLeftActions: PropTypes.func,
    renderRightActions: PropTypes.func,
    stuff: PropTypes.shape({
      item: PropTypes.string.isRequired
    })
  }

  state = {
    leftWillOpen: false,
    rightWillOpen: false
  }

  render () {
    return (
      <Swipeable
        onSwipeableLeftOpen={this.props.onSwipeableLeftOpen}
        onSwipeableLeftWillOpen={
          () => {
            this.setState({ leftWillOpen: true })
          }
        }
        onSwipeableRightOpen={this.props.onSwipeableRightOpen}
        onSwipeableRightWillOpen={
          () => {
            this.setState({ rightWillOpen: true })
          }
        }
        renderLeftActions={
          this.props.renderLeftActions
            ?
            this.props.renderLeftActions(this.state.leftWillOpen)
            :
            () => {}
        }
        renderRightActions={
          this.props.renderRightActions
            ?
            this.props.renderRightActions(this.state.rightWillOpen)
            :
            () => {}
        }
      >
        <View
          style={
            {
              height: dimensions.LENGTH_50,
              justifyContent: 'center',
              padding: dimensions.PADDING
            }
          }
        >
          <Text>{this.props.stuff.item}</Text>
        </View>
      </Swipeable>
    )
  }
}
