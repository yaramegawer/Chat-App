var socket = io();
      

  let username=" ";
    var form = document.getElementById('form');
    var input = document.getElementById('msg');

function setUsername() {
  username = prompt("Please enter your username:");
  if (!username || username.trim() === '') {
    setUsername();
  }
  
}

setUsername();
 
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (input.value.trim() !== '') {
        socket.emit('chat message', { message: input.value, username: username }); 
        
        input.value = '';
      }
    });
  

    socket.on('chat message', function(data) {
      const messages = document.getElementById('messages');
      var item = document.createElement('li');
      let user=`<b>${data.username}</b>`;
      item.innerHTML = ` ${user}: ${data.message}`; 
      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight;
    });
    socket.on('connected', function(msg) {
      const messages = document.getElementById('messages');
      var item = document.createElement('li');

      item.innerHTML = msg; 
      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight;
    });
    socket.on('disconnected', function(msg) {
      const messages = document.getElementById('messages');
      var item = document.createElement('li');

      item.innerHTML = msg; 
      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight;
    });






