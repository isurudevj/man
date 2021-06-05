function loadData() {
  chrome.storage.sync.get("domains", function (data) {
    var table = document.getElementById("configTable");
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
      table.deleteRow(i);
    }
    var domains = data.domains;
    domains.forEach((element, index) => {
      var row = table.insertRow(index + 1);
      var numberCell = row.insertCell(0);
      var contextCell = row.insertCell(1);
      var sitesCell = row.insertCell(2);

      numberCell.innerHTML = index + 1;
      contextCell.innerHTML = element.context;
      sitesCell.innerHTML = element.domain;
    });

    document
      .querySelector("#addBtn")
      .addEventListener("click", (event) => addNewContext(event), false);
  });
}

function addNewContext(event) {
  event.preventDefault();
  let contextElement = document.querySelector("#context");
  let domainElement = document.querySelector("#domain");

  let context = contextElement.value.trim();
  let domain = domainElement.value.trim();

  let warnMsg = document.querySelector("#warn-msg");
  if (context.length === 0 || domain.length === 0) {
    warnMsg.classList.remove("d-none");
    return;
  } else {
    warnMsg.classList.add("d-none");
  }

  domainElement.value = "";
  contextElement.value = "";

  chrome.storage.sync.get("domains", function (data) {
    var domains = data.domains;
    var contextInfo = domains.find((element) => element.context === context);

    if (contextInfo) {
      contextInfo.domain = domain;
    } else {
      domains.push({ context: context, domain: domain });
    }

    chrome.storage.sync.set({ domains: domains }, function () {
      loadData();
    });
  });
}

loadData();
