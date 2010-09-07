/* Data */

var data = [];
var partnersList = [];

var db;
var rows;
var runningid = 0;
var currentsection;
db = Titanium.Database.install('content.db','quotes');
rows = db.execute('SELECT partners.*, offices.name as office FROM partners LEFT JOIN offices ON offices.id = partners.officeid  ORDER BY officeid');


while (rows.isValidRow())
{
	/*

	if(runningid != rows.field(0)) {
		runningid = rows.field(0);

		var header = Ti.UI.createView({
			height:'auto',
			backgroundColor: '#000',
		});

		var headerLabel = Ti.UI.createLabel({
		font:{fontFamily:'Helvetica Neue',fontSize:18,fontWeight:'bold'},
		text:rows.field(5),
		color:'#333',
		textAlign:'left',
		top:0,
		left:10,
		height:30
		});
		header.add(headerLabel);

		currentsection = Ti.UI.createTableViewSection({height:'auto',width:'auto'});
		currentsection.headerView = header;
		data.push(currentsection);
*/

		var item = {top: 10,bottom:10,color: '#fff', 
			leftImage: 'images/partners/'+rows.field(4),
 			rightImage:'images/icons/chevron2.png',	
 			textLoaded: false,
 			imagesLoaded: false,
 			images: [],		
 			height:'auto',
			width:'auto',
			office: rows.field(5),
			officeid: rows.field(0),
 			title:rows.field(3),
 			id: rows.field(2),
 			dir:rows.field(1)};
 		partnersList.push(item);
 			
	/*
	currentsection.add(Ti.UI.createTableViewRow(item));
 	}
 	else {
 	

		var item = {top: 10,bottom:10,color: '#fff', 
			leftImage: 'images/partners/'+rows.field(4),
 			rightImage:'images/icons/chevron2.png',	
 			textLoaded: false,
 			imagesLoaded: false,
 			height:'auto',
			width:'auto',			
 			title:rows.field(3),
 			id: rows.field(2),
 			dir:rows.field(1)};
 		partnersList.push(item);
 			 	
		currentsection.add(Ti.UI.createTableViewRow(item));
 	}
*/
 
 	//Ti.API.info(rows.field);

	rows.next();
}
Titanium.App.Properties.setString("partners",JSON.stringify(partnersList));

rows.close();
db.close();


var footer = Ti.UI.createView({
	backgroundColor:'#1e1e1d',
	height:8
});
		
var tableview = Titanium.UI.createTableView({
	data:partnersList,
	textColor: '#fff',
	separatorColor: '#222',
	backgroundColor: 'transparent'
});


tableview.addEventListener('click', function(e) {

	var images;
	var related;
	if(e.rowData.imagesLoaded == false) {
		images = [];
		db = Titanium.Database.install('content.db','quotes');
		rows = db.execute('SELECT * FROM images WHERE contentid="'+e.rowData.id+'" AND type="partners"');
	
		while (rows.isValidRow())
		{
			var bg = '#fff';
			//if(rows.field(4) != null)
			//	bg = rows.field(4);
			images.push({source:rows.field(3),info:rows.field(4),bgcolor:bg});
			rows.next();
		}
		rows.close();
		db.close();
		e.rowData.images = images;
		e.rowData.imagesLoaded = true;
	}
	else {
		images = e.rowData.images;
	}
	
	
	if(e.rowData.textLoaded == false) {
		related = [];
		db = Titanium.Database.install('content.db','quotes');
		rows = db.execute('SELECT * FROM related WHERE contentid="'+e.rowData.id+'" AND tablename="partners"');
	
		while (rows.isValidRow())
		{
			e.rowData[rows.field(2)] = rows.field(3);
			rows.next();
		}
		rows.close();
		db.close();
		e.rowData.textLoaded = true;
	}	
	var grid = Titanium.UI.createWindow({
		url: 'gridview.js',
		backgroundColor:'#000',
		navBarHidden:false,
		barColor:'#111',
		title:e.rowData.title
	}); 
	grid.hideTabBar();	 
	grid.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];
	grid.data = e.rowData;	  
	Titanium.UI.currentTab.open(grid,{animate:true});	
	} 
);  
Titanium.UI.currentWindow.add(tableview);
