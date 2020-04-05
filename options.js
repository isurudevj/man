function loadData() {
    chrome.storage.sync.get('domains', function(data) {
        var table = document.getElementById("configTable");
        var rowCount = table.rows.length;
        for(var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
        var domains = data.domains;
        domains.forEach((element, index) => {
            var row = table.insertRow(index + 1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = element.context;
            cell2.innerHTML = element.domain;
        });

        document.getElementById("addBtn").addEventListener("click", addNewContext);

    });
};

function addNewContext() {

    var context = document.getElementById("context").value.trim();
    var domain = document.getElementById("domain").value.trim();

    chrome.storage.sync.get('domains', function(data) {
        var domains = data.domains;
        var contextInfo = domains.find(element => element.context === context);
        
        if(contextInfo) {
            contextInfo.domain = domain;
        } else {
            domains.push({"context" : context, "domain" : domain})
        }

        chrome.storage.sync.set({domains: domains}, function() {
            loadData();
        });

    });

}

loadData();