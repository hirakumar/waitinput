/*


 __      __        .__  __  .___                      __   
/  \    /  \_____  |__|/  |_|   | ____ ______  __ ___/  |_ 
\   \/\/   /\__  \ |  \   __\   |/    \\____ \|  |  \   __\
 \        /  / __ \|  ||  | |   |   |  \  |_> >  |  /|  |  
  \__/\  /  (____  /__||__| |___|___|  /   __/|____/ |__|  
       \/        \/                  \/|__|                

	Ver : 1.0.3
	Date : 7th Oct 2018
	Author : Hira Kumar Maharjan
	Description : When user input data into content editable element and after in specific
				  time duration it will call ajax
*/
class WaitInput {
    constructor(ele,obj) {
        this.ele = document.querySelectorAll(ele);
        this.saveData = [];
        this.interval = [];
        this.intervalStatus = [];
        this.intervalTime = 1000;
        this.intEle = [];
        this.obj=obj;
		
		
		try{
			this.obj=obj;
			if(this.obj.duration!=undefined){
				this.intervalTime = this.obj.duration;
				console.log("Set Interval"+this.intervalTime);
			}
			
			this.init();
		}catch(err){
			console.log("Ajax is requried on second parameter");
			console.log(err);
		}


    }
	ajaxStuff(e){
		var xmlhttp = new XMLHttpRequest();
						
						xmlhttp.onreadystatechange = function() {
							
							if (this.readyState == 4 && this.status == 200) {
								console.log("Result: "+this.responseText);
								alert(this.responseText);
								e.target.classList.remove('error');
								e.target.classList.add('success');
								e.target.classList.remove('busy');
							}else if(this.status == 404){
								console.log("Requested URL is invalid");
								e.target.classList.add('error');
								e.target.classList.remove('success');
								e.target.classList.remove('busy');
							}
						};											
						
						// Object into Array
						var myobj = Object.entries(this.obj.data);
						var patt = /this/i;
						var mydata=[];
						
						//Check this and set value
						for(var ob of myobj){
							console.log(ob[1]);
							
							if(patt.test(ob[1])){
								console.log("Found in :"+ob);
								ob[1]=eval(ob[1].replace('this','e.target'));
								mydata.push(ob);
							}else{
								mydata.push(ob);
							}
							
						}
						
						xmlhttp.open("POST", this.obj.url + mydata, true);
						xmlhttp.setRequestHeader('Content-type', this.obj.header);
						xmlhttp.addEventListener("loadstart",this.ajaxLoadStart.bind(this));
						xmlhttp.addEventListener("progress",this.ajaxProgress.bind(this));
						xmlhttp.addEventListener("abort",this.ajaxAbort.bind(this));
						xmlhttp.addEventListener("error",this.ajaxError.bind(this));
						xmlhttp.addEventListener("load",this.ajaxLoad.bind(this));
						xmlhttp.addEventListener("timeout",this.ajaxTimeOut.bind(this));
						xmlhttp.addEventListener("loadend",this.ajaxTimeLoadEnd.bind(this));
						xmlhttp.send(); 
		
	}
	ajaxAbort(e){
		console.log(e);
	}
		ajaxError(e){
		console.log(e);
	}
	ajaxLoad(e){
		console.log(e);
	}
	ajaxTimeOut(e){
		console.log(e);
	}
	ajaxTimeLoadEnd(e){
		console.log(e);
	}
	ajaxLoadStart(e){
		console.log(e);
	}
	ajaxProgress(e){
		console.log(e);
	}
    init() {

        var i = 0;
        while (i < this.ele.length) {

            // Event Trigger

            this.ele[i].addEventListener('input', trigger.bind(this));
			
            i++;
        }
		
        function trigger(e) {
			e.target.classList.add('busy');
			e.target.classList.remove('error');
			e.target.classList.remove('success');
			
			
			if(e.target.textContent==""){
				e.target.classList.add('error');
				e.target.classList.remove('busy');
				e.target.classList.remove('success');
			}
            this.intEle[i] = function() {


                if (this.saveData[i] == undefined) {
					console.log("Defined");
                    this.saveData[i] = e.target.textContent;
                } else if (this.saveData[i] != e.target.textContent) {
					console.log("Un Match and continue ");
                    this.saveData[i] = e.target.textContent;
                } else if (this.saveData[i] = e.target.textContent) {
					console.log("Matched and ready to do ajax");
                    clearInterval(this.interval[i]);
                    this.intervalStatus[i] = false;
					this.ajaxStuff(e);
				
                }

            }

            if (this.intervalStatus[i] == undefined || this.intervalStatus[i] == false || this.intervalStatus[i] == "") {

                this.interval[i] = setInterval(this.intEle[i].bind(this), this.intervalTime);
                this.intervalStatus[i] = true;
            }
        }

    }




}