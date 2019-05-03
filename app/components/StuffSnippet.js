import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { colors, dimensions, fontSizes } from 'dl/constants'
import { convertToLocal } from 'dl/utils'

export default class extends Component {
  static propTypes = {
    onPressCheckBox: PropTypes.func,
    onSwipeableLeftOpen: PropTypes.func,
    onSwipeableLeftWillOpen: PropTypes.func,
    onSwipeableRightOpen: PropTypes.func,
    onSwipeableRightWillOpen: PropTypes.func,
    renderLeftActions: PropTypes.func,
    renderRightActions: PropTypes.func,
    stuff: PropTypes.shape({
      dateCreated: PropTypes.string.isRequired,
      dateDeleted: PropTypes.string,
      dateDone: PropTypes.string,
      id: PropTypes.number.isRequired,
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
              alignItems: 'center',
              backgroundColor: colors.WHITE,
              flexDirection: 'row',
              padding: dimensions.PADDING
            }
          }
        >
          <View
            style={
              {
                flex: 1
              }
            }
          >
            <Text
              style={
                {
                  color: colors.BLACK
                }
              }
            >
              {this.props.stuff.item}
            </Text>
            <Text
              style={
                {
                  color: colors.GREY,
                  fontSize: fontSizes.SMALL
                }
              }
            >
              {
                moment(convertToLocal(this.props.stuff.dateCreated)).calendar(null, {
                  sameDay: '[Today]',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd',
                  sameElse: 'YYYY-MM-DD'
                })
              }
            </Text>
          </View>
          <Icon
            color={this.props.stuff.dateDone ? colors.MEDIUM_SEA_GREEN : colors.GREY}
            containerStyle={
              {
                padding: dimensions.PADDING
              }
            }
            name={this.props.stuff.dateDone ? 'check-box' : 'check-box-outline-blank'}
            onPress={this.props.onPressCheckBox || (() => {})}
            type='material'
          />
        </View>
      </Swipeable>
    )
  }
}
