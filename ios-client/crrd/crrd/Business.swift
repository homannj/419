//
//  Business.swift
//  crrd
//
//  Created by josh on 1/17/16.
//  Copyright © 2016 josh. All rights reserved.
//

import Foundation

//name: String,
//address: String,
//city: String,
//state: String,
//zip: String,
//phone: String,
//url: String,
//reuseCategories: Array,
//repairCategories: Array,
//hours: String,
//latitude: Number,
//longitude: Number,
//notes: String

class Business {
    var id : String = ""
    var name : String = ""
    var address : String = ""
    var city : String = ""
    var state : String = ""
    var zip : String = ""
    var phone : String = ""
    var url : String = ""
    var reuseCategories: [String] = []
    var repairCategories: [String] = []
    var hours : String = ""
    var latitude : Float
    var longitude : Float
    var notes: String
    class func arrayOfModelsFromJSON (json:JSON) -> [Business] {
        var collection:[Business] = [];
        for var i = 0; i < json.count; i++ {
            let reuse = json[i]["reuseCategories"].arrayValue.map { $0.string!};
            let repair = json[i]["repairCategories"].arrayValue.map { $0.string!};

            collection.append(Business(id: json[i]["_id"].string!, name: json[i]["name"].string!, address: json[i]["address"].string!, city: json[i]["city"].string!, state: json[i]["state"].string!, zip: json[i]["zip"].string!, phone: json[i]["phone"].string!, url: json[i]["url"].string!, reuseCategories: reuse, repairCategories: repair, hours: json[i]["hours"].string!, latitude: json[i]["latitude"].float!, longitude: json[i]["longitude"].float!, notes: json[i]["notes"].string!))
        }
        return collection;
    }
    init (id : String, name : String, address : String, city : String, state : String, zip : String, phone : String, url : String,        reuseCategories: [String], repairCategories: [String], hours : String, latitude : Float, longitude : Float, notes: String) {
        self.id = id
        self.name = name
        self.address=address
        self.city=city
        self.state=state
        self.zip=zip
        self.phone=phone
        self.url=url
        self.reuseCategories=reuseCategories
        self.repairCategories=repairCategories
        self.hours=hours
        self.latitude=latitude
        self.longitude = longitude
        self.notes=notes
    }
}