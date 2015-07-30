/**
 * base.js
 * - The Conveyance "glue" for web browsers.
 * 
 */

var conveyance = function() {
	
function setTitle(title, subtitle) {
	$('title').text(title);
	$('#header_title').text(title);
	if (subtitle) {
		if (!$('#header_subtitle')) appendSubtitle(subtitle)
		else $('#header_subtitle').text(subtitle);
	} else {
		if ($('#header_subtitle')) $('#header_subtitle').remove();
	}
}

function _appendSubtitle(subtitle) {
	$('header').append(
			$('<h2/>').attr('id', 'header_subtitle').text(subtitle)
	);
}

return {
	'setTitle' : setTitle
};

}();

