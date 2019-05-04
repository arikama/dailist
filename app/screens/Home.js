import React, { Component } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Circle, NavigationView, StuffSnippet } from 'dl/components'
import { colors, dimensions, routes } from 'dl/constants'
import {
  readStuff,
  updateStuffDateArchived,
  updateStuffDateDeleted,
  updateStuffDateDone,
  updateStuffDateDoneToNull
} from 'dl/db'

export default class extends Component {
  state = {
    stuff: []
  }

  render () {
    return (
      <NavigationView
        onWillFocus={
          () => {
            this.updateReadStuff()
          }
        }
      >
        <FlatList
          ListFooterComponent={
            () => {
              return (
                <View
                  style={
                    {
                      height: dimensions.LENGTH_250,
                      justifyContent: 'center'
                    }
                  }
                >
                </View>
              )
            }
          }
          data={
            this.state.stuff
              .map((stuff) => {
                return {
                  dateCreated: stuff.date_created,
                  dateDone: stuff.date_done,
                  id: stuff.id,
                  item: stuff.item
                }
              })
          }
          keyExtractor={(stuff) => (stuff.id.toString())}
          renderItem={
            (item) => {
              const stuff = item.item
              return (
                <StuffSnippet
                  iconColorDone={colors.MEDIUM_SEA_GREEN}
                  onPressCheckBox={
                    () => {
                      const promise = stuff.dateDone
                        ?
                        updateStuffDateDoneToNull(stuff.id)
                        :
                        updateStuffDateDone(stuff.id)
                      promise
                        .then(() => {
                          return this.updateReadStuff()
                        })
                    }
                  }
                  onSwipeableLeftOpen={
                    () => {
                      updateStuffDateArchived(stuff.id)
                        .then(() => {
                          this.updateReadStuff()
                        })
                    }
                  }
                  onSwipeableRightOpen={
                    () => {
                      updateStuffDateDeleted(stuff.id)
                        .then(() => {
                          this.updateReadStuff()
                        })
                    }
                  }
                  renderLeftActions={
                    (willOpen) => () => {
                      return (
                        <View
                          style={
                            {
                              alignItems: 'flex-start',
                              backgroundColor: colors.MEDIUM_SEA_GREEN,
                              justifyContent: 'center',
                              paddingLeft: dimensions.PADDING,
                              width: dimensions.PERCENT_100
                            }
                          }
                        >
                          {
                            willOpen
                              ?
                              <ActivityIndicator
                                color={colors.WHITE}
                              />
                              :
                              <Icon
                                color={colors.WHITE}
                                name='archive'
                                type='material'
                              />
                          }
                        </View>
                      )
                    }
                  }
                  renderRightActions={
                    (willOpen) => () => {
                      return (
                        <View
                          style={
                            {
                              alignItems: 'flex-end',
                              backgroundColor: colors.TOMATO,
                              justifyContent: 'center',
                              paddingRight: dimensions.PADDING,
                              width: dimensions.PERCENT_100
                            }
                          }
                        >
                          {
                            willOpen
                              ?
                              <ActivityIndicator
                                color={colors.WHITE}
                              />
                              :
                              <Icon
                                color={colors.WHITE}
                                name='delete-sweep'
                                type='material'
                              />
                          }
                        </View>
                      )
                    }
                  }
                  stuff={stuff}
                />
              )
            }
          }
        />
        <Circle
          onPress={
            () => {
              this.props.navigation.navigate(routes.ADD)
            }
          }
        />
      </NavigationView>
    )
  }

  updateReadStuff () {
    return readStuff()
      .then((stuff) => {
        this.setState({ stuff })
      })
  }
}
