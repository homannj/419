//
//  HomeViewController.swift
//  crrd
//
//  Created by josh on 1/11/16.
//  Copyright © 2016 josh. All rights reserved.
//

import UIKit

class HomeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if (segue.identifier == "republicServicesRecyclingDepot") {
            let destination = segue.destinationViewController as! WebViewController
            destination.URL = NSURL.init(string: "http://site.republicservices.com/site/corvallis-or/en/documents/corvallisrecycledepot.pdf")
        }
        if (segue.identifier == "republicServicesRecyclingGuide") {
            let destination = segue.destinationViewController as! WebViewController
            destination.URL = NSURL.init(string: "http://site.republicservices.com/site/corvallis-or/en/documents/detailedrecyclingguide.pdf")
        }
    }

}

