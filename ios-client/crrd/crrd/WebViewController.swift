//
//  webViewController.swift
//  crrd
//
//  Created by josh on 1/11/16.
//  Copyright © 2016 josh. All rights reserved.
//

import UIKit


class WebViewController : UIViewController, UIWebViewDelegate {
    @IBOutlet weak var webView: UIWebView!
    var URL: NSURL?;
    override func viewDidLoad() {
        super.viewDidLoad()
        webView.delegate = self;
        guard let URL = self.URL else {
            return;
        }
        webView.loadRequest(NSURLRequest.init(URL: URL));
    }
    func webViewDidFinishLoad(webView: UIWebView) {
        //scroll past the nav bar
        webView.scrollView.contentOffset = CGPointMake(0, -navigationController!.navigationBar.frame.size.height);
    }
}