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
