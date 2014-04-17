// Users Module that is turning the [FeedHenry User API's](http://docs.feedhenry.com/v2/useradmin_api.html "FH Docs")
// into a more traditional REST Interface

(function() {

    var Documents = {};

    var testDocs = [
		{
			id: '1',
			docname: 'Lady & Peebles',
			filename: 'LadyandPeebles.pdf',
			remotepath: 'http://dl.dropbox.com/s/nah24zlm01uwd0q/LadyandPeebles.pdf',
			localpath: '',
			thumbnail: 'LadyandPeebles.png',
			tnSrc: 'https://dl.dropbox.com/s/67bl5btrk99t9jh/LadyandPeebles.png',
			timestamp: 1391253180000
		},
		{
			id: '2',
			docname: 'Burning Low',
			filename: 'BurningLow.pdf',
			remotepath: 'http://dl.dropbox.com/s/mykvge52gjny0i2/BurningLow.pdf',
			localpath: '',
			thumbnail: 'BurningLow.png',
			tnSrc: 'https://dl.dropbox.com/s/5g7o9j6cg3dd76n/BurningLow.png',
			timestamp: 1391425980000
		},
		{
			id: '3',
			docname: 'Card Wars',
			filename: 'CardWars.pdf',
			remotepath: 'http://dl.dropbox.com/s/ck4jw0wx8oxbz2c/CardWars.pdf',
			localpath: '',
			thumbnail: 'CardWars.png',
			tnSrc: 'https://dl.dropbox.com/s/5q3abq1tx7yv3vo/CardWars.png',
			timestamp: 1392289980000
		},
		{
			id: '4',
			docname: 'I Remember You',
			filename: 'IRememberYou.pdf',
			remotepath: 'http://dl.dropbox.com/s/wtpc5sylrufkuio/IRememberYou.pdf',
			localpath: '',
			thumbnail: 'IRememberYou.png',
			tnSrc: 'https://dl.dropbox.com/s/qjm78d3puauvu7n/IRememberYou.png',
			timestamp: 1392284592000
		},
		{
			id: '5',
			docname: 'The Pit',
			filename: 'ThePit.pdf',
			remotepath: 'http://dl.dropbox.com/s/a1bwirlu46eh6jj/ThePit.pdf',
			localpath: '',
			thumbnail: 'ThePit.png',
			tnSrc: 'https://dl.dropbox.com/s/4s6cxish1tx3xie/ThePit.png',
			timestamp: 1392889392000
		},
		{
			id: '6',
			docname: 'Five Short Graybles',
			filename: 'FiveShortGraybles.docx',
			remotepath: 'http://dl.dropbox.com/s/cmb8flhg73qdj98/FiveShortGraybles.docx',
			localpath: '',
			thumbnail: 'FiveShortGraybles.png',
			tnSrc: 'https://dl.dropbox.com/s/dwl1qep2bron12a/FiveShortGraybles.png',
			timestamp: 1393317537352
		},
		{
			id: '7',
			docname: 'Another Five More Short Graybles',
			filename: 'AnotherFiveMoreShortGraybles.doc',
			remotepath: 'http://dl.dropbox.com/s/5meloxc1g8fbver/AnotherFiveGraybles.doc',
			localpath: '',
			thumbnail: 'AnotherFiveMoreShortGraybles.png',
			tnSrc: 'https://dl.dropbox.com/s/8h1mcm2v6plhjr0/AnotherFiveMoreShortGraybles.png',
			timestamp: 1393062192000
		}
    ];

    //everything's nicely packaged into a `Routes` object
    Documents.routes = function( app ) {
		app.get( '/docs', function( req, res)  {
			testDocs[5].timestamp = new Date().getTime();
			return res.send( testDocs );
		});
	};

	module.exports = Documents;

})();