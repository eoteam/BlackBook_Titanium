
var win = Titanium.UI.currentWindow;     


win.backButtonTitle = "Back";

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
	options:['Bio','Credits', win.data.office+' Office', 'Close'],
	cancel:3,
	title:'Info'
});	
dialog2.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
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
			title: win.data.title,
			barColor:'#111',
			width:'100%',
			height:'100%',
			url: 'bioview.js'
		});
		w.orientationModes = [
			Titanium.UI.PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT
		];
		w.content = win.data.bio;
		Titanium.UI.currentTab.open(w,{animated:true}); 
		//w.open({modal:true,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN});
	}
	else if(e.index == 1) {
		var w = Titanium.UI.createWindow({
			backgroundColor:'#000',
			title: win.data.title,
			barColor:'#111',
			width:'100%',
			height:'100%',
			url: 'bioview.js'
		});
		w.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	  ];
	   w.content = win.data.credits;
	   //w.open({modal:true,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN}); 
	   Titanium.UI.currentTab.open(w,{animated:true}); 
	}
	else if(e.index == 2) {
		/*
win.close();
		Ti.App.fireEvent('officeSelected',{index:win.data.officeid});
*/
		var w = Titanium.UI.createWindow({
			backgroundColor:'#000',
			title: win.data.title,
			barColor:'#111',
			width:'100%',
			height:'100%',
			url: 'nyofficeview.js'
		});
		w.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
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
/*
var view = Ti.UI.createView({
	backgroundColor:'transparent',
	height:2000,
	top:0,left:0,right:0
});	
scrollView.add(view);
*/

//win.addEventListener('focus', function() {
	var offset = 10;
	var gap = 0;
	var size = 70;
	OR = Titanium.UI.orientation;
	var cols = 4;
	if(OR == 2 || OR == 4)
		cols = 6 ;
	var colcounter = 1;
	var x = offset; var y = offset;
	//Ti.API.info("focus  "+images.length);
	//if(images.length == 0) {
		for (var i=0;i<win.data.images.length;i++) {
			var imageView = Titanium.UI.createImageView({
				image: win.data.dir+'thumbs/'+win.data.images[i].source,
				width:70,height:70,top:y,left:x
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
				slideShow.data = win.data;
				slideShow.index = e.source.index; 
				slideShow.hideTabBar()
				Titanium.UI.currentTab.open(slideShow,{animated:true});
			});
			
/*
			imageView.addEventListener('load',function(e){
				e.source.width = 70;
				e.source.height = 70;
			});
*/
		

			scrollView.add(imageView);	
			x += size+gap;
			colcounter++;
			if(colcounter == (cols+1)) {
				x = offset;
				y += size+gap;
				colcounter = 1;
			}
			//Ti.API.info(x+","+y)
		}


		//setTimeout(doLayout,1000);
	/*
}
	else {	
		doLayout();
	}
	
	Ti.Gesture.addEventListener('orientationchange',doLayout);
		
});
*/
/*

	list = JSON.parse('{ "dir":"'+win.data.dir+'","images":'+ JSON.stringify(win.data.images) + ' }');
	images = JSON.parse(JSON.stringify(win.data.images));
	var webview = Ti.UI.createWebView({height:'100%',width:'100%',backgroundColor:'#000'});
	webview.url = "gallery.html";    
		 
	webview.addEventListener('load', function()
	{
		Titanium.API.debug('loaded');		
	   	Ti.App.fireEvent('pageReady',{data:list});
	});
	
	win.add(webview);
*/


Ti.Gesture.addEventListener('orientationchange',doLayout);
/*
win.addEventListener('close',function(){
	for (var i=0;i<images.length;i++) {
		win.remove(images[i]);
	}
});
*/

function doLayout(e)		
{
	info.image = 'images/icons/19-gear.png';
// get orienation from event object
	var offset = 10;
	var gap = 0;
	var size = 70;
	OR = Ti.UI.orientation;
	var cols = 4;
	if(OR == 2 || OR == 4)
		cols = 6 ;
	Ti.API.info('orientationchange45',OR,cols);
	
	var colcounter = 1;
	var x = offset; var y = offset;
	for (var i=0;i<images.length;i++) {
		//var animation = Titanium.UI.createAnimation();
		//animation.left = x;
		//animation.top = y;
		//animation.duration = 250;
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
		//Ti.API.info(x+","+y)
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
	slideShow.data = win.data;
	slideShow.index = index; 
	slideShow.hideTabBar()
	
	Titanium.UI.currentTab.open(slideShow,{animated:true,modal:true,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN});
 	//win.navGroup.open(slideShow,{animated:true});
});

win.add(scrollView);
	
