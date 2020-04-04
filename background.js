// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This event is fired with the user accepts the input in the omnibox.


chrome.runtime.onInstalled.addListener(function() {
  
  chrome.storage.sync.set({domains: domainsList}, function() {
  });
});


chrome.omnibox.onInputEntered.addListener(
  function(text) {
    chrome.storage.sync.get('domains', function(data) {
      var domains = data.domains;
      var arr = text.split(/[ ,]+/);
      var context = arr[0];
      var domain = domains[context];
      var query = arr.slice(1).reduce((a, n) => a + " " + n);
      // Encode user input for special characters , / ? : @ & = + $ #
      var newURL = 'https://www.google.com/search?q=' + "site:" + domain + " " + encodeURIComponent(query);
      chrome.tabs.create({ url: newURL });
    })
  });
