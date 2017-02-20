require('pdfjs-dist');
PDFJS.workerSrc = 'http://localhost:3008/pdf.worker.min.js';

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
				
				var pageNumber = 1;
				pdf.getPage(pageNumber).then(function(page) {
					console.log('Page loaded');
					
					var scale = 1.5;
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
