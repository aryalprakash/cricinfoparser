function guruStart()
	{
	if (document.analysis)
		{
		if (typeof(analysisfocus) != 'undefined')
			{
			if (analysisfocus) // for putting the cursor in the analysis search form
				{
				document.analysis.search.focus();
				}
			}
		}

	guruViewChange();
	}

function guruViewChange()
	{
	if (document.gurumenu)
		{
		var divs = document.getElementsByTagName('div');

		typeval = document.gurumenu.type.value;
		if (typeof(typeval) == 'undefined')
			{
			for (i=0;i<document.gurumenu.type.length;i++)
				{
				if (document.gurumenu.type[i].checked)
					{
					typeval = document.gurumenu.type[i].value;
					}
				}
			}

		showBoxDiv('viewdiv_', 'viewdiv_'+typeval);
		disableDivInputs('viewdiv_', 'viewdiv_'+typeval);

		var viewval;
		// first find the value of view
		for (i=0;i<document.gurumenu.view.length;i++)
			{
			if (document.gurumenu.view[i].checked && !document.gurumenu.view.disabled)
				{
				viewval = document.gurumenu.view[i].value;
				}
			}
		// if not found (or disabled) then set it to default
		if (typeof(viewval) == 'undefined')
			{
			for (i=0;i<document.gurumenu.view.length;i++)
				{
				if (document.gurumenu.view[i].value == '')
					{
					document.gurumenu.view[i].checked = true;
					viewval = '';
					}
				}
			}
		// set it to 'default' if empty for the having/orderby divs
		if (viewval == '' || viewval == 'extras')
			{
			if (document.gurumenu.groupby)
				{
				document.gurumenu.groupby.disabled = false;
				}
			}
		else
			{
			if (document.gurumenu.groupby)
				{
				document.gurumenu.groupby.selectedIndex = 0;
				document.gurumenu.groupby.disabled = true;
				}
			}

		if (viewval == '')
			{
			viewval = 'default';
			}

		//alert('orderbydiv_'+typeval+'_'+viewval);

		showBoxDiv('havingdiv_', 'havingdiv_'+typeval+'_'+viewval);
		disableSelect('havingselect_', 'havingselect_'+typeval+'_'+viewval);

		showBoxDiv('orderbydiv_', 'orderbydiv_'+typeval+'_'+viewval);
		disableSelect('orderbyselect_', 'orderbyselect_'+typeval+'_'+viewval);
		}
	}

function page_validate(thisform, limit)
	{
	with (thisform)
		{
		with (page)
			{
			if (value == null || !value.match(/^\d+$/))
				{
				alert('illegal "Go to page" value');
				focus();
				return false;
				}
			else if (value < 1 || value > limit)
				{
				alert('"Go to page" value must be between 1 and ' + limit);
				focus();
				return false;
				}
			else 
				{
				return true;
				}
			}
		}
	}

/*************************************************************************

  dw_viewport.js
  version date Nov 2003
  
  This code is from Dynamic Web Coding 
  at http://www.dyn-web.com/
  Copyright 2003 by Sharon Paine 
  See Terms of Use at http://www.dyn-web.com/bus/terms.html
  Permission granted to use this code 
  as long as this entire notice is included.

*************************************************************************/  
  
viewport = {
  getWinWidth: function () {
    this.width = 0;
    if (window.innerWidth) this.width = window.innerWidth - 18;
    else if (document.documentElement && document.documentElement.clientWidth) 
  		this.width = document.documentElement.clientWidth;
    else if (document.body && document.body.clientWidth) 
  		this.width = document.body.clientWidth;
  },
  
  getWinHeight: function () {
    this.height = 0;
    if (window.innerHeight) this.height = window.innerHeight - 18;
  	else if (document.documentElement && document.documentElement.clientHeight) 
  		this.height = document.documentElement.clientHeight;
  	else if (document.body && document.body.clientHeight) 
  		this.height = document.body.clientHeight;
  },
  
  getScrollX: function () {
    this.scrollX = 0;
  	if (typeof window.pageXOffset == "number") this.scrollX = window.pageXOffset;
  	else if (document.documentElement && document.documentElement.scrollLeft)
  		this.scrollX = document.documentElement.scrollLeft;
  	else if (document.body && document.body.scrollLeft) 
  		this.scrollX = document.body.scrollLeft; 
  	else if (window.scrollX) this.scrollX = window.scrollX;
  },
  
  getScrollY: function () {
    this.scrollY = 0;    
    if (typeof window.pageYOffset == "number") this.scrollY = window.pageYOffset;
    else if (document.documentElement && document.documentElement.scrollTop)
  		this.scrollY = document.documentElement.scrollTop;
  	else if (document.body && document.body.scrollTop) 
  		this.scrollY = document.body.scrollTop; 
  	else if (window.scrollY) this.scrollY = window.scrollY;
  },
  
  getAll: function () {
    this.getWinWidth(); this.getWinHeight();
    this.getScrollX();  this.getScrollY();
  }
  
}

/*************************************************************************
  This code is from Dynamic Web Coding at http://www.dyn-web.com/
  Copyright 2003 by Sharon Paine 
  See Terms of Use at http://www.dyn-web.com/bus/terms.html
  regarding conditions under which you may use this code.
  This notice must be retained in the code as is!
*************************************************************************/

var menuLayers = {
  timer: null,
  activeMenuID: null,
  offX: 4,   // horizontal offset 
  offY: 0,   // vertical offset 
  show: function(id, e) {
    var mnu = document.getElementById? document.getElementById(id): null;
    if (!mnu) return;
    this.activeMenuID = id;
    if ( mnu.onmouseout == null ) mnu.onmouseout = this.mouseoutCheck;
    if ( mnu.onmouseover == null ) mnu.onmouseover = this.clearTimer;
    viewport.getAll();
    this.position(mnu,e);
  },
  
  hide: function() {
    this.clearTimer();
    if (this.activeMenuID && document.getElementById) 
      this.timer = setTimeout("document.getElementById('"+menuLayers.activeMenuID+"').style.visibility = 'hidden'", 200);
  },
  
  position: function(mnu, e) {
    var x = e.pageX? e.pageX: e.clientX + viewport.scrollX;
    var y = e.pageY? e.pageY: e.clientY + viewport.scrollY;
    
    if ( x + mnu.offsetWidth + this.offX > viewport.width + viewport.scrollX )
      x = x - mnu.offsetWidth - this.offX;
    else x = x + this.offX;
  
    if ( y + mnu.offsetHeight + this.offY > viewport.height + viewport.scrollY )
      y = ( y - mnu.offsetHeight - this.offY > viewport.scrollY )? y - mnu.offsetHeight - this.offY : viewport.height + viewport.scrollY - mnu.offsetHeight;
    else y = y + this.offY;
   
	var ciH = $("#ciMainContainer").offset();
	x = x - ciH.left;
	y = y - ciH.top;
 
    mnu.style.left = x + "px"; mnu.style.top = y + "px";
    this.timer = setTimeout("document.getElementById('" + menuLayers.activeMenuID + "').style.visibility = 'visible'", 200);
  },
  
  mouseoutCheck: function(e) {
    e = e? e: window.event;
    // is element moused into contained by menu? or is it menu (ul or li or a to menu div)?
    var mnu = document.getElementById(menuLayers.activeMenuID);
    var toEl = e.relatedTarget? e.relatedTarget: e.toElement;
    if ( mnu != toEl && !menuLayers.contained(toEl, mnu) ) menuLayers.hide();
  },
  
  // returns true of oNode is contained by oCont (container)
  contained: function(oNode, oCont) {
    if (!oNode) return; // in case alt-tab away while hovering (prevent error)
    while ( oNode = oNode.parentNode ) 
      if ( oNode == oCont ) return true;
    return false;
  },

  clearTimer: function() {
    if (menuLayers.timer) clearTimeout(menuLayers.timer);
  }
  
}

