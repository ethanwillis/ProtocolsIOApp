import { Meteor } from 'meteor/meteor';
import ProtocolsIO from '../node_modules/protocolsioapi/protocolsio.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	get_protocols: function(search_input, page_id) {
		var protocolsio_client = new ProtocolsIO(Meteor.settings.protocolsio_api_key);
		var getProtocolsSync = Meteor.wrapAsync(protocolsio_client.getProtocols, protocolsio_client);
		var result = getProtocolsSync(search_input, page_id);
		return JSON.parse(result);
	}
});
