//
//  RestManager.swift
//  
//
//  Created by josh on 1/16/16.
//
//

import Foundation
typealias ServiceResponse = (JSON, NSError?) -> Void

class RestApiManager: NSObject {
    static let sharedInstance = RestApiManager()
    
    func getRepairCategories(onCompletion: (JSON) -> Void) {
        let route = "http://localhost:3000/api/repairCategories"
        makeHTTPGetRequest(route, onCompletion: { json, err in
            onCompletion(json as JSON)
        })
    }
    func getReuseCategories(onCompletion: (JSON) -> Void) {
        let route = "http://localhost:3000/api/reuseCategories"
        makeHTTPGetRequest(route, onCompletion: { json, err in
            onCompletion(json as JSON)
        })
    }
    func getBusinessesForRepairCategory(id:String, onCompletion: (JSON) -> Void) {
        let route = "http://localhost:3000/api/repairCategories/"+id+"/Businesses"
        makeHTTPGetRequest(route, onCompletion: { json, err in
            onCompletion(json as JSON)
        })
    }

    func makeHTTPGetRequest(path: String, onCompletion: ServiceResponse) {
        let request = NSMutableURLRequest(URL: NSURL(string: path)!)
        
        let session = NSURLSession.sharedSession()
        
        let task = session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
            guard data != nil else {return}
            
            let json:JSON = JSON(data: data!)
            onCompletion(json, error)
        })
        task.resume()
    }
}