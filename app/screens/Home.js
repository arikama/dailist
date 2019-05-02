import React, { Component } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { NavigationView } from 'dl/components'
import { readStuff } from 'dl/db'

export default class extends Component {
  state = {
    stuff: []
  }

  render () {
    return (
      <NavigationView
        onWillFocus={
          () => {
            readStuff()
              .then((stuff) => {
                this.setState({ stuff })
              })
          }
        }
        style={
          {
            justifyContent: 'center'
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
          data={this.state.stuff}
          keyExtractor={(stuff) => (stuff.id.toString())}
          renderItem={
            (item) => {
              const stuff = item.item
              return (
                <View>
                  <Text>{stuff.item}</Text>
                </View>
              )
            }
          }
        />
      </NavigationView>
    )
  }
}
