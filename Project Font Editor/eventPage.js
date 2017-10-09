chrome.runtime.onMessage.addListener(function(request,response,sender){
    try
    {
        if(request.todo == "showPageAction")
    {
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }}
    catch (e){
        alert(e);
    }
});

// chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
//     chrome.pageAction.show(tabs[0].id);
// })