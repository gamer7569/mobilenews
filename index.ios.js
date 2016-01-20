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
      stories: null,
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          stories: responseData,
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
    if (!this.state.stories) {
      return this.renderLoadingView();
    }

    var story = this.state.stories[0];
    return this.renderStory(story);
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
    alignItems: 'center',
    backgroundColor: '#ccc',
    flex: 1,
    height: 50,
    padding: 20,
    marginTop: 20,
  }
});

React.AppRegistry.registerComponent('mobileNews', () => MobileNews);
