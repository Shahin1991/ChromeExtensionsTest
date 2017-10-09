var menuItem={
    "id":"spendMoney",
    "title":"spendMoney",
    "contexts":["selection"]
};

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

chrome.contextMenus.create(menuItem);

chrome.browserAction.setBadgeBackgroundColor({"color":[255, 100, 100, 255]})

chrome.contextMenus.onClicked.addListener(function(clickedData){
    if(clickedData.selectionText && clickedData.menuItemId == "spendMoney"){
        if(isInt(clickedData.selectionText)){
            chrome.storage.sync.get(['total','limit'],function(budget){
                var totalSpend=0;
                if(budget.total){
                    totalSpend = parseInt(budget.total);
            }
            totalSpend += parseInt(clickedData.selectionText);
            chrome.storage.sync.set({'total':totalSpend},function(){
                if(totalSpend>budget.limit)
                {
                    var notifOptions = {
                        type:'basic',
                        iconUrl:'48.png',
                        message:'You have reached your limit',
                        title:'Limit reached'
                    };
                chrome.notifications.create('notifObject',notifOptions)
                }
            });
        })
        }
     }
})

chrome.storage.onChanged.addListener(function(changes,areaName){
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
})