FlowRouter.route('/', {
	name: 'main',
	action: function(param, query_params) {
		BlazeLayout.render('search_template', {
			search_nav: 'search_nav',
			search_list: 'search_list'
		});
	}
});
