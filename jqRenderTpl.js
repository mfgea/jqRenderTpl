/*

    jqRenderTpl – A microtemplating plugin for jQuery
    Version     : 0.7.0
    Forked from : http://armincifuentes.cl/grow

    Author  : Matias Gea

    Original Author  : Armin Cifuentes
    Original Company : Octano (http://octano.cl)
    License : GPLv3 / http://www.gnu.org/licenses/gpl.html

*/

(function ($) {

    var methods = {

        init: function (options) {

            var d = {
                templateURL     : null,
                templateContent : null,
                cache           : true,
                animation       : 'fade',
                speed           : 300,
                afterInsert     : function () {},
                beforeInsert    : function () {}
            };

            return this.each( function () {

                $(this).data('jqRenderTplSettings', $.extend(d,options) );

            });

        },

        _afterFetch: function(element, html, params, options, where){
            var result = methods.renderHTML(html, params),
                speed  = options.speed;

            switch (options.animation) {
                case 'slide':
                    result = $(result).slideDown(speed);
                    break;

                case 'fade':
                    result  = $(result).fadeIn(speed);
                    break;

                default:
                    result = result;
                    break;
            }

            if(typeof $(element)[where] == 'function'){
                $(element)[where].call($(element), result);
            } else {
                $(element).append.call($(element), result);
            }

            if (typeof options.afterInsert == 'function' ) {
                options.afterInsert.call(this);
            }
        },

        _fetchContent: function(element, template, data, options, where){
            $.ajax({
                url:      template,
                cache:    options.cache,
                dataType: 'html',
                success:  function (html) {
                    methods._afterFetch(element, html, data, options, where);
                }
            });
        },

        _getContent: function(element, template, data, options, where){
            methods._afterFetch(element, template, data, options, where);
        },

        inject: function(template, data, options, where){

            return this.each( function () {
                var element = this;

                if (typeof options.beforeInsert == 'function' ) {
                    options.beforeInsert.call(this);
                }

                var regex = /^(http|\.|\/)/;

                if(template.match(regex)){
                    methods._fetchContent(element, template, data, options, where);
                } else {
                    methods._getContent(element, template, data, options, where);
                }

            });

        },

        append: function (params) {
            methods.inject(params, 'append');
        },

        prepend: function (params) {
            methods.inject(params, 'prepend');
        },

        /**
         *
         */
        renderHTML: function (html, params) {

            $.each(params, function (key, value) {

                var key = '{{' + key + '}}',
                    value = value || '';

                while (html.indexOf(key) > -1) {
                    html = html.replace(key, value);
                }
            });

            return html;

        }
    }

    $.fn.render = function (template, data, options) {

        data = typeof data == 'object' && data.length ? data : [ data ];
        for(var i = 0, len = data.length; i < len; i++){
            methods.inject.apply(this, [ template, data[i], options ]);
        };

    }

})(jQuery);
