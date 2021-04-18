(function (w) {
	'use strict';

	if (typeof w.hljs === 'undefined') {
		console.error('highlight.js not detected!');
	} else {
		w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
		w.hljs.lineNumbersBlock = lineNumbersBlock;
	}

	function initLineNumbersOnLoad () {
		if (document.readyState === 'complete') {
			documentReady();
		} else {
			w.addEventListener('DOMContentLoaded', documentReady);
		}
	}

	function documentReady () {
		try {
			var blocks = document.querySelectorAll('code.hljs');

			for (var i in blocks) {
				if (blocks.hasOwnProperty(i)) {
					lineNumbersBlock(blocks[i]);
				}
			}
		} catch (e) {
			console.error('LineNumbers error: ', e);
		}
	}

	function lineNumbersBlock (element) {
		if (typeof element !== 'object') {
			return;
		}

		var parent = element.parentNode;
		var text = $(element).html();
        $(element).html(text.replace(/\s+$/g, ''));

        var height = $(element).height();
        var line_height = $(element).css('line-height');
        line_height = parseFloat(line_height);
        var rows = height / line_height;
        var lines = Math.round(rows);
        var l = '';
        for (var i = 1; i < lines+1; i++) {
            l += (i) + '\r\n';
        }
        if ($(parent).find('code.hljs-line-numbers').length == 0) {
            var linesPanel = document.createElement('code');
            $(linesPanel).wrapInner('pre');
            linesPanel.className = 'hljs hljs-line-numbers';
            linesPanel.style.float = 'left';
            linesPanel.textContent = l;

            parent.insertBefore(linesPanel, element);
        }

	}
}(window));
