Template.search_list.helpers({
	data: function() {
		var data = Session.get("search_list_data");
		if(data) {;
			return data;
		} else {
			return [];
		}
	}
});
