// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({ebaySellerRating: 99.2, ebaySellerSales:1000, ebayTotalPrice:3});

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.ebay.com', pathContains: 'sch'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
