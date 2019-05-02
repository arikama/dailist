import React, { Component } from 'react'
import { ActivityIndicator, Button, FlatList, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { NavigationView, StuffSnippet } from 'dl/components'
import { colors, dimensions } from 'dl/constants'
import { readStuff, updateStuffDateDeleted } from 'dl/db'

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
        <Button
          onPress={
            () => {
              this.props.navigation.navigate('Add')
            }
          }
          title='Add'
        />
        <FlatList
          data={
            this.state.stuff.filter((stuff) => {
              return !stuff.date_deleted
            })
          }
          keyExtractor={(stuff) => (stuff.id.toString())}
          renderItem={
            (item) => {
              const stuff = item.item
              return (
                <StuffSnippet
                  onSwipeableRightOpen={
                    () => {
                      updateStuffDateDeleted(stuff.id)
                        .then(() => {
                          this.updateReadStuff()
                        })
                    }
                  }
                  renderRightActions={
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
                                color={colors.TOMATO}
                              />
                              :
                              <Icon
                                color={colors.TOMATO}
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
