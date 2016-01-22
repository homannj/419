//
//  Category.swift
//  crrd
//
//  Created by josh on 1/17/16.
//  Copyright © 2016 josh. All rights reserved.
//

import Foundation

class Category {
    var id : String = ""
    var name : String = ""
    class func arrayOfModelsFromJSON (json:JSON) -> [Category] {
        var collection:[Category] = [];
        for var i = 0; i < json.count; i++ {
            collection.append(Category(id: json[i]["_id"].string!, name: json[i]["name"].string!))
        }
        return collection;
    }
    init (id:String, name:String) {
        self.id = id;
        self.name = name;
    }
}
