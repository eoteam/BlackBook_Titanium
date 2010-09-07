var tabGroup = Titanium.UI.createTabGroup(
{
	barColor:'#111',
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
