// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;
Titanium.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK);

var tabGroup = Titanium.UI.createTabGroup(
{
	barColor:'#000',
	backgroundColor: '#000',
	backgroundImage: 'images/app_start.jpg'
});
tabGroup.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
];


var welcomeView = Titanium.UI.createWindow({backgroundColor:'#000',title:'Pentagram',navBarHidden:false,left:0,right:0,top:0,bottom:0});
welcomeView.hideTabBar();
	

        
/*
welcomeView.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
];

*/

var pic = Titanium.UI.createImageView({image: 'images/partners/Pentagram_081710_0227_b.jpg',width:'auto',height:'auto'});
welcomeView.add(pic);
/*
pic.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
];
*/


/*
var cb = Titanium.UI.createButton({bottom:0,right:0,
color:"#fff",
font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
backgroundColor:'#000',
title:'Continue',width:100,height:25});
welcomeView.add(cb);
*/
//welcomeView.setRightNavButton(cb);

infoPanel = Titanium.UI.createView({
	bottom: 0,
	width: '100%',
	height: '32%',
});
infoPanel.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
];

welcomeView.add(infoPanel);

bg = Titanium.UI.createView({
	opacity: 0.5,
	left:0,right:0,
	backgroundColor: '#000'
});


infoPanel.add(bg);



var label = Titanium.UI.createWebView({backgroundColor:'transparent',height:'100%',url:'eddieIntro.html'});
//label.html = eddieIntro;


/*
	color:'#fff',
	left:8,right:8,top:-20,height: '100%',
	font:{fontSize:13,fontFamily: "Helvetica"},
    editable: false,
	text:eddieIntro
});
*/
infoPanel.add(label);



var partnersTab = Titanium.UI.createTab({
    title:'Partners',
    height:0,
    icon: Titanium.UI.iPhone.SystemIcon.MOST_VIEWED,
    window:welcomeView,active:true
});


tabGroup.addTab(partnersTab);
tabGroup.setActiveTab(0);
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});


welcomeView.addEventListener('click', function(){
	var images;
	var related;
	var rowData = {};
	
	db = Titanium.Database.install('content.db','quotes');
	rows = db.execute('SELECT partners.*, offices.name as office FROM partners LEFT JOIN offices ON offices.id = partners.officeid 	WHERE partners.id="17"');
	while (rows.isValidRow())
	{
		
		for (var i=0;i<rows.fieldCount();i++) { 
			rowData[rows.fieldName(i)] = rows.field(i);
			//Ti.API.info(rows.fieldName(i)+"  "+rows.field(i));
		}
		rows.next();
	}
	rows.close();
	
	images = [];
	rows = db.execute('SELECT * FROM images WHERE contentid="17" AND type="partners"');
	
	while (rows.isValidRow())
	{
		var bg = '#fff';
		images.push({source:rows.field(5),info:rows.field(6),bgcolor:bg,hratio:rows.field(0),wratio:rows.field(1)});
		rows.next();
	}
	rows.close();
	rowData.images = images;
	rowData.imagesLoaded = true;
	
	

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
	rowData.textLoaded = true;
		
	var grid = Titanium.UI.createWindow({
		url: 'gridview.js',
		backgroundColor:'#000',
		navBarHidden:false,
		barColor:'#111',
		title:rowData.title
	}); 
	grid.hideTabBar();	 
	grid.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];
	//Ti.API.info(JSON.stringify(rowData));
	
	rowData = JSON.parse(JSON.stringify(rowData));
	grid.data = rowData;	
	grid.addEventListener('focus',function(){
		var animation2 = Titanium.UI.createAnimation();
		animation2.opacity = 1;
		animation2.duration = 1;
		tabGroup.animate(animation2);	
	});  
	partnersTab.open(grid,{animate:true});		
});