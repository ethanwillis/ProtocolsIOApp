Template.search_nav.events({
	"click [data-action='search']": function(event) {
		event.preventDefault();
		var search_input = $('#search_input').val();

		Meteor.call("get_protocols", search_input, null, function(err, protocols_data) {
			if(err) {
				console.log("Error getting protocols: " + err);
				Session.set("search_list_data", undefined);
			} else {
				Session.set("search_list_data", protocols_data);
			}
		});
	}
});
