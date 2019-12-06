$(function(){
  function buildHTML(message){
    var imageA = '';
    if (message.image) {
      imageA = `<img src="${message.image}" class="lower-message__image">`;
    }
    var html = `<div class="main-chat__maincontents__messages" data-message-id="${message.id}">
                  <div class="main-chat__maincontents__messages__messeageinfomation">
                    <div class="main-chat__maincontents__messages__messeageinfomation__username">${message.name}</div>
                    <div class="main-chat__maincontents__messages__messeageinfomation__date">${message.created_at}</div>
                  </div>
                  <div>
                    <p class="main-chat__maincontents__messages__text">
                      ${message.content}
                    </p>
                      ${imageA}
                  </div>
                </div>`;
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__maincontents').append(html);
      $("#new_message")[0].reset();
      $('.main-chat__form__submit').prop('disabled', false);
      $('.main-chat__maincontents').animate({scrollTop: $('.main-chat__maincontents')[0].scrollHeight}, 'fast');
      
    })
    .fail(function(){
      $('.main-chat__form__submit').prop('disabled', false);
      alert("メッセージ送信に失敗しました");
    });
  });
 
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.main-chat__maincontents__messages:last').data("message-id")
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
          $('.main-chat__maincontents').append(insertHTML);
          $('.main-chat__maincontents').animate({scrollTop: $('.main-chat__maincontents')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    }
  }
  setInterval(reloadMessages, 7000); 

});


