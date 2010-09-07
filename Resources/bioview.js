
var win = Titanium.UI.currentWindow; 

win.backButtonTitle = "Back";
/*
var b = Titanium.UI.createButton({
	title:'Close',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

win.setLeftNavButton(b);
b.addEventListener('click',function()
{
	win.close();
});
*/
	
var bioField = Titanium.UI.createTextArea({
	value: win.content,
	font:{fontSize:14,fontFamily:"Helvetica"},
    color:'#fff',
    height:'100%',
    width:'100%',
    shadowColor:'#aaa',
    editable: false,
    backgroundColor: '#000',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(bioField);