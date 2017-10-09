$(function(){
    chrome.storage.sync.get('limit',function(budget){
        $('#limit').val(budget.limit);
    })
    $('#savelimit').click(function(){
        var limit = parseInt($('#limit').val());
        if(limit){
        chrome.storage.sync.get('limit',function(budget){
            chrome.storage.sync.set({'limit':limit}, function(){
                close();
            });
        })    
    }
})

    $('#resettotal').click(function(){
        chrome.storage.sync.get('total',function(budget){
            chrome.storage.sync.set({'total':0}, function(){
                var notifOption = {
                    'type':'basic',
                    'iconUrl':'48.png',
                    'title':'Total reset',
                    'message':'The total amount has been reset'
                };
                chrome.notifications.create('notifObject', notifOption);
            });
        });
        
    })
})