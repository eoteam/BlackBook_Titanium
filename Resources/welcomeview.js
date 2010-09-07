var win = Titanium.UI.currentWindow;
var pic = Titanium.UI.createImageView({image: 'images/partners/Pentagram_081710_0119_a.jpg',width:'399',height:'376'
});
win.add(pic);

infoPanel = Titanium.UI.createView({
	bottom: 0,
	width: '100%',
	height: '15%',
});
win.add(infoPanel);

bg = Titanium.UI.createView({
	opacity: 0.5,
	width: '100%',
	height: '100%',
	backgroundColor: '#000'
});
infoPanel.add(bg);

var label = Titanium.UI.createLabel({top:'390',color:'#fff',text:'Eddie Opara',font:{fontSize:20}});
infoPanel.add(label);