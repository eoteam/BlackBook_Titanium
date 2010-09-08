var win = Titanium.UI.currentWindow;
win.backButtonTitle = "Back";
win.title = (win.index+1) + ' / ' + win.data.images.length;
var loadingScreen = Titanium.UI.createActivityIndicator({
    height:50,
    width:210,
    color:'#404347',
    font:{fontFamily:'Helvetica Neue', fontSize:14,fontWeight:'normal'},
    message:'Loading...',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});
loadingScreen.show();
win.add(loadingScreen);

var first = true;
var imageViews = [];
var toolBarVisible = true;
var toolbar;
var infoPanel;
var playing = false;
var timer;
var OR = Titanium.UI.orientation;
var pad = 44;

function adjustIcons() {
	prev.image = 'images/icons/icon_arrow_left.png';	
	next.image = 'images/icons/icon_arrow_right.png';
	info.image = 'images/icons/19-gear.png';
}
function adjustCurrentImage() {
	prev.image = 'images/icons/icon_arrow_left.png';	
	next.image = 'images/icons/icon_arrow_right.png';
	info.image = 'images/icons/19-gear.png';
	var start = win.index-1;
	if(win.index == 0)
		start = 0;
				
	for(var i=start;i<=win.index+1;i++) {
		var img = imageViews[i].child;
		var ratio = win.data.images[i].wratio / win.data.images[i].hratio;
		
		if(OR == 2 || OR == 4) {
			img.height = 320;
			img.width = 320 / ratio;//win.data.images[scrollView.currentPage].wratio;
		}
		else {
			img.width = 320;
			img.height = 320 * ratio;//win.data.images[scrollView.currentPage].hratio;
		}
		
	}
	imageViews[0].child.opacity = 1;
	if(first) {
		loadingScreen.hide();
		win.remove(loadingScreen);
		first = false;
	}
}		
function displayImage() {
	scrollView.scrollToView(scrollView.views[win.index]);
	win.title = (win.index+1) + ' / ' + win.data.images.length;
	Ti.App.fireEvent('imageInfoChanged', {info:win.data.images[win.index].source});
}
function closeInfoWindow() {
	infoVisible = false;
	var animation = Titanium.UI.createAnimation();
	animation.opacity = 0;
	animation.duration = 250;
	animation.addEventListener('complete',function(){infoPanel.close()});
	infoPanel.animate(animation);
}
function nextImage() {
	win.index--;
	if(win.index == -1) 
		win.index = win.data.images.length-1;
	displayImage();
}
function toggleFullScreen() {
	if(toolBarVisible) {
		toolBarVisible = false;
		win.setToolbar(null,{animated:true});
		win.hideNavBar();
		win.remove(toolbar);
		Titanium.UI.iPhone.hideStatusBar();
		closeInfoWindow();
	}
	else {
		Titanium.UI.iPhone.showStatusBar();
		toolBarVisible = true;
		
		toolbar = Titanium.UI.createToolbar({ items:[mail,flexSpace,prev,fixedSpace,play,fixedSpace,next,flexSpace,info], bottom:0, borderTop:true, 
		borderBottom:false, translucent:true,barColor:'black' });
		win.add(toolbar);
		win.showNavBar();
		pad = 44;
		if(OR == 2 || OR == 4) 
			pad = 30;
		infoPanel.open();
		infoPanel.info = win.data.images[win.index].source;
		if(playing) {
			playing = false;
			clearInterval(timer);
		}
	}
}


var dialog = Titanium.UI.createOptionDialog({
	options:['Email','Cancel'],
	cancel:1,
	title:'Share this photo'
});		
var mail = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.ACTION		
});
mail.addEventListener('click', function()
{
	dialog.show();

});
dialog.addEventListener('click',function(e)
{
	if(e.index == 0) {
		var emailDialog = Titanium.UI.createEmailDialog();
  		emailDialog.subject = win.data.name +"'s work";
  		emailDialog.toRecipients = [];
  		emailDialog.messageBody = win.data.images[win.index].info;
		var f = Ti.Filesystem.getFile(win.data.dir+win.data.images[win.index].source);
		emailDialog.addAttachment(f);
		emailDialog.open();
	}
});	
if(OR == 2 || OR == 4) 
	pad = 30;

infoPanel = Titanium.UI.createWindow({
	opacity: 1,
	bottom: pad,
	width: '100%',
	height: '15%',
	backgroundColor:'transparent',
	url: 'imageinfoview.js'
});
infoPanel.info = win.data.images[win.index].info;
win.add(infoPanel);
infoPanel.open();


var prev = Ti.UI.createButton({
	image: 'images/icons/icon_arrow_left.png'
});
		
var play = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.PLAY		
});

var next = Ti.UI.createButton({
	image: 'images/icons/icon_arrow_right.png'
});

var info = Titanium.UI.createButton({
	image: 'images/icons/19-gear.png'
});		

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var fixedSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FIXED_SPACE,
	width:20
});

toolbar = Titanium.UI.createToolbar({ items:[mail,flexSpace,prev,fixedSpace,play,fixedSpace,next,flexSpace,info], bottom:0, borderTop:true, 
borderBottom:false, barColor:'black', translucent:true});	
win.add(toolbar);


var dialog2 = Titanium.UI.createOptionDialog({
	options:['Bio','Credits', win.data.office+' Office', 'Close'],
	cancel:3,
	title:'Info'
});

for(var i=0;i<win.data.images.length;i++) {
	
	var holder = Titanium.UI.createWindow({	
		backgroundColor:'#000'
	});
	var ratio = win.data.images[i].wratio / win.data.images[i].hratio;
	var w = 320;
	var h = 320*ratio;
	if(OR == 2 || OR == 4) {
		w = 320 / ratio;
		h = 320;
	}
	var op = 1;
	if(i == 0)
		op = 0;
	else
		op = 1;
	var imageView = Titanium.UI.createImageView({
		image: win.data.dir+win.data.images[i].source,
		width:w,height:h,canScale:true,opacity:op
	});
	imageView.ratio = ratio;
	holder.add(imageView);
	imageViews.push(holder);
	holder.child = imageView;
}

var scrollView = Titanium.UI.createScrollableView({
	views:imageViews,
	showPagingControl:false,	
	maxZoomScale:1.0,
	clipViews:true,
	currentPage:win.index,
});

scrollView.addEventListener('scroll', function(e)
{
	i = e.currentPage;
	win.title = (i+1) + ' / ' + win.data.images.length;
	win.index = i;
	Ti.App.fireEvent('imageInfoChanged', {info:win.data.images[win.index].source});
	adjustCurrentImage();
});
win.add(scrollView);
setTimeout(adjustCurrentImage,200);
setTimeout(adjustIcons,200);

Ti.Gesture.addEventListener('orientationchange',function(e)
{
	Ti.API.info(e.orientation);
	OR = e.orientation;
	
	adjustCurrentImage();
	
	if(playing == false && toolBarVisible == true) {
		if(OR == 2 || OR == 4) {
			infoPanel.bottom = 30;	
		}
		else {
			infoPanel.bottom = 44;
		}
		infoPanel.info = win.data.images[win.index].info;
	}
});
info.addEventListener('click',function(e)
{
	dialog2.show();
});

dialog2.addEventListener('click', function(e)
{

	closeInfoWindow();
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
	   Titanium.UI.currentTab.open(w,{animated:true}); 
	}
	else if(e.index == 2) {
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

win.addEventListener('singletap',function(e)
{
	toggleFullScreen();
	
});

play.addEventListener('click', function()
{
	if(playing) {
		playing = false;
		toolBarVisible = false;
		toggleFullScreen();
		clearInterval(timer);
	}
	else {
		playing = true;	
		toolBarVisible = true;
		toggleFullScreen();
		timer = setInterval(function(){
			win.index++;
			if(win.index == win.data.images.length) 
				win.index = 0;
			displayImage();
		}, 3000 );
	}
});

prev.addEventListener('click', function()
{
	nextImage();
});
next.addEventListener('click', function()
{	
	win.index++;
	if(win.index == win.data.images.length) 
		win.index = 0;
	displayImage();
});

//setTimeout(adjustCurrentImage(),3000);
