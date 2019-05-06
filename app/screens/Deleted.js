import React, { Component } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Greet, NavigationView, StuffSnippet } from 'dl/components'
import { colors, dimensions } from 'dl/constants'
import { deleteStuff, readStuff, updateStuffDateDeletedToNull } from 'dl/db'

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
        {
          this.state.stuff.length
            ?
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
                      dateDeleted: stuff.date_deleted,
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
                      onSwipeableLeftOpen={
                        () => {
                          updateStuffDateDeletedToNull(stuff.id)
                            .then(() => {
                              this.updateReadStuff()
                            })
                        }
                      }
                      onSwipeableRightOpen={
                        () => {
                          deleteStuff(stuff.id)
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
                                    name='restore'
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
                                    name='delete'
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
            :
            <Greet
              greeting='Nothing to see here.'
              iconName='delete-sweep'
              style={
                {
                  flex: 1
                }
              }
            />
        }
      </NavigationView>
    )
  }

  updateReadStuff () {
    return readStuff(false, true)
      .then((stuff) => {
        this.setState({ stuff })
      })
  }
}
