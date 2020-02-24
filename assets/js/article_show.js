import '../css/article_show.scss';
import $ from 'jquery';
// technically, with enableSingleRuntimeChunk(), you can be lazy and
// not import bootstrap, because it was done in app.js
//import 'bootstrap';

$(document).ready(function() {
    $('.js-like-article').tooltip();

    $('.js-like-article').on('click', function(e) {
        e.preventDefault();

        var $link = $(e.currentTarget);
        $link.toggleClass('fa-heart-o').toggleClass('fa-heart');

        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
            $('.js-like-article-count').html(data.hearts);
        })
    });
});
