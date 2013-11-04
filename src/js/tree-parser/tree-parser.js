define(function(require) {
	var tmpKeyPrefix = "__tk_";

	function itemsToTree(items, options) {
		var tree = {};

		function addToTree(subtree, parts, item) {
			var key = parts.shift();
			var current = subtree[tmpKeyPrefix + key];
			
			if(!current) {
				var leaf = {};
				if(typeof item === "object" && parts.length === 0) {
					leaf = item;
				}
				leaf[options.assignSeparatedNameToKey] = key;
				current = subtree[tmpKeyPrefix + key] = leaf;
			}

			if(parts.length > 0) {
				addToTree(current, parts, item);
			}

			return current;
		}

		items.forEach(function(item) {
			var identifier = (typeof options.performSeparationOnKey === "string") ? item[options.performSeparationOnKey] : item;
			var parts = identifier.split(options.separator);
			addToTree(tree, parts, item);
		});

		return tree;
	}

	function treeToArray(tree, options) {
		
		function process(node) {
			var data = [];
			Object.keys(node).forEach(function(key) {
				
				if(key.indexOf(tmpKeyPrefix) === 0) {
					var obj = node[key];

					if(node[key]) {
						var children = process(node[key]);

						if(children.length > 0) {
							obj[options.assignChildrenToKey] = children;
						}
					}

					removeTmpKeys(obj);
					data.push(obj);
				}
			});

			return data;
		}

		return process(tree);
	}

	function removeTmpKeys(obj) {
		Object.keys(obj).forEach(function(key) {
			if(key.indexOf(tmpKeyPrefix) === 0) {	
				delete obj[key];
			}
		});
	}

	return {
		parse: function(items, options) {
			if(!(options && options.separator && options.assignChildrenToKey && options.assignSeparatedNameToKey)) {
				throw "Required options: separator, assignChildrenToKey and assignSeparatedNameToKey";
			}
			var tree = itemsToTree(items, options);
			return treeToArray(tree, options);
		}
	}
});