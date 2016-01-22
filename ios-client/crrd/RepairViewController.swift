//
//  CategoryViewController.swift
//  
//
//  Created by josh on 1/16/16.
//
//

import UIKit

class RepairViewController: UIViewController,UITableViewDelegate, UITableViewDataSource {
    var repairCategories : [Category] = []
    @IBOutlet weak var tableView: UITableView!
    override func viewDidLoad() {
        super.viewDidLoad()

            RestApiManager.sharedInstance.getRepairCategories() { json in
                self.repairCategories = Category.arrayOfModelsFromJSON(json)
                self.repairCategories.sortInPlace {
                    $0.name.localizedCaseInsensitiveCompare($1.name) == NSComparisonResult.OrderedAscending
                }
                self.tableView.reloadData()
            }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return self.repairCategories.count
    }


    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: UITableViewCellStyle.Default, reuseIdentifier: "Cell")
        cell.textLabel?.text = self.repairCategories[indexPath.row].name
        return cell
    }

    func tableView(tableView: UITableView, didDeselectRowAtIndexPath indexPath: NSIndexPath) {
        NSLog("loggin")
        RestApiManager.sharedInstance.getBusinessesForRepairCategory(self.repairCategories[indexPath.row].id) { json in
            NSLog("%@", Business.arrayOfModelsFromJSON(json));
        }
    }

}
