
var win = Titanium.UI.currentWindow;     
win.backButtonTitle = "Back";

/*
var loadView = Ti.UI.createView({
    backgroundColor: '#d8d8d8',
    height: 480,
    width: 320
});
var loadingScreen = Titanium.UI.createActivityIndicator({
    height:50,
    width:210,
    color:'#404347',
    font:{fontFamily:'Helvetica Neue', fontSize:14,fontWeight:'normal'},
    message:'Loading...',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});

win.add(loadingScreen);	
loadingScreen.show();
*/

	var imagesArr;
	var related;
	var rowData = {};
	
	db = Titanium.Database.install('content.db','1.0');
	rows = db.execute('SELECT partners.*, offices.name as office FROM partners LEFT JOIN offices ON offices.id = partners.officeid 	WHERE partners.id="17"');
	while (rows.isValidRow())
	{
		
		for (var i=0;i<rows.fieldCount();i++) { 
			rowData[rows.fieldName(i)] = rows.field(i);
		}
		rows.next();
	}
	rows.close();
	
	imagesArr = [];
	rows = db.execute('SELECT * FROM images WHERE contentid="17" AND type="partners"');
	
	while (rows.isValidRow())
	{
		var bg = '#fff';
		imagesArr.push({source:rows.field(5),info:rows.field(6),bgcolor:bg,hratio:rows.field(0),wratio:rows.field(1)});
		rows.next();
	}
	rows.close();
	rows = db.execute('SELECT * FROM related WHERE contentid="17" AND tablename="partners"');
	
	while (rows.isValidRow())
	{
		rowData[rows.field(2)] = rows.field(3);
		rows.next();
	}
	rowData.dir = rowData.directory;
	rowData.title = rowData.name;
	
	rows.close();
	db.close();
	/*
rowData.textLoaded = true;
	rowData = JSON.parse(JSON.stringify(rowData));
	grid.data = rowData;	

*/



function adjustImages() {

	for(var i=0;i<images.length;i++) {
		var img = images[i];
		img.opacity =1;
		img.width = 70;
		img.height = 70;
	}
}

var images = [];
var list;
var OR = Titanium.UI.orientation;

var info = Titanium.UI.createButton({
	image: 'images/icons/19-gear.png'
});	
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
win.setToolbar([flexSpace,info],{animated:true});

var dialog2 = Titanium.UI.createOptionDialog({
	options:['Bio','Credits', 'New York Office', 'Close'],
	cancel:3,
	title:'Info'
});	
dialog2.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT,
		Titanium.UI.UPSIDE_PORTRAIT
];

info.addEventListener('click',function(e)
{
	dialog2.show();
});

dialog2.addEventListener('click', function(e)
{
	if(e.index == 0) {
		var w = Titanium.UI.createWindow({
			backgroundColor:'#000',
			title: 'Eddie Opara',
			barColor:'#111',
			width:'100%',
			height:'100%',
			url: 'bioview.js'
		});
		w.orientationModes = [
			Titanium.UI.PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT,
			Titanium.UI.UPSIDE_PORTRAIT
		];
		w.content = rowData.bio;
		Titanium.UI.currentTab.open(w,{animated:true}); 
	}
	else if(e.index == 1) {
		var w = Titanium.UI.createWindow({
			backgroundColor:'#000',
			title: 'Eddie Opara',
			barColor:'#111',
			width:'100%',
			height:'100%',
			url: 'bioview.js'
		});
		w.orientationModes = [
			Titanium.UI.PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT,
			Titanium.UI.UPSIDE_PORTRAIT
	  ];
	   w.content = rowData.credits;
	   Titanium.UI.currentTab.open(w,{animated:true}); 
	}
	else if(e.index == 2) {
		var w = Titanium.UI.createWindow({
			backgroundColor:'#000',
			title: 'New York Office',
			barColor:'#111',
			width:'100%',
			height:'100%',
			url: 'nyofficeview.js'
		});
		w.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT,
		Titanium.UI.UPSIDE_PORTRAIT
	  ];		
	  Titanium.UI.currentTab.open(w,{animated:true}); 
	}
});
var scrollView = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    top:0,left:4,right:0,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:true
});


var offset = 10;
var gap = 2;
var size = 70;
OR = Titanium.UI.orientation;
var cols = 4;
if(OR == 3 || OR == 4)
	cols = 6 ;
var colcounter = 1;
var x = offset; var y = offset;

for (var i=0;i<imagesArr.length;i++) {
	var imageView = Titanium.UI.createImageView({
		 image: rowData.dir+'thumbs/'+imagesArr[i].source,
		/* image: 'images/icons/icon_arrow_left.png', */
		width:70,height:70,top:y,left:x,opacity:0,
	});
	imageView.index = i;
	images[i] = imageView;

	imageView.addEventListener('click',function(e){	
		var slideShow = Titanium.UI.createWindow({
		 	url: 'slideshow.js',
			backgroundColor:'#000',
			navBarHidden:false,
			translucent:true,
			barColor:'#111'
		});
		slideShow.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT,
		Titanium.UI.UPSIDE_PORTRAIT
	  ];
		slideShow.index = e.source.index; 
		slideShow.hideTabBar()
		Titanium.UI.currentTab.open(slideShow,{animated:true});
	});		

	scrollView.add(imageView);	
	x += size+gap;
	colcounter++;
	if(colcounter == (cols+1)) {
		x = offset;
		y += size+gap;
		colcounter = 1;
	}
}
/*
loadingScreen.hide();
win.remove(loadingScreen);
*/
setTimeout(adjustImages,1000);

Ti.Gesture.addEventListener('orientationchange',doLayout);

function doLayout()		
{
	info.image = 'images/icons/19-gear.png';
	var offset = 10;
	var gap = 2;
	var size = 70;
	OR = Ti.UI.orientation;
	var cols = 8;
	if(OR == 3 || OR == 4)
		cols = 12 ;
	
	Ti.API.info("=======ORIENTATION======="+Ti.UI.orientation);
	
	var colcounter = 1;
	var x = offset; var y = offset;
	for (var i=0;i<images.length;i++) {
		var imageView = images[i];
		imageView.left = x;	
		imageView.top = y;	
		x += size+gap;
		colcounter++;
		if(colcounter == (cols+1)) {
			x = offset;
			y += size+gap;
			colcounter = 1;
		}
	}
}			  
Ti.App.addEventListener('imageSelected', function(e) 
{ 
	var index = e.index;
 	var slideShow = Titanium.UI.createWindow({
		 	url: 'slideshow.js',
			backgroundColor:'#000',
			navBarHidden:false,
			translucent:true,
			barColor:'#111'
	});
	slideShow.data = rowData;
	slideShow.index = index; 
	slideShow.hideTabBar()
	
	Titanium.UI.currentTab.open(slideShow,{animated:true,modal:true,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN});
});

win.add(scrollView);
	
