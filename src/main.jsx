/**
*     File Name           :     main.js
*     Created By          :     Anton Kundenko anton@algotradinghub.com
*     Creation Date       :     06-04-2015 20:02
*     Description         :      
***/
var host = location.origin;
var socket = io.connect(host, {transports: ["websocket"]});
var socket = io.connect();
socket.on('news', function (data) {
   console.log(data);
   socket.emit('event', { my: 'data' });
});

var LikeButton = React.createClass({
      getInitialState: function() {
              return {liked: false};
      },
      handleClick: function(event) {
              this.setState({liked: !this.state.liked});
      },
      render: function() {
              var text = this.state.liked ? 'like' : 'haven\'t liked';
              return (
                  <p onClick={this.handleClick}>
                  You {text} this. Click to toggle.
                  </p>
              );
      }
});

React.render(<LikeButton />, document.body);


