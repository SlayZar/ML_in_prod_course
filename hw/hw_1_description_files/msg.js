$.extend({
	msg: {
        error: function (title, message) {
            $.notifier.broadcast(title, message, 'n-error');
        },
        notice: function(title, message) {
            $.notifier.broadcast(title, message, 'n-notice');
        }
    }
});