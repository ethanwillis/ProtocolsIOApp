cd app
mkdir public
cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/
meteor --settings=../settings.json --port=3008
