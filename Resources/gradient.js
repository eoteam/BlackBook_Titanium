var win = Ti.UI.currentWindow;

var container = Ti.UI.createView({
	height:50,
	width:'100%',
	bottom:0});
win.add(container);

var bg = Ti.UI.createView({
	height:'100%',
	width:'100%',
    borderTop:true, 
	borderBottom:false,
	backgroundGradient:{
		type:'linear',
		colors:['#111','#444'],
		startPoint:{x:0,y:25},
		endPoint:{x:0,y:50},
		backFillStart:true
	}
});
container.add(bg);
var mail = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.ACTION		
});
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

var btnContainer = Ti.UI.createWindow({
	height:'100%',layout:'horizontal',
	width:'100%'});
	

var toolbar1 = Titanium.UI.createToolbar({height:50,items:[mail,flexSpace,prev,fixedSpace,play,fixedSpace,next,flexSpace,info]});

		
container.add(toolbar1);