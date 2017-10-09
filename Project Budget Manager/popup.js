$(function(){
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    })
   
    $('#spendamount').click(function(){
        chrome.storage.sync.get(['total','limit'],function(budget){
            var newTotal = 0;
            if(budget.total){
                newTotal+= parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if(amount)
            {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total':newTotal}, function(){
                if(amount&& newTotal>=budget.limit){
                    var notifOptions = {
                        type:'basic',
                        iconUrl:'48.png',
                        message:'You have reached your limit',
                        title:'Limit reached'
                    };
                chrome.notifications.create('notifObject',notifOptions)
                }
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        })
    })
});