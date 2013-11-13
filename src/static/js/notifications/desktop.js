// See https://developer.mozilla.org/en-US/docs/WebAPI/Using_Web_Notifications
// To reset permissions in chrome, go to chrome://settings/contentExceptions#notifications
define(function() {
  var w = window;

  function setup() {
    function showSuccessMessage() {
      show({
        title: "Success!"
      });
    }

    if (w.Notification && w.Notification.permission === "granted") {
      showSuccessMessage();
    }
    else if (w.Notification && w.Notification.permission !== "denied") {
      w.Notification.requestPermission(function (status) {
        if (w.Notification.permission !== status) {
          w.Notification.permission = status;
        }

        if (status === "granted") {
          showSuccessMessage();
        }
      });
    }
    else {
      alert("Unable to show desktop notifications. It is either not available in your browser, or you didn't grant access");
    }
  }

  function show(payload) {
    var options = {
      icon: payload.icon
    };

    if(payload.body) {
      options.body = payload.body;
    }

    if(payload.tag) {
      options.tag = payload.tag;
    }

    var notification = new window.Notification(payload.title, options);

    if(payload.timeToLive) {
      notification.onshow = function() {
        window.setTimeout(function() {
          notification.close();
        }, payload.timeToLive);
      };
    }
  }

  return {
    setup: setup,
    show: show
  };
});