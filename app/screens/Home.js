import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Circle, Greet, NavigationView, StuffSnippet } from 'dl/components'
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
    isLoading: true,
    stuff: []
  }

  render () {
    return (
      <NavigationView
        onWillFocus={
          () => {
            this.setState({ isLoading: true })
            this.updateReadStuff()
              .then(() => {
                this.setState({ isLoading: false })
              })
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
            :
            this.state.isLoading
              ?
              null
              :
              <Greet
                greeting="You're all done. Enjoy your day!"
                iconName='mood'
                style={
                  {
                    flex: 1
                  }
                }
              />
        }
        <View
          style={
            {
              bottom: 0,
              margin: dimensions.MARGIN_XLARGE,
              position: 'absolute',
              right: 0
            }
          }
        >
          <Circle
            iconName='add'
            onPress={
              () => {
                this.props.navigation.navigate(routes.ADD)
              }
            }
          />
        </View>
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
