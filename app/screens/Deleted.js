import React, { Component } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { NavigationView, StuffSnippet } from 'dl/components'
import { colors, dimensions } from 'dl/constants'
import { readStuff, updateStuffDateDeletedToNull } from 'dl/db'

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
                  stuff={stuff}
                />
              )
            }
          }
        />
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
