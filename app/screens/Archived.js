import moment from 'moment'
import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Greet, NavigationView, StuffSnippet } from 'dl/components'
import { app, colors, dimensions, routes } from 'dl/constants'
import {
  readStuff
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
                  let currDateCreated = moment(stuff.dateCreated).format(app.DATE_FORMAT)
                  let prevDateCreated

                  if (item.index > 0) {
                    const date = this.state.stuff[item.index - 1].date_created
                    prevDateCreated = moment(date).format(app.DATE_FORMAT)
                  }

                  if (item.index !== 0 && currDateCreated === prevDateCreated) {
                    currDateCreated = null
                  }

                  return (
                    <View>
                      {
                        currDateCreated
                        &&
                        <Text
                          style={
                            {
                              padding: dimensions.PADDING,
                              textAlign: 'center'
                            }
                          }
                        >
                          {currDateCreated}
                        </Text>
                      }
                      <StuffSnippet
                        stuff={stuff}
                      />
                    </View>
                  )
                }
              }
            />
            :
            <Greet
              greeting='Nothing to see here.'
              iconName='archive'
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
    return readStuff(true, false)
      .then((stuff) => {
        this.setState({ stuff })
      })
  }
}
