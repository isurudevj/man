function loadData() {
    chrome.storage.sync.get('domains', function(data) {
        var domains = data.domains;
        domains.forEach((element, index) => {
            var table = document.getElementById("configTable");
            var row = table.insertRow(index + 1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = element.context;
            cell2.innerHTML = element.domain;
        });
    });
};

loadData();