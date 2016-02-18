/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */


var REQUEST_URL = 'http://localhost/wp-rest/wp-json/wp/v2/posts?filter[paged]=';

'use strict';
var React = require('react-native');

var HTMLView = require('react-native-htmlview');

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  WebView,
  StatusBarIOS,
} = React;

var MobileNews = React.createClass({
  getInitialState: function(){
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      page: 1,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    var currentUrl = REQUEST_URL + this.state.page;
    
    fetch(currentUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
          page: this.state.page + 1
        });
      })
      .done();
  },
  renderStory: function(story) {
    return (
      <View style={styles.storyContainer}>
        {story.featured_image_url ?
          <Image
          style={styles.storyThumbnail}
          source={{uri: story.featured_image_url}}
        />
        : null}
        
        <Text style={styles.headline}>
          {story.title.rendered}
        </Text>
        <HTMLView
          value={story.excerpt.rendered}
          stylesheet={styles}
        />
      </View>
    );
  },
  onEndReached: function() {
    this.fetchData();
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    StatusBarIOS.setStyle(1);

     return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Text style={styles.headerText}>Mobile News</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderStory}
          onEndReached={this.onEndReached}
          style={styles.listView}
        />
      </View>
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
    paddingTop: 50,
  },
  headline: {
    fontSize: 36,
    marginBottom: 10,
  },
  bodyCopy: {
    fontSize: 18,
  },
  storyContainer: {
    padding: 20,
    marginTop: 20,
    alignItems: 'stretch',
  },
  storyThumbnail: {
    flex: 1,
    height: 200,
    width: 350,
  },
  header: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ca0002',
    height: 60,
    marginTop: -50,
    paddingTop: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  testStyles: {
    color: 'white',
  }
});

React.AppRegistry.registerComponent('mobileNews', () => MobileNews);
