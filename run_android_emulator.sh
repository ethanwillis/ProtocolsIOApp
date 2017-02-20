cd app
mkdir public
cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/
meteor run android --verbose --settings=../settings.json --port=3008
