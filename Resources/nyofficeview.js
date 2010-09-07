var data;
var db; var rows;	
db = Titanium.Database.install('content.db','quotes');
rows = db.execute("SELECT * FROM offices WHERE name='New York'");
while (rows.isValidRow())
{
	data = {top: 10,rowHeight: 45,
		color: '#fff', 
 		rightImage:'images/icons/chevron2.png',	
 		title:rows.field(1),
 		textLoaded: false,
 		imageLoaded:false,
 		id: rows.field(0)};
		
		//Ti.API.info(data[data.length-1].description);
		
	rows.next();
}

rows.close();


		rows = db.execute('SELECT * FROM related WHERE contentid="'+data.id+'" AND tablename="offices"');
		while (rows.isValidRow())
		{
			data[rows.field(2)] = rows.field(3);
			rows.next();
		}
		rows.close();
		
		var images = [];
		rows = db.execute('SELECT * FROM images WHERE contentid="'+data.id+'" AND type="offices"');
		while (rows.isValidRow())
		{
			images.push({source:rows.field(3),info:rows.field(4),bgcolor:'#fff'});
			rows.next();
		}
		rows.close();
		db.close();
		data.textLoaded = true;
		data.images = images;
		data.imagesLoaded = true;


db.close();


var win = Titanium.UI.currentWindow;     
win.backButtonTitle = "Back";
win.title = "New York Office";
/*
var b = Titanium.UI.createButton({
	title:'Close',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

win.setLeftNavButton(b);
b.addEventListener('click',function()
{
	win.close();
});
*/


var imageViews = [];
for(var i=0;i<data.images.length;i++) {
	var imageView = Titanium.UI.createImageView({
		image: 'images/offices/'+data.images[i].source,
		width:'auto',height:'auto'
	});
	imageViews.push(imageView);
	
}

var scrollView = Titanium.UI.createScrollableView({
	views:imageViews,
	backgroundColor:'#000',
	height:'240',top:0,
	pagingControlHeight:30,
	maxZoomScale:2.0,
	currentPage:0,
});

win.add(scrollView);

var descriptionField = Ti.UI.createWebView({width:'100%',top:'240',backgroundColor:'#000'});
descriptionField.html = data.desc;
win.add(descriptionField);	

var mapBtn = Titanium.UI.createButton({
	title: 'Map'	
});


mapBtn.addEventListener('click', function(e)
{

	var w = Titanium.UI.createWindow({
			backgroundColor:'#000',
			title: data.title,
			barColor:'#111',
			width:'100%',
			height:'100%',
			navBarHidden: false,
			url: 'officemapview.js'
		});
		w.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	  ];
	w.data = data;
	w.open({modal:true});//{modal:true,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN});
});

win.setRightNavButton(mapBtn);
