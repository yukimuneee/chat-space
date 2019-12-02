$(function(){
  function buildHTML(message){
    var imageA = `<img src="${message.image}" class="lower-message__image">`
    if (message.image) {
    var html = `<div class="main-chat__maincontents__messages">
                  <div class="main-chat__maincontents__messeageinfomation">
                    <div class="main-chat__maincontents__messeageinfomation__username">${message.name}</div>
                    <div class="main-chat__maincontents__messeageinfomation__date">${message.date}</div>
                  </div>
                  <div class="main-chat__maincontents__text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${imageA}
                  </div>
                </div>`
    } else {
    var html = `<div class="main-chat__maincontents__messages">
                  <div class="main-chat__maincontents__messeageinfomation">
                    <div class="main-chat__maincontents__messeageinfomation__username">${message.name}</div>
                    <div class="main-chat__maincontents__messeageinfomation__date">${message.date}</div>
                  </div>
                  <div class="main-chat__maincontents__text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                  </div>
                </div>`
    }
    return html
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
      $('.main-chat__form__message').val('');
      $('.main-chat__maincontents').animate({scrollTop: $('.main-chat__maincontents')[0].scrollHeight}, 'fast');
      $('.main-chat__form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
})




