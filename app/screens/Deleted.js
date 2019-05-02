import React, { Component } from 'react'
import { ActivityIndicator, Button, FlatList, View } from 'react-native'
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
            this.state.stuff.filter((stuff) => {
              return stuff.date_deleted
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
                              justifyContent: 'center',
                              width: dimensions.LENGTH_50
                            }
                          }
                        >
                          {
                            willOpen
                              ?
                              <ActivityIndicator
                                color={colors.MEDIUM_SEA_GREEN}
                              />
                              :
                              <Icon
                                color={colors.MEDIUM_SEA_GREEN}
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
