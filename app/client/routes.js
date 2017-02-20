FlowRouter.route('/', {
	name: 'main',
	action: function(param, query_params) {
		BlazeLayout.render('search_template', {
			nav: 'search_nav',
			search_list: 'search_list'
		});
	}
});

FlowRouter.route('/protocol/:protocol_id', {
	name: 'protocol',
	action: function(param, query_params) {
		BlazeLayout.render('protocol', {
			nav: 'search_nav',
			protocol: 'protocol'
		});
	}
});

FlowRouter.route('/protocol/:protocol_id/pdf', {
	name: 'pdf',
	action: function(param, query_params) {
		BlazeLayout.render('pdf', {
			nav: 'search_nav',
			search_list: 'pdf'
		});
	}
});
