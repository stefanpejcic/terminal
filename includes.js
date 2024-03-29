//menu and window
var nav = {
	init: function() {
		nav.menuBtn = document.getElementById("menu-btn");
		nav.menuBtn.addEventListener("click", nav.toggleMenu);

		nav.menu = document.querySelector(".navigation");
		window.addEventListener("resize", nav.onResize);
	},

	onResize: function() {
		if (window.innerWidth > 992 && window.getComputedStyle(nav.menu).display === "none") {
			nav.menuBtn.innerHTML = '<i class="fa fa-times"></i>';
			nav.menu.style.display = "block";
		} else if (window.innerWidth < 991 && window.getComputedStyle(nav.menu).display === "block") {
			nav.menuBtn.innerHTML = '<i class="fa fa-bars"></i>';
			nav.menu.style.display = "none";
		}
	},

	toggleMenu: function() {
		nav.changeBtn();
		if (window.getComputedStyle(nav.menu).display === "block") {
			nav.menu.style.display = "none";
			return;
		}
		nav.menu.style.display = "block";
	},

	changeBtn: function() {
		if (nav.menuBtn.innerHTML == '<i class="fa fa-bars"></i>') {
			nav.menuBtn.innerHTML = '<i class="fa fa-times"></i>';
			return;
		}
		nav.menuBtn.innerHTML = '<i class="fa fa-bars"></i>';
	}
};
document.addEventListener("DOMContentLoaded", nav.init);

///////////////////////////////
//                           //
// Terminal starts from here //
//                           //
///////////////////////////////

//Current line
var CurrentId = undefined;
var hostname = "pcx3.com";
var username = 'guest';
var folder = '~';

//print greetings
$("#Terminal").append('<div id="welcome">👋 Hi, my name is Stefan Pejčić.</div> I&apos;m a virtualization architect, <a href="https://www.linkedin.com/in/stefan-pejcic/" target="_blank">medior system administrator</a>, and  <a href="https://profiles.wordpress.org/stefanpejcic/#content-plugins" target="_blank">WordPress plugin developer.</a><br/><br/>'); 
$("#Terminal").append('I tend to write very specific blog posts solving practical issues with the goal of saving the reader&apos;s time.<br/><br/>');
$("#Terminal").append('<div id="githubterm">This terminal is open sourced on github at <a href="https://github.com/stefanpejcic/terminal" target="_blank">stefanpejcic/terminal</a>. Feel free to submit pull requests when you find my typos. <br/><br/></div>');
$("#Terminal").append('Use the following commands to get to know me:<br/><br/>');

//help commands
$("#Terminal").append('whoami &nbsp; - &nbsp; About myself<br/>');
$("#Terminal").append('social &nbsp; - &nbsp; My social profiles<br/>');
$("#Terminal").append('resume &nbsp; - &nbsp; Download my resume<br/><br/>');

//Onload
NewLine();

//Enter button
$(document).on('keydown', function(e) {
  var x = event.which || event.keyCode;
  if (x === 13 || x == 13) {
    var consoleLine = $('#' + CurrentId + ' input').val();
    var delay = ExecuteLine(consoleLine);
    setTimeout(NewLine, delay);

  }
});
$(document).on('keydown', function(e) {
  var x = event.which || event.keyCode;
  var line = $('#' + CurrentId + ' input');
  var length = line.val().length;
  if (x != 8) {
    line.attr("size", 1 + length);
  } else {
    line.attr("size", length * .95);
  }
  if (length === 0) {
    $('#' + CurrentId + ' input').attr("size", '1');
  }

});

// focus terminal on mouse click
$(document).on('click', function(e) {
	$('#' + CurrentId + ' input').focus();
});

//new line
function NewLine() {
  if (CurrentId !== undefined) {
    $('#' + CurrentId + ' input').prop('disabled', true);
  }
  CurrentId = 'consoleInput-' + GenerateId();
  if (username !== '') {
    $("#Terminal").append('<div class="console-line" id="' + CurrentId + '">' + username + '@' + hostname + ':<span class="terminal-purple">' + folder + ' $</span> <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>');
  } else {
    $("#Terminal").append('The programs included with the Debian GNU/Linux system are free software;<br/>');
    $("#Terminal").append('the exact distribution terms for each program are described in the<br/>');
    $("#Terminal").append('individual files in /usr/share/doc/*/copyright.<br/><br/>');
    $("#Terminal").append('Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent<br/>');
    $("#Terminal").append('permitted by applicable law.<br/><br/>');
    $("#Terminal").append('<div id="' + CurrentId + '">Login as: <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>');
  }
  $('#' + CurrentId + ' input').focus();
  $('#' + CurrentId + ' input').attr("size", '1');
}

//execute the line
function ExecuteLine(command) {
	$('.console-carrot').remove();
	var CurrentCommand = command.toLowerCase();

  if (username === '') {
    username = CurrentCommand;
    return 500;
  } else {
    //clear
    if (CurrentCommand == 'clear') {
	    $("#Terminal").empty();
    }
    //logout
    else if (CurrentCommand == 'exit' || CurrentCommand == 'logout') {
	    $("#Terminal").empty();
	    username = ''
    }
    //echo
    else if (CurrentCommand.startsWith("echo")) {
	    var NewLine = CurrentCommand.replace("echo ", "");
	    $("#Terminal").append(NewLine);
    }
    //hostname
    else if (CurrentCommand.startsWith("hostname")) {
	    var name = CurrentCommand.replace("hostname ", "");
	    if (name !== '') {
		    hostname = name;
	    }
    }
    //cd
    else if (CurrentCommand.startsWith("cd")) {
	    var Address = CurrentCommand.replace("cd ", "").replace(" ", "").replace("//", "");
	    if (Address == '/' || Address == '' || Address == 'cd') {
		    folder = '~';
	    } else {
		    folder = Address;
	    }
    } 
    //pwd
    else if (CurrentCommand.startsWith("pwd")) {
	    $("#Terminal").append('&#47;var&#47;www&#47;html&#47;').append(folder);
    }	
    //ls
    else if (CurrentCommand == 'ls') {
	    $("#Terminal").append('README.md<br/>');
	    $("#Terminal").append('LICENSE<br/>');
	    $("#Terminal").append('.gitignore<br/>');
    }
    //ll
    else if (CurrentCommand == 'll' || CurrentCommand == 'ls -la') {
	    $("#Terminal").append('total 16<br/>');		
	    $("#Terminal").append('dr-xr-x---.&nbsp;&nbsp; 9 root root&nbsp;&nbsp; 4096&nbsp;&nbsp;dec 30 07&#58;15 .<br/>');
	    $("#Terminal").append('dr-xr-xr-x.&nbsp;&nbsp;20 root root&nbsp;&nbsp; 4096&nbsp;&nbsp;nov 15 21&#58;20 ..<br/>');
	    $("#Terminal").append('drwx------ &nbsp;&nbsp; 3 root root&nbsp;&nbsp; 4096&nbsp;&nbsp;nov 19 19&#58;53 .gitignore<br/>');
	    $("#Terminal").append('-rw-r--r--.&nbsp;&nbsp; 1 root root&nbsp;&nbsp;&nbsp;&nbsp;100&nbsp;&nbsp;dec 29  2013 &nbsp;README.md<br/>');
	    $("#Terminal").append('-rw-r--r--.&nbsp;&nbsp; 1 root root&nbsp;&nbsp;&nbsp;&nbsp;100&nbsp;&nbsp;dec 29  2013 &nbsp;LICENSE<br/>');
    }
    //help	   
    else if (CurrentCommand == 'help' || CurrentCommand == '?') {
	    $("#Terminal").append('GNU bash, version 4.3.30(1)-release (arm-unknown-linux-gnueabihf)<br/>');
	    $("#Terminal").append('These shell commands are defined internally.  Type "help" to see this list.<br/><br/>');
	    $("#Terminal").append('A star (*) next to a name means that the command is disabled.<br/>');
	    $("#Terminal").append('cd [dir] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Change directory<br/>');
	    $("#Terminal").append('clear &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Clear console screen<br/>');
	    $("#Terminal").append('echo [arg...] &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Echo text back in console<br/>');
	    $("#Terminal").append('pwd &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Prints name of the present/current working directory<br/>');
	    $("#Terminal").append('ls &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  List files and directories<br/>');
	    $("#Terminal").append('exit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout of terminal<br/>');
	    $("#Terminal").append('help &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Get Help about command<br/>');
	    $("#Terminal").append('hostname [arg..]&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Change hostname<br/>');
	    $("#Terminal").append('logout &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout of terminal<br/>');
    }
//sajtovi
    else if (CurrentCommand == 'sites' || CurrentCommand == 'blogs') {
	    $("#Terminal").empty();
	    $("#Terminal").append('My websites:<br/><br/>');
	    $("#Terminal").append('<a href="https://wpxss.com" target="_blank"><img src="https://pcx3.com/slike/wpxss.png" style="width: 50%; float: left; padding-right: 5px;"/></a><a href="https://pcx3.com" target="_blank"><img src="https://pcx3.com/slike/pcx3.png" style="width: 50%; float: right; padding-left: 5px;"/></a><br/>');
            $("#Terminal").append('&nbsp;<br/><i class="fa fa-info-circle" aria-hidden="true"></i> Type "pc" or "wp" to show latest posts from those websites.<br/>');
    
    }    

//whoami
    else if (CurrentCommand == 'whoami' || CurrentCommand == 'who') {
	    $("#Terminal").empty();
	    $("#Terminal").append('<a href="https://www.linkedin.com/in/stefan-pejcic/" target="_blank"><img src="https://pcx3.com/slike/stefan.jpg" id="stefan" style="float: left; padding-right: 10px;"/></a></br>Stefan Pejcic - SysAdmin who dabble with WordPress, crypto and blogging.<br/><br/>Summary&#58; I have over 5 years of experience working in WordPress and cPanel. Currently, I work as Technical Support Team Lead at NETOPS Group delivering exceptional support to customers through phone, email and chat. I lead by example, organize work, build reports, handle escalations, and help with ad hoc projects, and training.<br/><br/>When I&apos;m not on the job, I love hiking with my <i class="fas fa-dog"></i>, spend my time blogging on PC✗3.com and indulging my love for seeing new places.<br/><br/>Competencies&#58; WordPress, cPanel, Linux, VMware<br/>');

	    $("#Terminal").append('<br/>experience &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Previous employers<br/>');
	    $("#Terminal").append('education &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Courses and Certificates<br/>');
	    $("#Terminal").append('sites &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; OpenSource projects and Websites<br/>');
    }
    //experience
    else if (CurrentCommand == 'experience' || CurrentCommand == 'jobs') {
	    $("#Terminal").append('Junior Front-end Web Developer at <img src="https://pcx3.com/slike/atiscom.png" height="16px"> Atiscom Sàrl<br/><br/>');
	    $("#Terminal").append('July 2016 - February 2017 (8 months)<br/>');
	    $("#Terminal").append('<i class="fa fa-map-marker"></i> Geneva Area, Switzerland<br/><br/>');
	    $("#Terminal").append('Working as a Junior Front-end Web Developer for Atiscom Sarl I had the chance to work on various global projects as well as support the design and implementation of their own website and a range of interactive data tools.<br/>');
	    $("#Terminal").append('<br/><hr/><br/>');
	    
	    $("#Terminal").append('Junior PHP Developer at <img src="https://pcx3.com/slike/wporb.png" height="16px"> WPorb d.o.o.<br/><br/>');
	    $("#Terminal").append('January 2019 - December 2019 (1 year)<br/>');
	    $("#Terminal").append('<i class="fa fa-map-marker"></i> Belgrade, Serbia<br/><br/>');
	    $("#Terminal").append('<br/><hr/><br/>');
   
	    $("#Terminal").append('Junior System Administrator at <img src="https://pcx3.com/slike/mega.png" height="16px"> Mega Computer Engineering<br/><br/>');
	    $("#Terminal").append('December 2019 - September 2020 (10 months)<br/>');
	    $("#Terminal").append('<i class="fa fa-map-marker"></i> Belgrade, Serbia<br/><br/>');
	    $("#Terminal").append('Working with the team all day with bouncing ideas, sharing solutions, and discussing video games and movies. Had a chance to communicate to both clients and team members at both technical and non-technical levels.<br/>');
	    $("#Terminal").append('<br/><hr/><br/>');
	    $("#Terminal").append('System Administrator at <img src="https://pcx3.com/slike/netops.jpeg" height="16px"> NETOPS Group<br/><br/>');
	    $("#Terminal").append('September 2020 - Present<br/>');
	    $("#Terminal").append('<i class="fa fa-map-marker"></i> Belgrade, Serbia<br/><br/>');
	    $("#Terminal").append('Currently, I work as Technical Support Team Lead at Netops delivering exceptional support to customers through phone, email and chat. I lead by example, organize work, build reports, handle escalations, and help with ad hoc projects, and training.<br/>');
	    $("#Terminal").append('<br/>');

    }
//education
    else if (CurrentCommand == 'education' || CurrentCommand == 'certificates') {
	    $("#Terminal").append('ITAcademy by LINKgroup<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/python.png" width="16px"></img> Python Programming (2019-2021)<br/>');
	    $("#Terminal").append('<hr/>cPanel University<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/imunify.png" width="16px"></img> Imunify360 Certification (I360CP)<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/jetbackup.png" width="16px"></img> JetBackup Certification (JBCP)<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/lsws.png" width="16px"></img> LiteSpeed Certification<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/cpanel.png" width="16px"></img> cPanel & WHM Administrator Certification<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/cpanel.png" width="16px"></img> cPanel & WHM SalesProfessional<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/cpanel.png" width="16px"></img> cPanel & WHM System Administrator I Certification (CWSA-1)<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/cpanel.png" width="16px"></img> cPanel Professional Certification<br/>');
	    $("#Terminal").append('<hr/>Krojaceva Skola<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/wordpress.png" width="16px"></img> WordPress Installation and Usage<br/>');
	    $("#Terminal").append('<img src="https://pcx3.com/slike/cpanel.png" width="16px"></img> Domain, Hosting and cPanel setup<br/>');
    }
    
    //social
    else if (CurrentCommand == 'social' || CurrentCommand == '?') {
      $("#Terminal").append('<br/>');
      $("#Terminal").append('<i class="fa fa-linkedin"></i>: <a href="https://www.linkedin.com/in/stefan-pejcic/" target="_blank">https://www.linkedin.com/in/stefan-pejcic/</a><br/><br/>');
      $("#Terminal").append('<i class="fa fa-github"></i>: <a href="https://github.com/stefanpejcic" target="_blank">https://github.com/stefanpejcic</a><br/><br/>');
      $("#Terminal").append('<i class="fa fa-wordpress"></i>: <a href="https://profiles.wordpress.org/stefanpejcic/" target="_blank">https://profiles.wordpress.org/stefanpejcic/</a><br/><br/>');
      $("#Terminal").append('<i class="fa fa-facebook"></i>: <a href="https://www.facebook.com/stefanneropejcic/" target="_blank">https://www.facebook.com/stefanneropejcic/</a><br/><br/>');
    }
    // sudo
    else if (CurrentCommand == 'sudo' || CurrentCommand == 'su' || CurrentCommand == 'sudo su') {
      $("#Terminal").append('nice try hacker! Here are some commands that you can use:<br/>');
      $("#Terminal").append('<br/>hacker - generate a hacker name');
      $("#Terminal").append('<br/>hack &nbsp;&nbsp;- hack NASA with HTML<br/>');
    }
    // cpanel
    else if (CurrentCommand == 'cp' || CurrentCommand == 'cpanel' || CurrentCommand == 'cpanelplugins') {
      window.open("https://cpanelplugins.com"); 
      $("#Terminal").append('CpanelPlugins.com opened in a new window <i class="fas fa-external-link-alt"></i><br/>');
	}
    // resume
    else if (CurrentCommand == 'resume') {
      $("#Terminal").append('<a href="https://pcx3.com/slike/Profile.pdf" download="StefanPejcic_CV"><u>Click here</u></a> to download my CV or type cv to open it in new window.<br/>');}
      // cv
    else if (CurrentCommand == 'cv') {
      window.open("https://pcx3.com/slike/Profile.pdf"); 
      $("#Terminal").append('CV opened in new window <i class="fas fa-external-link-alt"></i><br/>'); 

    }
    //uname
    else if (CurrentCommand == 'uname') {
      $("#Terminal").append('Linux<br/>'); }
    //uname -r
    else if (CurrentCommand == 'uname -r') {
      $("#Terminal").append('3.10.0-1160.49.1.el7.x86_64<br/>'); }
    
    
    
    //pcx3.com
    else if (CurrentCommand == 'pcx3' || CurrentCommand == 'pcx3.com' || CurrentCommand == 'pc') {
	    $("#Terminal").empty();
	    $("#Terminal").append('<a href="https://pcx3.com" target="_blank"><img src="https://pcx3.com/wp-content/uploads/2021/04/logo-za-pcx3com.png" width="50px"></img></a><br/><br/>');

	    $("#Terminal").append('Latest posts from pcx3.com blog:<br/><br/><div id="feed-textarea"><ul></ul></div><br/>'); 
	    let url = 'http://pcx3.com/feed';
	    const textarea = document.querySelector('#feed-textarea > ul');

    feednami.load(url)
    .then(feed => {
      textarea.value = ''
      for(let entry of feed.entries){
          //create a list element
          let li = document.createElement('li');
          //add HTML content to list items
          li.innerHTML = `<a href="${entry.link}" target="_blank">${entry.title}</a>`;
          //append HTML content to list 
          textarea.appendChild(li);
      }
    });
        
    } 
    //wpxss.com
    else if (CurrentCommand == 'wpxss' || CurrentCommand == 'wpxss.com' || CurrentCommand == 'wp') {
	    $("#Terminal").empty();
	    $("#Terminal").append('<a href="https://wpxss.com" target="_blank"><img src="https://wpxss.com/application/wp-content/uploads/2021/11/wpxss-logo.png" width="50px"></img></a><br/><br/>');
	    $("#Terminal").append('Latest posts from wpxss.com blog:<br/><br/><div id="wpxss-rss"><ul></ul></div><br/>'); 
	    let url = 'http://wpxss.com/feed';
	    const textarea = document.querySelector('#wpxss-rss > ul');
    
    feednami.load(url)
    .then(feed => {
      textarea.value = ''
      for(let entry of feed.entries){
          //create a list element
          let li = document.createElement('li');
          //add HTML content to list items
          li.innerHTML = `<a href="${entry.link}" target="_blank">${entry.title}</a>`;
          //append HTML content to list 
          textarea.appendChild(li);
      }
    });
        
    }   
      
    //bitcoin
    else if (CurrentCommand == 'bitcoin' || CurrentCommand == 'btc') {
	    $("#Terminal").empty();
	    $("#Terminal").append('Current <i class="fa fa-bitcoin"></i>itcoin price (USD) is<div id="price"></div>');
      //coindesk  api
	    let priceDiv = document.getElementById('price');
	    fetch('https://api.coindesk.com/v1/bpi/currentprice.json').then((r)=> {
		    return r.json();
	    }).then((r) => {
		    priceDiv.innerHTML = JSON.stringify(r);
		    usd = r.bpi.USD;
		    parseCurrency(usd);
	    });
	    function parseCurrency(c) {
		    switch(c) {
			    default:
				    x = usd;
		    }
		    priceDiv.innerHTML = x.rate.substring(0, x.rate.length - 2);
	    }
    }
    //matrix
    else if (CurrentCommand == 'matrix') {
	    $("#Terminal").empty();
	    $("#Terminal").append('<canvas id="canv"></canvas>');

      //matrix code
const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = document.body.offsetHeight;
const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);

function matrix () {
  ctx.fillStyle = '#0001';
  ctx.fillRect(0, 0, w, h);
  
  ctx.fillStyle = '#0f0';
  ctx.font = '15pt monospace';
  
  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = ind * 20;
    ctx.fillText(text, x, y);
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    else ypos[ind] = y + 20;
  });
}

setInterval(matrix, 50);
    }
    //hacker name generator
    else if (CurrentCommand == 'hacker') {
	    var firstNames = ["1337", "t0xic", "phantom", "ALPhA", "v1rus", "biTe", "krypt0", "cyb3r", "Bi0", "acid", "gh0st", "Lord", "r4dical"];
	    var secondNames = ["PWNER", "H4X0R", "buRn", "MuX", "d3st0y3r", "phreak", "Plague", "0verride", "Chaos"];
	    function getHackerName() {
		    var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		    var secondName = secondNames[Math.floor(Math.random() * secondNames.length)];
		    return firstName + " " + secondName;
	    }  
	    $("#Terminal").append('Your hacker name is: ').append(getHackerName);
    }
    //hack nasa with html
    else if (CurrentCommand == 'hack') {
	    $("#Terminal").empty();
	    $("#Terminal").append('<div id="console"></div>'); 
	    var intervalID = window.setInterval(updateScreen, 200);
	    var c = document.getElementById("console");
	    var txt = [
		    "FORCE: XX0022. ENCYPT://000.222.2345",
		    "TRYPASS: ********* AUTH CODE: ALPHA GAMMA: 1___ PRIORITY 1",
		    "RETRY: REINDEER FLOTILLA",
		    "Z:> /FALKEN/GAMES/TICTACTOE/ EXECUTE -PLAYERS 0",
		    "================================================",
		    "Priority 1 // local / scanning...",
		    "scanning ports...",
		    "BACKDOOR FOUND (23.45.23.12.00000000)",
		    "BACKDOOR FOUND (13.66.23.12.00110000)",
		    "BACKDOOR FOUND (13.66.23.12.00110044)",
		    "...",
		    "...",
		    "BRUTE.EXE -r -z",
		    "...locating vulnerabilities...",
		    "...vulnerabilities found...",
		    "MCP/> DEPLOY CLU",
		    "SCAN: __ 0100.0000.0554.0080",
		    "SCAN: __ 0020.0000.0553.0080",
		    "SCAN: __ 0001.0000.0554.0550",
		    "SCAN: __ 0012.0000.0553.0030",
		    "SCAN: __ 0100.0000.0554.0080",
		    "SCAN: __ 0020.0000.0553.0080",
	    ]
	    var docfrag = document.createDocumentFragment();
	    function updateScreen() {
		    //Shuffle the "txt" array
		    txt.push(txt.shift());
		    //Rebuild document fragment
		    txt.forEach(function(e) {
			    var p = document.createElement("p");
			    p.textContent = e;
			    docfrag.appendChild(p);
		    });
		    //Clear DOM body
		    while (c.firstChild) {
			    c.removeChild(c.firstChild);
		    }
		    c.appendChild(docfrag);
	    } 
    }
    //No command
    else if (CurrentCommand === '') {}
    //Unknown
    else {
	    var NewLine = "<div id='notfound'>-bash: " + CurrentCommand + ": command not found </div>";
	    $("#Terminal").append(NewLine);
    }
  }
}

//Generate id
function GenerateId() {
  return Math.random().toString(16).slice(2)
}
