import { Meteor } from 'meteor/meteor';
import ProtocolsIO from '../node_modules/protocolsioapi/protocolsio.js';
protocolsio_client = new ProtocolsIO(Meteor.settings.protocolsio_api_key);

Meteor.startup(() => {
});

Meteor.methods({
	get_protocols: function(search_input, page_id) {
		var getProtocolsSync = Meteor.wrapAsync(protocolsio_client.getProtocols, protocolsio_client);
		var result = getProtocolsSync(search_input, page_id);
		return result;
	},
	get_protocol_json: function(protocol_id) {
		this.unblock();
		var getProtocolJSONSync = Meteor.wrapAsync(protocolsio_client.getProtocolJSON, protocolsio_client);
		var result = getProtocolJSONSync(protocol_id);
		return JSON.parse(result);
	},
	get_protocol_json_arr: function(protocol_ids) {
		this.unblock();
		var getProtocolJSONArraySync = Meteor.wrapAsync(protocolsio_client.getProtocolJSONArray, protocolsio_client);
		var result = getProtocolJSONArraySync(protocol_ids);
		return result;
	},
	get_protocol_pdf: function(protocol_id) {
		this.unblock();
		var getProtocolPDFSync = Meteor.wrapAsync(protocolsio_client.getProtocolPDF, protocolsio_client);
		var result = getProtocolPDFSync(protocol_id);
		return result;
	}
});


Meteor.methods({
	get_protocols_with_metadata(search_input, page_id) {
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
					return protocols_data;
				}); // Finish getting all metadata about all protocols in list.
			}
		});
	}
})
