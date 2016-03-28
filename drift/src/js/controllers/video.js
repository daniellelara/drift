angular.module('drift')
  .controller('VideoController', VideoController);

  VideoController.$inject = ['$http', 'YT']

  function VideoController($http, YT) {
    var self = this

    this.search = null
    self.videoId = null
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
            maxResults: '1',
            type: 'video',
            part: 'id,snippet',
            fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
            relatedToVideoId: self.videoId
          }
        })
        .success(function(data){
        console.log(data);
        self.videoId = data.items[0].id.videoId;
        console.log(self.videoId);
      })
        .error(function(err){
        console.log(err);
      })

  }
}
