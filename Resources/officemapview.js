var win = Titanium.UI.currentWindow;

var b = Titanium.UI.createButton({
	title:'Close',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

win.setLeftNavButton(b);
b.addEventListener('click',function()
{
	win.close();
});

var coord = win.data.coords.split(',');


var officePin = Titanium.Map.createAnnotation({
	latitude:coord[0],
	longitude:coord[1],
	title:'Pentagram',
	subtitle:win.data.title,
	pincolor:Titanium.Map.ANNOTATION_RED,
	animate:true
});

var officeRegion = {latitude:coord[0],longitude:coord[1],animate:true,latitudeDelta:0.04, longitudeDelta:0.04};

var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:coord[0], longitude:coord[1], latitudeDelta:0.5, longitudeDelta:0.5},
	animate:true,
	userLocation:true,
	annotations:[officePin]
});

win.add(mapview); setTimeout(function() { mapview.zoom(1);mapview.zoom(1);mapview.zoom(1); mapview.zoom(1); mapview.zoom(1)},1000);

win.add(mapview);


setTimeout(function(){

//mapview.addAnnotation(officePin);
mapview.selectAnnotation(officePin,true);

},1000);