function createNextButton() {
	let style = `
	<style>
		div#mNextChapter{
				width: 50px;
				height: 50px;
				position: fixed;
				text-align: center;
				font-weight: bolder;
				bottom: 10%;
				background: rgba(255,255,255,1);
				line-height: 50px;
				cursor: pointer;
				box-shadow: 0px 0px 12px 6px rgba(0, 0, 0, 0.2);
				right: 5%;
		}
		@media screen and (min-width: 1000px) {
		    div#mNextChapter {
						right: 34%;
		    }
		}
		@media screen and (min-width: 1280px){
			div#mNextChapter {
				right: 0;
				transform: translateX(720px);
			}
		}
	</style>
`;
	let button = $(`
	<div id="mNextChapter">
	  &gt;
	</div>
	`);
  button.on("click", function (e) {
    chrome.runtime.sendMessage({requestType: "tseirpFindLatestOpenChapter", tab: window.location.href});
  });
  $("body div.content").append(style, button);
}

function getNextPageHref() {
	let nextPage = document.querySelectorAll("div div p span a")[1].href;
	chrome.runtime.sendMessage({requestType:"openPages", pages: [nextPage]});
}

(function () {
	if(/tseirptranslations.com\/20[\d]{2}\/[\d]{2}\/is-b[\d]c([\d]+).html/.test(window.location.href)){
	  createNextButton();
	}
}())

chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        switch(request.requestType){
            case "getTseirpNextChapter":
                getNextPageHref();
                break;
        }
    }
);