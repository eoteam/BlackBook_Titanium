var win = Titanium.UI.currentWindow;     
win.backButtonTitle = "Back";


var imageViews = [];
for(var i=0;i<win.data.images.length;i++) {
	var imageView = Titanium.UI.createImageView({
		image: 'images/offices/'+win.data.images[i].source,
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
descriptionField.html = win.data.desc;
win.add(descriptionField);	

var mapBtn = Titanium.UI.createButton({
	title: 'Map'	
});


mapBtn.addEventListener('click', function(e)
{

	var w = Titanium.UI.createWindow({
			backgroundColor:'#000',
			title: win.data.title,
			barColor:'#111',
			width:'100%',
			height:'100%',
			url: 'officemapview.js'
		});
		w.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	  ];
	w.data = win.data;
	w.open({modal:true});
});

win.setRightNavButton(mapBtn);
