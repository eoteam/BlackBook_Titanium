
/* Data */
var data = [];
var db; var rows; 

//win.addEventListener('focus', function(){

	db = Titanium.Database.install('content.db','quotes');
	rows = db.execute('SELECT * FROM offices');
	while (rows.isValidRow())
	{
		data.push({top: 10,rowHeight: 45,
 				color: '#fff', 
 				rightImage:'images/icons/chevron2.png',	
 				title:rows.field(1),
 				textLoaded: false,
 				imageLoaded:false,
 				id: rows.field(0)});
		
		//Ti.API.info(data[data.length-1].description);
		
		rows.next();
	}
	rows.close();
	db.close();
	Titanium.App.Properties.setString("offices",JSON.stringify(data));
	
	var tableview = Titanium.UI.createTableView({
		data:data,
		textColor: '#fff',
		separatorColor: '#222',
		backgroundColor: 'transparent'
	});

	tableview.addEventListener('click', function(e) {
		
/*
		var images = [];
		db = Titanium.Database.install('content.db','quotes');
		rows = db.execute('SELECT * FROM images WHERE partnerid="'+e.rowData.id+'"');
		while (rows.isValidRow())
		{
			var bg = '#fff';
			//if(rows.field(4) != null)
			//	bg = rows.field(4);
			images.push({source:rows.field(2),info:rows.field(4),bgcolor:bg});
			rows.next();
		}
		rows.close();
		db.close();
*/
	
	if(e.rowData.textLoaded == false) {
		db = Titanium.Database.install('content.db','quotes');
		rows = db.execute('SELECT * FROM related WHERE contentid="'+e.rowData.id+'" AND tablename="offices"');
		while (rows.isValidRow())
		{
			e.rowData[rows.field(2)] = rows.field(3);
			rows.next();
		}
		rows.close();
		
		var images = [];
		rows = db.execute('SELECT * FROM images WHERE contentid="'+e.rowData.id+'" AND type="offices"');
		while (rows.isValidRow())
		{
			images.push({source:rows.field(3),info:rows.field(4),bgcolor:'#fff'});
			rows.next();
		}
		rows.close();
		db.close();
		e.rowData.textLoaded = true;
		e.rowData.images = images;
		e.rowData.imagesLoaded = true;
	}
	var officeView = Titanium.UI.createWindow({
		url: 'officeview.js',
		backgroundColor:'#000',
		navBarHidden:false,
		barColor:'#111',
		title:e.rowData.title
	}); 

	officeView.hideTabBar();	 
	officeView.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];
		
	officeView.data = e.rowData;  
	Titanium.UI.currentTab.open(officeView,{animate:true});	
		
	});  

	Titanium.UI.currentWindow.add(tableview);

//});