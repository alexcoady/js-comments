/*
    @title Example JS file
    @author Alex Coady
    @date 05/08/2013
*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'routes/navigation-router'
], function ($, _, Backbone, JST, NavigationRouter) {
    'use strict';

    var PageView = Backbone.View.extend({

    	tagName: 'li',

    	className: 'page-item list-item',
    	
        template: JST['app/scripts/templates/page.ejs'],

        events: {

            'click': 'makeActive'
        },

        initialize: function () {

            this.model.on('change:active', this.toggleActive, this);
            this.$el.addClass("template-" + this.model.get('template') + " page-" + this.model.get('permalink') + " inactive");
        },

        /*
        *   Function render
        *   ----------------------------------------------------------
        *   Renders a page to this view using it's template
        *   ----------------------------------------------------------
        *   @param null
        *   @return View: This view
        */
        render: function () {

            var template = this.template( this.model.toJSON() );
            this.$el.html(template);

            return this;
        },

        /*
        *   Function toggleActive
        *   ----------------------------------------------------------
        *   Sets the correct active state
        *   ----------------------------------------------------------
        *   @param null
        *   @return View: This view
        */
        toggleActive: function () {

            if (this.model.get('active')) {

                document.title = this.model.get('title');
                this.$el.addClass('active').removeClass('inactive');

            } else {

                this.$el.removeClass('active').addClass('inactive');
            }

            return this;
        },

        /*
        *   Function makeActive
        *   ----------------------------------------------------------
        *   Activates this view's model
        *   ----------------------------------------------------------
        *   @param null
        *   @return Void
        */
        makeActive: function () {

            var router = NavigationRouter.getInstance();
            router.navigate( this.model.getFullPermalink(), { 'trigger' : true } );
        }
    });

    return PageView;
});