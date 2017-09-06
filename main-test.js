import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YoutubeFunction from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import DevReport from './components/dev_report';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyAuQCVeNfKhtRk9KlChQPT1nO27DPO_5Ss';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = { videos: [], selectedVideo: null };
    this.setOriginalState = function (videos) {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      // this.setState({videos}); 等同于 this.setState(videos: videos);
    }
    this.videoSearch('alien isolation');
  }

  videoSearch(searchTerm) {
    YoutubeFunction({key: API_KEY, term: searchTerm}, this.setOriginalState.bind(this));
  }

  render () {
    return (
      <div className="card-box green-frame shadow-expand">
        <div>
          <SearchBar onSearchTermChange={ _.debounce( this.videoSearch.bind(this), 700 ) }/>
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList
            videos={this.state.videos}
            onVideoSelect={(selectThis) => this.setState({selectedVideo: selectThis})}
          />
        </div>
        <div>
          <DevReport />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
