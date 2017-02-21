require('pdfjs-dist');
PDFJS.workerSrc = '/pdf.worker.min.js';

Template.pdf.helpers({});
Template.pdf.onRendered(function() {
	var protocolid = FlowRouter.getParam('protocol_id');
	Meteor.call('get_protocol_pdf', protocolid, function(error, result) {
		if(error) {
			alert(error);
		} else {
			var loadingTask = PDFJS.getDocument({data: result});
			loadingTask.promise.then(function(pdf) {
				console.log('PDF loaded');
				
				// get page number from the query parameters
				var pageQuery = FlowRouter.getQueryParam('page');
				
				// If the page number exists, then pass it back through parseInt. Otherwise just use 1.
				var pageNumber = parseInt((pageQuery == undefined) ? 1 : pageQuery);
				pdf.getPage(pageNumber).then(function(page) {
					console.log('Page loaded');
					
					var scale = 1.0;
					var viewport = page.getViewport(scale);
					
					var canvas = document.getElementById('the-canvas');
					var context = canvas.getContext('2d');
					
					canvas.height = viewport.height;
					canvas.width = viewport.width;
					
					var renderContext = {
						canvasContext: context,
						viewport: viewport
					};
					var renderTask = page.render(renderContext);
					renderTask.then(function () {
						console.log('Page rendered');
					});
				});
			}, function(reason) {
				console.error(reason);
			});
		}
	});
});
