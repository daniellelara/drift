angular.module('drift',  [])
  .constant('YT', 'https://www.googleapis.com/youtube/v3/search');

angular.module('drift')
  .controller('VideoController', VideoController);

  VideoController.$inject = ['$http', 'YT']

  function VideoController($http, YT) {
    var self = this

    self.search = null
    self.videoId = null
    self.request = function() {
      console.log('self.video: ', self.search);
      $http
      .get(YT, {
        params: {
          key:'AIzaSyAcX3tsJ1PfEDr2uRO8zkBhPoF2q2vnneA',
          video: 'video',
          maxResults: '1',
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
          q: self.search
        }
      })
      .success(function(data){
      console.log(data);
      self.videoId = "https://www.youtube.com/embed/" + data.items[0].id.videoId;
      console.log(self.videoId);
    })
      .error(function(err){
      console.log(err);
    })
  }
}

angular.module('drift')
  .directive('youtube', Youtube);

function Youtube() {
    return {
      restrict: 'E',
      replace: true,
      template: '<iframe width="420" height="315" src='WSinMOs5eGw' frameborder="0" allowfullscreen></iframe>',
      scope: {
        source: '='

      }
    }
  }
