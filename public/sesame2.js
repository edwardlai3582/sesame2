//variables
var seachInput = document.getElementById('seachInput');
var submitBtn = document.getElementById('submitBtn');
var iframe1 = document.getElementById('iframe1');
var lastElement = document.getElementById('lastElement');
var errorMessage = document.getElementById('errorMessage');

//add seachInput keyup event 
seachInput.addEventListener("keyup", function(){
    //check value
    errorMessage.innerHTML = checkURL(this.value);
});

//add submitBtn click event
submitBtn.addEventListener("click", function(){
    var url = seachInput.value;
    
    //check value
    var checkResult = checkURL(url);
    errorMessage.innerHTML = checkResult;
    if(checkResult !== "") {
        return;
    }
    
    //set iframe src
    iframe1.src=url;
    
    //clear input
    seachInput.value="";
    
    //sent url to backend
    var oReq = new XMLHttpRequest();
    //response handler
    oReq.addEventListener("load", function() {
        if(this.responseText === "error") {
            lastElement.textContent = "Can't get the html page of " + url;
            return;
        }
        
        lastElement.textContent = getLastElement(this.responseText);
    });
    
    oReq.open("GET", "/search?url="+url);
    oReq.send();
    
});

//return last element from body
function getLastElement(response){
    console.log(response);
    var result =  response;
    var pattern = new RegExp(/<body[^>]*>((.|[\n\r])*)<\/body>/im);
    var array_matches = pattern.exec(result);
    var el ;
    var lec;
    
    //check DOMParser exists
    if (typeof DOMParser === 'function') { 
        el = ((new DOMParser())).parseFromString(array_matches[1], "text/html");
        lec = el.body.lastElementChild;
    }
    else {
        el = document.createElement('div');
        el.innerHTML = array_matches[1];
        lec = el.lastElementChild;
    }   
    
    if(lec){
        return lec.outerHTML;    
    }
    else{
        return "Can't get the last element";    
    }
}

//check url address
function checkURL(url) {
    var re = new RegExp("^(http|https)://", "i");
    
    if(url==="") {   
        return "Can't be an empty string";
    }
    else if(!re.test(url)) {
        return "Need to start with http:// or https://";   
    }
    else {
        return "";
    }
}


