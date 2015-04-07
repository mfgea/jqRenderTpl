#jqRenderTpl
jqRenderTpl is a small templating plugin for jQuery.


##How it works
jqRenderTpl loads some HTML, from a file or from a string, and then fills it with contents from a JS Object. The newly generated HTML is then injected into the desired element as many times as required.


##First steps
jqRenderTpl requires jQuery, so be sure to include it in your sites code before proceeding. Then just add jqRenderTpl:

    <head>
      <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
      <script type="text/javascript" src="js/jqRenderTpl.min.js"></script>
    </head>


##Generate your templates
jqRenderTpl searches your templates and replaces keywords with provided values. The syntax used to search for terms in the HTML is used in many other templating engines and consist on double brackets. Just use '{{fieldname}}' where you want your data replaced. For example:

    <section class="comment">
     <img src="{{photo}}" alt="{{name}}" />
     <h2><a href="{{uri}}" target="_blank">{{name}}</a></h2>
     <p>{{comment}}</p>
    </section>


##Render your data
jqRenderTpl works on the element you want to use as a container for your rendered templates.

You just have to give it the template (URL or content), your data (single object or an array of them) and the rendering options.

    var template = './templates/comments.html';

    var data = [{
      name: 'John Appleseed',
      photo: 'http://lorempixel.com/60/60/people',
      uri: 'http://www.google.com',
      comment: 'Nice little plugin!'
    },{
      name: 'Alice Melonhead',
      photo: 'http://lorempixel.com/60/60/people',
      uri: 'http://www.yahoo.com',
      comment: 'That's fine!'
    }];

    var options = {
        templateType: 'url',
        animation: 'slide',
        speed: 500
    };

    $('aside').render(template, data, options);


##Options

    - templateType (String, default: 'html'): Type of template used, can be either 'url' or 'html'
    - cache (Boolean, default: true): Whether or not use the cache to load the template. Useful if you have dynamically generated templates.
    - animation (String, default: 'fade'): Which animation use when inserting the new element. Possible values are 'slide', 'fade' or 'none'.
    - speed (Integer, default: 300): Speed in miliseconds at which the animation runs.
    - afterInsert (Function, default: NOOP): Callback function to run after the element gets injected.
    - beforeInsert (Function, default: NOOP): Callback function to run before the element gets injected.

