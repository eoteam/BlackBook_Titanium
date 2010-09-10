// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK);

var tabGroup = Titanium.UI.createTabGroup(
{
	barColor:'#000',
	backgroundColor: '#000'
});
tabGroup.orientationModes = [
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
];


var welcomeView = Titanium.UI.createWindow({backgroundColor:'#000',title:'Pentagram',navBarHidden:false,left:0,right:0,top:0,bottom:0});
welcomeView.hideTabBar();       

var partnersTab = Titanium.UI.createTab({
    title:'Partners',
    height:0,
    icon: Titanium.UI.iPhone.SystemIcon.MOST_VIEWED,
    window:welcomeView,active:true
});


welcomeView.addEventListener('click', function(){
			
	var grid = Titanium.UI.createWindow({
		url: 'gridview.js',
		backgroundColor:'#000',
		navBarHidden:false,
		barColor:'#111',
		title:'Eddie Opara'
	}); 
	grid.hideTabBar();	 
	grid.orientationModes = [
			Titanium.UI.PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT,
			Titanium.UI.UPSIDE_PORTRAIT
	];
	partnersTab.open(grid,{animate:true});		
});


var pic = Titanium.UI.createImageView({image: 'images/partners/Pentagram_081710_0227_b.jpg',width:'auto',height:'auto'});
welcomeView.add(pic);


infoPanel = Titanium.UI.createView({
	bottom: 0,
	width: '100%',
	height: '32%',
});
infoPanel.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT
];

welcomeView.add(infoPanel);

bg = Titanium.UI.createView({
	opacity: 0.5,
	left:0,right:0,
	backgroundColor: '#000'
});


infoPanel.add(bg);


var eddieIntro = "Eddie Opara, has joined Pentagram as a partner. He becomes the seventh principal in Pentagram's New York office, where his team will be based. He joins Pentagram from his own studio, The Map Office, which he established in 2005.";

var label = Titanium.UI.createLabel({
	color:'#fff',
	left:8,right:8,top:0,height: '100%',
	font:{fontFamily:'Helvetica Neue', fontSize:14,fontWeight:'normal'},
    editable: false,
	text:eddieIntro
});

infoPanel.add(label);





tabGroup.addTab(partnersTab);
tabGroup.setActiveTab(0);
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});