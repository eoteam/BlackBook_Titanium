// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK);

var tabGroup = Titanium.UI.createTabGroup(
{
	barColor:'#000',
	backgroundColor: '#000'
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


var eddieIntro = "Eddie Opara, has joined Pentagram as a partner. He becomes the seventh principal in Pentagram's New York office, where his team will be based. He joins Pentagram from his own studio, The Map Office, which he established in 2005.";

var label = Titanium.UI.createLabel({
	color:'#fff',
	left:8,right:8,top:0,height: '100%',
	font:{fontFamily:'Helvetica Neue', fontSize:14,fontWeight:'normal'},
    editable: false,
	text:eddieIntro
});

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
