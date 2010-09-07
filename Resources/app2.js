// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;
Titanium.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK);
var tabGroup = Titanium.UI.createTabGroup(
{
	barColor:'#111',
	opacity: 0,
	backgroundColor: '#000',
	backgroundImage: 'images/app_start.jpg'
});

//partners list
var partnersMenu = Titanium.UI.createWindow({  
    url: 'partnersview.js',
    title:'Pentagram', 
	navBarHidden:false,
    backgroundColor:'#000',
});           
partnersMenu.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
];
var partnersTab = Titanium.UI.createTab({
    title:'Partners',
    height:10,
    icon: Titanium.UI.iPhone.SystemIcon.MOST_VIEWED,
    window:partnersMenu,active:true
});


var officeMenu = Titanium.UI.createWindow({  
	url: 'officesview.js',
    title:'Pentagram', 
	navBarHidden:false,
    backgroundColor:'#000',
});           
officeMenu.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
];
var officeTab = Titanium.UI.createTab({
    title:'Offices',
    height:10,
    window:officeMenu
});

tabGroup.addTab(partnersTab);
tabGroup.addTab(officeTab);

tabGroup.setActiveTab(0); 

tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});


var welcomeView = Titanium.UI.createWindow({width:'100%',height:'100%',backgroundColor:'#000'});
var label = Titanium.UI.createLabel({color:'#fff',text:'Eddie Opara',height:'auto',width:'auto',font:{fontSize:20}});
welcomeView.add(label);
welcomeView.open();




welcomeView.addEventListener('click', function(){
	var animation = Titanium.UI.createAnimation();
	animation.opacity = 0;
	animation.duration = 250;
	welcomeView.animate(animation);
	
	/*
var animation2 = Titanium.UI.createAnimation();
	animation2.opacity = 1;
	animation2.duration = 250;
	tabGroup.animate(animation2);
	Ti.API.info(partnersMenu.getData());
*/
	
	var images;
	var related;
	var rowData;
	
	var arr = JSON.parse(Titanium.App.Properties.getString("partners"));
	
	Ti.API.info(arr.length);
	for (var i=0;i<arr.length;i++) {
		if(arr[i].id == 17) {
			rowData = arr[i];
			break;
		}
	}

	images = [];
	db = Titanium.Database.install('content.db','quotes');
	rows = db.execute('SELECT * FROM images WHERE contentid="17" AND type="partners"');
	
	while (rows.isValidRow())
	{
		var bg = '#fff';
		images.push({source:rows.field(3),info:rows.field(4),bgcolor:bg});
		rows.next();
	}
	rows.close();
	db.close();
	rowData.images = images;
	rowData.imagesLoaded = true;
	

	related = [];
	db = Titanium.Database.install('content.db','quotes');
	rows = db.execute('SELECT * FROM related WHERE contentid="17" AND tablename="partners"');
	
	while (rows.isValidRow())
	{
		rowData[rows.field(2)] = rows.field(3);
		rows.next();
	}
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
	grid.data = rowData;	
	grid.addEventListener('focus',function(){
		var animation2 = Titanium.UI.createAnimation();
		animation2.opacity = 1;
		animation2.duration = 1;
		tabGroup.animate(animation2);	
	});  
	partnersTab.open(grid,{animate:true});	

		
});

Ti.App.addEventListener('officeSelected', function(e) 
{

 	var arr2 = JSON.parse(Titanium.App.Properties.getString("offices"));
	for (var i=0;i<arr2.length;i++) {
		Ti.API.info(arr2[i]);
		if(arr2[i].id == e.index) {
			rowData = arr2[i];
			break;
		}
	}
 	//var rowData = arr2[e.index-1];

	if(rowData.textLoaded == false) {
		db = Titanium.Database.install('content.db','quotes');
		rows = db.execute('SELECT * FROM related WHERE contentid="'+rowData.id+'" AND tablename="offices"');
		while (rows.isValidRow())
		{
			rowData[rows.field(2)] = rows.field(3);
			rows.next();
		}
		rows.close();
		
		var images = [];
		rows = db.execute('SELECT * FROM images WHERE contentid="'+rowData.id+'" AND type="offices"');
		while (rows.isValidRow())
		{
			images.push({source:rows.field(3),info:rows.field(4),bgcolor:'#fff'});
			rows.next();
		}
		rows.close();
		db.close();
		rowData.textLoaded = true;
		rowData.images = images;
		rowData.imagesLoaded = true;
	}
	var officeView = Titanium.UI.createWindow({
		url: 'officeview.js',
		backgroundColor:'#000',
		navBarHidden:false,
		barColor:'#111',
		title:rowData.title
	}); 

	officeView.hideTabBar();	 
	officeView.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];
	
	tabGroup.setActiveTab(1);	
	officeView.data = rowData;  
	officeTab.open(officeView,{animate:true});	
		
});