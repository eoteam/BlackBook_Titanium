var data;
var db; 
var rows;	
var OR = Titanium.UI.orientation;
var w = 320;
var h = 240;
if(OR == 2 || OR == 4){
	w = 480;
	h = 160;
}
/*
db = Titanium.Database.install('content.db', '1.0');
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
	images.push({source:rows.field(5),info:rows.field(6),bgcolor:'#fff',width:320,height:'auto'});
	rows.next();
}
rows.close();
db.close();
data.textLoaded = true;
data.images = images;
data.imagesLoaded = true;

db.close();

*/
var f = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'nyoffice.json');
var resources = JSON.parse(f.read().text);

var win = Titanium.UI.currentWindow;     
win.backButtonTitle = "Back";
win.title = "New York Office";

var imageViews = [];
for(var i=0;i<resources.images.length;i++) {
	var imageView = Titanium.UI.createImageView({
		image: 'images/offices/'+resources.images[i].name,
		width:'auto',height:'auto'
	});
	imageViews.push(imageView);
	
}

var scrollView = Titanium.UI.createScrollableView({
	views:imageViews,
	backgroundColor:'#000',
	height:h,width:w,top:0,
	pagingControlHeight:20,
	maxZoomScale:2.0,
	currentPage:0,
});

win.add(scrollView);

var htmlText = '<html><head><style>body{width: 100%; height: 100%; background-color: #000;color: #fff; font-family : Helvetica Neue;font-size: 14px}a{color: #fff; text-decoration: none}</style></head><body><p>204 Fifth Avenue<br />New York NY 10010</p><p>T +212 683 7000<br />F +212 532 0181<br />E <a href=\"#\">info@pentagram.com</a></p><h3>Location</h3><p>Flatiron district. Our office is a five-story building between 25th and 26th Streets, directly across from Madison Square Park.</p><h3>Directions via public transport</h3><p>From N/R/W subway station at 23rd Street, walk north two blocks from the intersection of Fifth Avenue and Broadway. Our building is marked with a letter P banner.</p><p></p><p></p><p></p><p></p></body></html>';
var descriptionField = Ti.UI.createWebView({height:h,width:w,top:h,backgroundColor:'#000'});
descriptionField.html = htmlText;//resources.office.desc;
win.add(descriptionField);	

var mapBtn = Titanium.UI.createButton({
	title: 'Map'	
});


mapBtn.addEventListener('click', function(e)
{
	var w = Titanium.UI.createWindow({
			backgroundColor:'#000',
			title: 'New York Office',
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

Ti.Gesture.addEventListener('orientationchange', function(e){
	if(e.orientation == 2 || e.orientation == 4) {
		descriptionField.width = 480;
		descriptionField.top = 160;
		descriptionField.height = 160;
		
		scrollView.width = 480;
		scrollView.height = 160;		
	}
	else {
		descriptionField.width = 320;
		descriptionField.top = 240;
		descriptionField.height = 240;
		
		scrollView.width = 320;
		scrollView.height = 240;	
	}
});


win.setRightNavButton(mapBtn);
