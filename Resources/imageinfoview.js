var win = Titanium.UI.currentWindow; 
win.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	  ];

bg = Titanium.UI.createView({
	opacity: 0.5,
	left:0,right:0,top:0,bottom:0,
	backgroundColor: '#000'
});
win.add(bg);

var infoField = Titanium.UI.createTextArea({
	value: win.info,
	font:{fontFamily:'Helvetica Neue', fontSize:14,fontWeight:'normal'},
    color:'#fff',
	left:0,right:0,top:0,bottom:0,
    editable: false,   
    backgroundColor:'transparent',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(infoField);

function closeWindow() {
	var animation = Titanium.UI.createAnimation();
	animation.opacity = 0;
	animation.duration = 250;
	animation.addEventListener('complete',function(){win.close();});
	win.animate(animation);
}		

win.addEventListener('click', function() {
	//closeWindow();
});

win.addEventListener('singletap', function() {
	//closeWindow();
});

Ti.App.addEventListener('imageInfoChanged',function(e) {
	infoField.value = e.info;
	win.info = e.info;
	
});