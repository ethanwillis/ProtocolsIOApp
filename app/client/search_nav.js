Template.search_nav.events({
	"click [data-action='search']": function(event) {
		event.preventDefault();
		var search_input = $('#search_input').val();
		var protocols_data = [];
		var protocols_data_index = {};
		Meteor.call("get_protocols", search_input, null, function(err, protocols_list_req) {
			if(err) {
				console.log("Error getting protocols: " + err);
				Session.set("search_list_data", protocols_data);
			} else {
				// Index the array of protocols by id.
				protocols_data_index = _.indexBy(protocols_list_req.protocols, 'protocol_id')

				// Get a list of protocol ids and resolve their metadata.
				var protocol_ids = _.keys(protocols_data_index);

				// Get the protocol metadata for all protocols in the given list.
				Meteor.call("get_protocol_json_arr", protocol_ids, function(err, protocols_meta_data) {
					// Add the metadata for each protocol to the protocol object in protocols_data
					// if it exists.
					if(err) {
						console.log("Error fetching metadata about protocols");
					} else {
						_.each(protocols_meta_data, function(protocol_meta_data, protocol_id) {
							//console.log("mapping meta data for " + protocol_id + " metadata: " + JSON.stringify(protocol_meta_data));
							protocols_data_index["" + protocol_id].meta = (protocol_meta_data.error_message == undefined) ?
																						protocol_meta_data : null;
						});
					}
					// Turn the data index into an array to be used by the UI
					_(protocols_data_index).each(function(protocol_data, protocol_id) {
							protocols_data.push(protocol_data);
					});
					Session.set("search_list_data", protocols_data);
				}); // Finish getting all metadata about all protocols in list.
			}
		});
	}
});
