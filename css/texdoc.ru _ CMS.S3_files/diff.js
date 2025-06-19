var RESULT = {
	Same: 0,
	Deleted: 1,
	Added: 2,
	Changed: 3
};

var MAX_ROWS_ALLOWED = 5000;
function $id(id){ return document.getElementById(id); }
function parse_changes(origin, change){

	var leftText = origin;
	var rightText = change;

	if(leftText == "" || rightText == ""){
		alert("Please enter both texts to compare");
		return;
	};

	var dp = new DiffParser(leftText, rightText);
	
	if(dp.get_left().length > MAX_ROWS_ALLOWED || dp.get_right().length > MAX_ROWS_ALLOWED){
		if(confirm( "For performance reasons only text no longer than "+MAX_ROWS_ALLOWED+" lines is allowed. "+
								"Do you want to analyse only the first "+MAX_ROWS_ALLOWED+" lines?")){
				dp.trim(MAX_ROWS_ALLOWED);
				dp.parse_changes();
		};
		return;
	};
	
	dp.parse();

	generateColoredLines(dp);

	return dp._results;
}
function generateColoredLines(dp){
  var sb = [];
  var resArr = dp.get_results();
  var x = 0;

  for(var i = 0; i < resArr.length; i++){
    var line = (resArr[i] == RESULT.Same) ? "<div class=\"same\">" + nextDivHtml(dp.get_left(), x++) + "</div>": 
                    (resArr[i] == RESULT.Deleted) ? "<div class=\"delete\">" + nextDivHtml(dp.get_left(), x++) + "</div>" : 
                        (resArr[i] == RESULT.Added) ? "<div class=\"add\">&nbsp;</div>" 
                          : "<div class=\"change\">" + nextDivHtml(dp.get_left(), x++) + "</div>";
    sb.push(line);
  };

  $id("LeftPreview").innerHTML = sb.join('');
  sb = [];
  x = 0;
  for(var j = 0; j < resArr.length; j++){
    var line = (resArr[j] == RESULT.Same) ? "<div class=\"same\">" + nextDivHtml(dp.get_right(), x++) + "</div>": 
                    (resArr[j] == RESULT.Deleted) ? "<div class=\"delete\">&nbsp;</div>": 
                        (resArr[j] == RESULT.Added) ? "<div class=\"add\">" + nextDivHtml(dp.get_right(), x++) + "</div>" 
                          : "<div class=\"change\">" + nextDivHtml(dp.get_right(), x++) + "</div>";
    sb.push(line);
  };
  $id("RightPreview").innerHTML = sb.join('');

  $('#LeftPreview div').each(function(){
  	if ($(this).next('div').length == 1) {
  		nn_div = $(this).next('div');

  		if (nn_div.next('div').length == 1) {
		  	html_txt  = templateController.escapeHTML($(this).text())+"\n";
  		} else {
  			html_txt  = templateController.escapeHTML($(this).text());
  		};
	  	$(this).after(html_txt);
  	};
  	$(this).remove();
  });

  $('#RightPreview div').each(function(){
  	if ($(this).next('div').length == 1) {
  		nn_div = $(this).next('div');

  		if (nn_div.next('div').length == 1) {
	  		html_txt  = templateController.escapeHTML($(this).text())+"\n";
	  	} else {
	  		html_txt  = templateController.escapeHTML($(this).text());
	  	};
	  	$(this).after(html_txt);
	}
  	$(this).remove();
  });
}
function nextDivHtml(arr, x){
  if(x >= arr.length) return "";
  return arr[x].split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;');
};
function view2DArr(arr){
  var sb = [];
  for(var c = 0; c < arr.length; c++){
    sb .push(arr[c]);
  };
  return sb.join('\n');
};
function DiffParser(left, right){
	left += "\n";
	right += "\n";
	this._setLeftAndRightArr(left.split('\n'), right.split('\n'));
};
DiffParser.prototype = {
	get_left: function(){ return this._left; },
	get_right: function(){ return this._right; },
	get_results: function(){ return this._results; },
	parse: function(){
	
	
		for(var i = 0; i < this._cols; i++){
			this._left[i] = this._left[i].replace('\r','');
		};
		for(var j = 0; j < this._rows; j++){
			this._right[j] = this._right[j].replace('\r','');
		};
	
		this._setMatrix();
		this._setResults();
	},
	trim: function(max){
		max = (!!max) ? max : 100;
		if(this._left.length > 500) this._left = this._left.slice(0, max - 1);
		if(this._right.length > 500) this._right = this._right.slice(0, max - 1);
		this._setLeftAndRightArr(this._left, this._right);
	},
	_setLeftAndRightArr: function(left, right){
		this._left = left;
		this._right = right;
		this._rows = this._right.length;
		this._cols = this._left.length;
		this._results = [];
		this._matrix = this._buildArray(this._rows + 1, this._cols + 1);
	},
	_setMatrix: function(){
		for(var c = (this._cols - 1); c >= 0; c--){
			for(var r = (this._rows - 1); r >= 0; r--){
				var value = Math.max(this._matrix[r + 1][c], this._matrix[r][c + 1]);
				if(value < 0) value = 0;
				if(this._left[c] == this._right[r]) value++;
				this._matrix[r][c] = value;
			};
		};
//alert(view2DArr(this._matrix));
	},
	_setResults: function(){
		var c = 0;
		var r = 0;
//debugger;
		var lastCol = this._cols - 1;
		var lastRow = this._rows - 1;
		
		var addCnt = 0;
		var delCnt = 0;
		while(c < this._cols || r < this._rows){
			if(this._left[c] == this._right[r]){
				if(delCnt > 0 && addCnt > 0){
					this._results = this._makeAddedAndDeletedChanged(this._results, Math.min(addCnt, delCnt));
					delCnt = 0;
					addCnt = 0;
				};
				this._results.push(RESULT.Same);
				addCnt = 0;
				delCnt = 0;
				if(c >= lastCol) {
					if(r >= lastRow) {
						break;
					} else {
						r++;
					};
				} else if(r >= lastRow) {
					c++;
				} else {
					c++;
					r++;
				};
				
			} else {
				if(c >= this._cols || r >= this._rows) break;
				var resLen = this._results.length;
				var lastResult = this._results[resLen - 1];
				var bottom = this._matrix[r + 1][c];
				var right = this._matrix[r][c + 1];
				
				if(bottom == right && this._results.length > 0){
					if(lastResult == RESULT.Added) right--;
					else if(lastResult == RESULT.Deleted) bottom--;
				};
				if(bottom < right){ // move to the right
					this._results.push(RESULT.Deleted);
					delCnt++;
					if(delCnt == addCnt){
						this._results = this._makeAddedAndDeletedChanged(this._results, addCnt);
						delCnt = 0;
						addCnt = 0;
					};
					c++;
				}else /*if(bottom > right)*/{ // move to the bottom
					this._results.push(RESULT.Added);
					addCnt++;
					r++;
				};
			};
		};
		
		for(var i = this._results.length; i < Math.max(this._cols, this._rows); i++) {
			this._results[i] = RESULT.Added;
		};
	},
	_makeAddedAndDeletedChanged: function(rawResults, num){
		var results = rawResults.slice(0, rawResults.length - num);
		for(var i = results.length - 1; i >= 0 && num > 0; i--, num--){
			results[i] = RESULT.Changed;
		};
		return results;
	},
	_buildArray: function(rows, cols){
		var arr = new Array(rows);
		for(var i = 0; i < rows; i++){
			arr[i] = new Array(cols);
			arr[i][cols - 1] = -1; // init last column
		};
		for(var j = 0; j < cols; j++){
			arr[rows - 1][j] = -1; // init last row
		};
		return arr;
	}
};