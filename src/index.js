(function() {
  function byId(el) {
    return document.getElementById(el);
  }
  var messageheader = byId('message-header');
  var headerText = messageheader.textContent;
  var contactForm = byId('contact-form');
  var submitForm = byId('submit-form');
  var senderName = byId('sender-name');
  var email = byId('email');
  var message = byId('message');
  var buttonMessage = submitForm.value;
  var timeout = null;
  contactForm.addEventListener('submit', function(e) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
      messageheader.textContent = headerText;
    }
    e.preventDefault();
    submitForm.disabled = true;
    submitForm.value = 'Sending email...';
    messageheader.textContent = 'Sending email...';
    emailjs.send("mailgun", "form_contact", {
        'from_name': senderName.value,
        'from_mail': email.value,
        'message': message.value
      })
      .then(function(response) {
        submitForm.disabled = false;
        submitForm.value = buttonMessage;
        messageheader.textContent = 'Message successfully sent!';
        timeout = setTimeout(function() {
          messageheader.textContent = headerText;
        }, 2500);
      }, function(err) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
          messageheader.textContent = headerText;
        }
        submitForm.disabled = false;
        submitForm.value = buttonMessage;
      });
  });
})();
