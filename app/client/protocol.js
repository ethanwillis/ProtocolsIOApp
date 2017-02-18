Template.protocol.helpers({
	data: function() {
		var data = Session.get("protocol_data");
		if(data) {;
			return data;
		} else {
			return [];
		}
	}
});
