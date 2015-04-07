$(document).ready( function () {

    $('form').submit( function (e) {

        e.preventDefault();

        var data = {};

        data.name = $('#name').val();
        data.uri = $('#uri').val();
        data.photo = $('#photo').val();
        data.comment = $('#comment').val();

        $('aside').render('./templates/comments.html', data, {
            cache: false,
            animation: 'slide',
            speed: 1000,
            templateType: 'url'
        });

        var tpl = '<section class="comment"><img src="{{photo}}" alt="{{name}}" /><h2><a href="{{uri}}" target="_blank">{{name}}</a></h2><p>{{comment}}</p></section>';

        $('aside').render(tpl, data, {
            animation: 'fade',
            speed: 1000
        });

    });


    var tpl = '<section class="comment"><img src="{{photo}}" alt="{{name}}" /><h2><a href="{{uri}}" target="_blank">{{name}}</a></h2><p>{{comment}}</p></section>';

    var data = [{
        name: 'John Doe',
        uri: 'http://google.com/',
        photo: 'http://lorempixel.com/100/100/people',
        comment: 'une comment'
    }, {
        name: 'Johnny Walker',
        uri: 'http://google.com/',
        photo: 'http://lorempixel.com/100/100/people',
        comment: 'seconde comment'
    }];

    $('aside').render(tpl, data, {
        animation: 'none'
    });

    $('aside').render('./templates/comments.html', data, {
        cache: false,
        animation: 'slide',
        speed: 1000,
        templateType: 'url'
    });

});
