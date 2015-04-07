/**
 *  jqRenderTpl – A small templating plugin for jQuery
 *  Version     : 1.0.0
 *  Author  : Matias Gea
 *  License : GPLv3 / http://www.gnu.org/licenses/gpl.html
 */

(function ($) {

    var methods = {

        _noop: function(){
            return this;
        },

        defaultOptions: {
                templateType    : 'html', // 'html' or 'url'
                cache           : true,
                animation       : 'fade', // 'fade', 'slide' or 'none'
                speed           : 300,
                afterInsert     : this._noop,
                beforeInsert    : this._noop
        },

        _renderContent: function(element, html, data, options){
            var $renderedItem,
                $element = $(element),
                speed = options.speed,

                animationFunction = {
                    'slide': $.fn.slideDown,
                    'fade': $.fn.fadeIn
                }[options.animation] || methods._noop;

            $.each(data, function(idx, itemData){
                $renderedItem = $(methods.renderHTML(html, itemData));

                $renderedItem = animationFunction.apply($renderedItem, [ speed ]);

                $element.append($renderedItem);

                if (typeof options.afterInsert == 'function' ) {
                    options.afterInsert.apply(this);
                }
            });
        },

        _fetchContent: function(element, template, data, options){
            $.ajax({
                url:      template,
                cache:    options.cache,
                dataType: 'html',
                success:  function (html) {
                    methods._renderContent(element, html, data, options);
                }
            });
        },

        inject: function(template, data, options){

            return this.each( function () {
                var element = this;

                if (typeof options.beforeInsert == 'function' ) {
                    options.beforeInsert.apply(this);
                }

                var fetchFunction = {
                    'url': methods._fetchContent,
                    'html': methods._renderContent
                }[options.templateType] || methods._noop;

                fetchFunction.apply(this, [ element, template, data, options ]);
            });

        },

        renderHTML: function (html, params) {
            var key, value;
            $.each(params, function (key, value) {
                key = '{{' + key + '}}';
                value = value || '';

                while (html.indexOf(key) > -1) {
                    html = html.replace(key, value);
                }
            });

            return html;
        }
    };

    $.fn.render = function (template, data, options) {
        data = $.makeArray(data);

        options = $.extend({}, methods.defaultOptions, options);

        methods.inject.apply(this, [ template, data, options ]);
    };

})(jQuery);
