angular.module('drift')
  .controller('VideoController', VideoController);

  VideoController.$inject = ['$http', 'YT', 'VIDEOS']

  function VideoController($http, YT, VIDEOS) {
    var self = this
    this.timer = null;
    this.search = null;
    this.hideAboutStatus = false;
    self.videoId = null;
    this.currentDuration = null;

    self.hideAbout = function(){
      self.hideAboutStatus = true;
    }


    self.clearTimer = function(){
      console.log("Clear timer called");
      window.clearTimeout(self.timer);
    }

    self.duration = function()  {
      console.log("Duration function called");
        $http
        .get(VIDEOS, {
          params: {
            key:'AIzaSyAcX3tsJ1PfEDr2uRO8zkBhPoF2q2vnneA',
            video: self.videoId,
            id: self.videoId,
            part: 'contentDetails'
          }
        })
        .success(function(data){
        console.log(data.items[0].contentDetails.duration);
        self.currentDuration = moment.duration(data.items[0].contentDetails.duration).asMilliseconds();
        console.log("Duration in ms: ", self.currentDuration);

        self.timer = setTimeout(self.related, self.currentDuration)
      })
        .error(function(err){
        console.log(err);
      })


    }
    self.request = function() {
      console.log('self.search: ', self.search);
      $http
      .get(YT, {
        params: {
          key:'AIzaSyAcX3tsJ1PfEDr2uRO8zkBhPoF2q2vnneA',
          video: 'video',
          maxResults: '1',
          type: 'video',
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
          q: self.search
        }
      })
      .success(function(data){
      console.log(data);
      self.videoId = data.items[0].id.videoId;
      console.log(self.videoId);
      self.duration();
    })
      .error(function(err){
      console.log(err);
    })
  }

  self.related = function() {
        $http
        .get(YT, {
          params: {
            key:'AIzaSyAcX3tsJ1PfEDr2uRO8zkBhPoF2q2vnneA',
            video: 'video',
            maxResults: '2',
            type: 'video',
            part: 'id,snippet',
            fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
            relatedToVideoId: self.videoId
          }
        })
        .success(function(data){
        console.log(data);
        self.videoId = data.items[1].id.videoId;
        console.log(self.videoId);
        self.duration();
      })
        .error(function(err){
        console.log(err);
      })

  }


}
