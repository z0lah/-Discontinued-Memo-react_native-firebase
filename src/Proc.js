import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

export default class Proc extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    render() {
        return (
          <TouchableHighlight
            onPress={() => this.toggleComplete()}
          >
              <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.3, borderBottomColor: 'black' }}>
                  <View style={{ flex: 4 }}>
                      <Text>{this.props.title}</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                      <Text>{this.props.jmlOrder}</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                      <Text>{this.props.waktu}</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                      {this.props.complete && (
                          <Text>Selesai</Text>
                      )}
                  </View>
              </View>
          </TouchableHighlight>
        );
    }
}
