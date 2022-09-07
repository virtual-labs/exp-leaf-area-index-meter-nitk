let screensVal = 0;
let tries = 0;
let tamplet=0;
let layersCount = 0;
let top1 = 270, top2 = 240, top3 = 190, knifeTop = 228, knifeTop1 = 208;
let paperHeight = 15;
let checkClick = 0;
let rotateCount = 0;
let myInt = 0;

//slider variables
// Used to add a numeric id on slide creation to let us target the element later
var slideIndex = 0;
// Tells us which slide we are on
var currentSlideIndex = 0;
// An Array to hold all the slides
var slideArray = [];
var selectVariable = null;
var setVariable = 0;
var setIndex = null;
var sampleArray = ["Sample1","Sample2","Sample3","Sample4","Sample5","sample6"];
var slideFlag = 0, identified = 0;


// Prompt questions during simulation
let questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		if(simsubscreennum == 8){
			if(soilType == "Fine grained soil")
				questions.ans1 = 3;
			else if(soilType == "Sandy soil")
				questions.ans1 = 2;
		}
		else
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		let myDiv  = document.getElementById("question-div");
		let myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		if(simsubscreennum == 8)
			document.getElementById("divq").innerHTML = qun+""+soilType;
		else
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		let selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");

		let button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");

		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (let i = 0; i < questions.options.length; i++) {
			let opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.text = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		let x = document.getElementById("mySelect");
		let i = x.selectedIndex;
		if(i == 0)
		{
			let dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			let dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			let dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}


// $(function()
// {
	// $('input').on('input', function() {
		// questions.value = questions.value.match(/\d*(\.\d*)?/)[0];
	// });
// });


function rotateScrew(){
	rotateCount++;
	if (document.getElementById('can2-5').style.visibility=="visible" && document.getElementById('can2-5a').style.visibility=="hidden" && rotateCount <= 7){
		if(rotateCount==6 ){
			myStopFunction();
			document.getElementById('can2-5').style.visibility="hidden";
			document.getElementById('can2-5a').style.visibility="hidden";
		} else {
			document.getElementById('can2-5a').style.visibility="visible";
			document.getElementById('can2-5').style.visibility="hidden";
		}
	}
	else if (document.getElementById('can2-5').style.visibility=="hidden" && document.getElementById('can2-5a').style.visibility=="visible" && rotateCount < 7){
		if(rotateCount==6 ){
			myStopFunction();
			document.getElementById('can2-5').style.visibility="hidden";
			document.getElementById('can2-5a').style.visibility="hidden";
		} else {
			document.getElementById('can2-5').style.visibility="visible";
			document.getElementById('can2-5a').style.visibility="hidden";
		}
	}
}
let loadCount = 0;
function connectPhone(){
	loadCount++;
	if(loadCount<30){
			setTimeout(function(){
				document.getElementById('can3-71').style.visibility="visible";
			},100);
			setTimeout(function(){
				document.getElementById('can3-72').style.visibility="visible";
			},200);
			setTimeout(function(){
				document.getElementById('can3-73').style.visibility="visible";
			},300);
			setTimeout(function(){
				document.getElementById('can3-71').style.visibility="hidden";
				document.getElementById('can3-72').style.visibility="hidden";
				document.getElementById('can3-73').style.visibility="hidden";
			},500);

	} else {
		myStopFunction();
		setTimeout(function(){
			document.getElementById('can3-70').style.visibility="visible";
			document.getElementById('v3').style.visibility="visible";
			document.getElementById('v3').style.innerHTML="Connected";
			document.getElementById('nextButton').style.visibility="visible";
		},650);
	}
}


function navNext()
{
	for(temp=0;temp<=5;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
	if (document.getElementById('arrow1').style.visibility=="hidden")
		document.getElementById('arrow1').style.visibility="visible";
	else
		document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction()
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

//animate arrow at position
function animateArrowATPosition(left,top,degg)
{
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+left+"px; top: "+top+"px; height: 30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+degg+"deg)";
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate("+degg+"deg)";
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate("+degg+"deg)";
}

function magic()
{
	if(simsubscreennum==1)
	{
		myInt = setInterval(function() {animatearrow()},500)
		animateArrowATPosition(560, 430, 0);
		document.getElementById("can1-2").onclick = function(){
			document.getElementById("can1-2").onclick = "";
			myStopFunction();
			document.getElementById("can1-2").style.visibility = "hidden";
			document.getElementById("can1-2a").style.visibility = "visible";
			document.getElementById("can1-2a").style.animation = "moveMinimount 1.5s linear forwards"
			setTimeout(function(){
				document.getElementById("can1-2a").style.visibility = "hidden";
				document.getElementById("can1-2b").style.visibility = "visible";
				setTimeout(function(){
					document.getElementById("can1-2b").style.animation = "moveMinimountLeft 0.5s linear forwards"
					document.getElementById("can1-1").style.animation = "moveTripodLeft 0.5s linear forwards"
					setTimeout(function() {
						document.getElementById("can1-7").style.visibility = "visible";
						document.getElementById("can1-3").style.animation = "topViewMove 0.5s linear forwards";
						setTimeout(function() {
							document.getElementById("can1-4").style.opacity = "1";
							document.getElementById("v1").style.opacity = "1";
							document.getElementById("can1-6").style.visibility = "visible";
							myInt = setInterval(function() {animatearrow()},500)
							animateArrowATPosition(400, 250, -90);
							document.getElementById("can1-4").onclick = function(){
								myStopFunction();
								document.getElementById("can1-4").style.visibility = "hidden";
								document.getElementById("can1-5").style.visibility = "visible";
								document.getElementById("can1-5").style.transformOrigin = "10% 90%";
								document.getElementById("can1-5").style.animation = "moveLeverDown 0.3s linear forwards";
								document.getElementById("can1-6").style.animation = "moveBubbleOne 0.3s linear forwards";
								setTimeout(function() {
									document.getElementById("can1-5").style.visibility = "hidden";
									document.getElementById("can1-5a").style.visibility = "visible";
									setTimeout(function() {
										document.getElementById("can1-5a").style.visibility = "hidden";
										document.getElementById("can1-4").style = "position:absolute; cursor:pointer;left:330px; top:275px;";
										document.getElementById("nextButton").style.visibility = "visible";
									},320);
								},450)
							}
						},500)
					},600)
				},1500)
			},1600)
		}
	}
	else if(simsubscreennum==2)
	{
		document.getElementById("can1-4").style.visibility = "hidden";
		document.getElementById("can1-1").style.visibility = "hidden";
		document.getElementById("can1-2b").style.visibility = "hidden";
		document.getElementById("can1-6").style.visibility = "hidden";
		document.getElementById("can1-7").style.visibility = "hidden";
		myInt = setInterval(function() {animatearrow()},500)
		animateArrowATPosition(500, 470, 0);
		document.getElementById("can2-3").onclick = function(){
			myStopFunction();
			setTimeout(function() {
				document.getElementById("can2-3").style.visibility = "hidden";
				document.getElementById("can2-3a").style.visibility = "visible";
				document.getElementById("can2-3a").style.animation = "moveBox 1s linear forwards"
				setTimeout(function() {
					document.getElementById("can2-3a").style.visibility = "hidden";
					document.getElementById("can2-4").style.visibility = "visible";
					setTimeout(function(){
						document.getElementById("v22").style.visibility = "visible";
						document.getElementById("can2-6").style.opacity = "1";
						document.getElementById("can2-7").style.opacity = "1";
						document.getElementById("can2-8").style.opacity = "1";
						setTimeout(function() {
							document.getElementById("v21").style.opacity = "1";
							document.getElementById("can2-5").style.visibility = "visible";
							myInt = setInterval(function() {animatearrow()},500)
							animateArrowATPosition(300, 350, 180);
							document.getElementById("can2-5").onclick = function(){
								document.getElementById("can2-5").onclick = "";
								myStopFunction();
								myInt = setInterval(function() {rotateScrew()},500);
								document.getElementById("can2-7").style.animation = "moveBubbleTwo 3.7s linear forwards"
								setTimeout(function() {
									document.getElementById("nextButton").style.visibility = "visible";
								},3800);
							}
						},1050);
					},250);
				},1500)
			},150);
		}
	}
	else if(simsubscreennum == 3){
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("v22").style.visibility = "hidden";
		document.getElementById("can2-5").style.visibility = "hidden";
		document.getElementById("can2-7").style.visibility = "hidden";
		document.getElementById("can2-6").style.visibility = "hidden";
		document.getElementById("can2-7").style.visibility = "hidden";
		document.getElementById("can2-1").style.visibility = "hidden";
		document.getElementById("can2-2").style.visibility = "hidden";
		document.getElementById("can2-4").style.visibility = "hidden";
		myInt = setInterval(function() {animatearrow()},500)
		animateArrowATPosition(380, 230, -90);
		document.getElementById("can3-3").onclick = function(){
			document.getElementById("can3-3b").style.visibility  = "visible";
			myStopFunction();
			setTimeout(function() {
				document.getElementById("can3-3").style.visibility  = "hidden";
				document.getElementById("can3-3b").style.visibility  = "hidden";
				document.getElementById("can3-3a").style.visibility  = "visible";
				document.getElementById("can3-3a").style.animation = "capMove 1s linear forwards";
				setTimeout(function() {
					document.getElementById("can3-3a").style.visibility  = "hidden";
					document.getElementById("can3-2").style.animation = "moveMinimountLeft1 1s linear forwards";
					document.getElementById("can3-1").style.animation = "moveTripodLeft1 1s linear forwards";
					setTimeout(function(){
						document.getElementById("can3-5").style.visibility  = "visible";
						document.getElementById("can3-5").style.animation = "zoomMove 0.2s linear forwards";
						setTimeout(function() {
							document.getElementById("can3-4").style.visibility  = "visible";
							document.getElementById("can3-4u").style.visibility  = "visible";
							document.getElementById("can3-4d").style.visibility  = "visible";
							document.getElementById("can3-6").style.visibility  = "visible";
							document.getElementById("can3-5").style.visibility  = "visible";
							document.getElementById("v31").style.visibility  = "visible";
						},250);
						myInt = setInterval(function() {animatearrow()},500)
							animateArrowATPosition(454, 255, -90);
							document.getElementById("can3-4u").onclick = function(){
								document.getElementById("can3-4u").onclick = "";
								myStopFunction();
								myInt = setInterval(function() {connectPhone()},100);
						}
					},1200);
				},1500);
			},250);
		}
	}
	else if(simsubscreennum == 4){
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("v31").style.visibility = "hidden";
		document.getElementById("v3").style.visibility = "hidden";
		document.getElementById("can3-5").style.visibility = "hidden";
		document.getElementById("can3-4").style.visibility = "hidden";
		document.getElementById("can3-4u").style.visibility = "hidden";
		document.getElementById("can3-4d").style.visibility = "hidden";
		document.getElementById("can3-6").style.visibility = "hidden";
		document.getElementById("can3-70").style.visibility = "hidden";
		myInt = setInterval(function() {animatearrow()},500)
		animateArrowATPosition(560, 485, 90);
		document.getElementById("can4-3").onclick = function(){
			document.getElementById("can4-3").onclick = "";
			myStopFunction();
			setTimeout(function(){
				document.getElementById("can4-3").style.visibility = "hidden";
				document.getElementById("can4-3a").style.visibility = "visible";
				document.getElementById("can4-4").style.visibility = "visible";
				document.getElementById("can4-5").style.visibility = "visible";
				setTimeout(function(){
					document.getElementById("nextButton").style.visibility = "visible";
				},250);
			}, 600);
		}
	}
	else if(simsubscreennum == 5){
		document.getElementById("can4-3a").style.visibility = "hidden";
		document.getElementById("can4-4").style.visibility = "hidden";
		document.getElementById("can4-5").style.visibility = "hidden";
		document.getElementById("can4-1").style.visibility = "hidden";
		document.getElementById("can4-2").style.visibility = "hidden";
		document.getElementById("can4-3a").style.visibility = "hidden";
		document.getElementById("can4-3a").style.visibility = "hidden";
		document.getElementById("v4").style.visibility = "hidden";
		document.getElementById("nextButton").style.visibility = "hidden";
		// Create our slider
		buildSlider();
		setVariable = slideArray[0];
		displayTable();
	}

}


// Code definition for slider functionality
// Template for creating a custom Slide object
function Slide(title, background, latitude, longitude,gapFraction, openness, laiLin1, laiLin2, laiLog1, laiLog2, name) {
	this.title = title;
	// this.subtitle = subtitle;
	this.background = background;
	// this.link = link;
	// we need an id to target later using getElementById
	this.latitude = latitude;
	this.longitude = longitude;
	this.gapFraction = gapFraction;
	this.openness = openness;
	this.laiLin1 = laiLin1;
	this.laiLin2 = laiLin2;
	this.laiLog1 = laiLog1;
	this.laiLog2 = laiLog2;
	this.name = name



	this.id = "sample" + slideIndex;
	// Add one to the index for the next slide number

	slideIndex++;
	// Add this Slide to our array
	slideArray.push(this);
}


/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- SLIDE CREATION ---------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/


// Creating our slide objects, you can make as many as you want

var Leaf56 = new Slide(
	"100_0050",
	"./images/100_0050.JPG",
	"13.01194",
	"74.79417",
	"22.57",
	"24.86",
	"1.36",
	"1.26",
	"2.73",
	"2.56",
	"Garden Corton"
);

var Leaf57 = new Slide(
	"100_0053",
	"./images/100_0053.JPG",
	"13.01139",
	"74.79639",
	"19.64",
	"19.18",
	"2.01",
	"1.86",
	"3.05",
	"3",
	"Simarouba Glauca"
);

var Leaf59 = new Slide(
	"100_0056",
	"./images/100_0056.JPG",
	"13.01194",
	"74.79556",
	"6.16",
	"5.39",
	"5.19",
	"4.92",
	"6.34",
	"6.35",
	"Saraca Asoca/Ashoka Tree Plant"
);


var Leaf50 = new Slide(
	"100_0057",
	"./images/100_0057.JPG",
	"13.01139",
	"74.79639",
	"6.69",
	"6.43",
	"3.4",
	"3.03",
	"4.27",
	"4.08",
	"Cynodon dactylon/Dhruva"
);



var Leaf53 = new Slide(
	"100_0059",
	"./images/100_0059.JPG",
	"13.01083",
	"74.79472",
	"13.42",
	"12.77",
	"3.06",
	"2.91",
	"3.55",
	"3.56",
	"Gulmohar"
);

var Leaf61 = new Slide(
	"100_0061",
	"./images/100_0061.JPG",
	"13.01111",
	"74.79583",
	"31.78",
	"31.61",
	"1.34",
	"1.21",
	"2.4",
	"2.22",
	"Flamboyant tree"
);


function buildSlider(){

	// A variable to hold all our HTML
	var myHTML = "Loading....";

	// Go through the Array and add the code to our HTML
	for(var i = 0; i < slideArray.length; i++) {

		myHTML += "<div id='" + slideArray[i].id +
		"' class='singleSlide' style='background-image:url(" + slideArray[i].background + ");'>" +
		"<div class='slideOverlay'>" +
		//"<h5>" + slideArray[i].title + "</h5>" +
		// "<h4>" + slideArray[i].subtitle + "</h4>" +
		// "<a href='" + slideArray[i].link + "' target='_blank'>Open Link</a>" +
		"</div>" +
		"</div>";
		selectVariable = slideArray[i].title;

		setVariable = slideArray[i];
	}

	// Print our HTML to the web page
	document.getElementById("mySlider").innerHTML = myHTML;

	// Display the first slide
	document.getElementById("sample" + currentSlideIndex).style.left = 0;

}



// Navigates to the previous slide in the list
function prevSlide(){

	// Figure out what the previous slide is
	var nextSlideIndex;
	// If we are at zero go to the last slide in the list
	if (currentSlideIndex === 0 ) {
		nextSlideIndex = slideArray.length - 1;

	} else {
		// Otherwise the next one is this slide minus 1
		nextSlideIndex = currentSlideIndex - 1;

	}

	// Setup the next slide and current slide for animations
	document.getElementById("sample" + nextSlideIndex).style.left = "-100%";
	document.getElementById("sample" + currentSlideIndex).style.left = 0;

	// Add the appropriate animation class to the slide
	document.getElementById("sample" + nextSlideIndex).setAttribute("class", "singleSlide slideInLeft");
	document.getElementById("sample" + currentSlideIndex).setAttribute("class", "singleSlide slideOutRight");

	selectVariable = slideArray[nextSlideIndex].title;
	setVariable = slideArray[nextSlideIndex];
	// if(simsubscreennum == 1)
	// {
	// 	document.getElementById("sampleSelect").value = setVariable;
	// }

	// Set current slide to the new current slide
	currentSlideIndex = nextSlideIndex;
	displayTable();
}


// Navigates to the next slide in the list
function nextSlide(){
	// Figure out what the next slide is

	var nextSlideIndex;

	// If we are at the last slide the next one is the first (zero based)
	if (currentSlideIndex === (slideArray.length - 1) ) {
		nextSlideIndex = 0;

	} else {
		// Otherwise the next slide is the current one plus 1
		nextSlideIndex = currentSlideIndex + 1;

	}

	// Setup the next slide and current slide for animations
	document.getElementById("sample" + nextSlideIndex).style.left = "100%";
	document.getElementById("sample" + currentSlideIndex).style.left = 0;

	// Add the appropriate animation class to the slide
	document.getElementById("sample" + nextSlideIndex).setAttribute("class", "singleSlide slideInRight");
	document.getElementById("sample" + currentSlideIndex).setAttribute("class", "singleSlide slideOutLeft");

		selectVariable = slideArray[nextSlideIndex].title;
		setVariable = slideArray[nextSlideIndex];
	// if(simsubscreennum == 1)
	// {
	// 	document.getElementById("sampleSelect").value = setVariable;
	// }
	// Set current slide to the new current slide
	currentSlideIndex = nextSlideIndex;
	displayTable();
}

function displayTable(){
	document.getElementById("name").innerHTML = `Sample: ${setVariable.name}`
	document.getElementById("data").innerHTML = `
	<tr>
		<td>${setVariable.latitude}</td>
		<td>${setVariable.longitude}</td>
		<td>${setVariable.gapFraction}</td>
		<td>${setVariable.openness}</td>
		<td>${setVariable.laiLin1}</td>
		<td>${setVariable.laiLin2}</td>
		<td>${setVariable.laiLog1}</td>
		<td>${setVariable.laiLog2}</td>
	</tr>
	`
}
