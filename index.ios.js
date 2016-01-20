/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */


var REQUEST_URL = 'http://localhost/wp-rest/wp-json/wp/v2/posts';

'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  WebView,
} = React;

var MobileNews = React.createClass({
  getInitialState: function(){
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },
  renderStory: function(story) {
    return (
      <View style={styles.storyContainer}>
        <Text style={styles.headline}>
          {story.title.rendered}
        </Text>
        <Text style={styles.bodyCopy}>
          {story.excerpt.rendered}
        </Text>
      </View>
    );
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

     return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderStory}
        style={styles.listView}
      />
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading stories...
        </Text>
      </View>
    );
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 5,
    paddingTop: 50,
  },
  headline: {
    fontSize: 36,
    marginBottom: 10,
  },
  bodyCopy: {
    fontSize: 18,
  },
  storyThumbnail: {
    alignSelf: 'stretch',
    height: 200,
    marginBottom: 20,
  },
  storyContainer: {
    padding: 20,
    marginTop: 20,
  }
});

React.AppRegistry.registerComponent('mobileNews', () => MobileNews);
