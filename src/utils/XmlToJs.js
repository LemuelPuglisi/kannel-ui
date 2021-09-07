export const parseXml = function (xml, arrayTags) {

    const dom = (new DOMParser()).parseFromString(xml, 'text/xml'); 

    function parseNode (xmlNode, result) {

        if (xmlNode.nodeName == '#text') {
            if (xmlNode.nodeValue.trim()) {
                result['value'] = xmlNode.nodeValue;  
            }
            return; 
        }
    
        let jsonNode = {}; 
        let existing = result[xmlNode.nodeName]; 
    
        if (existing) {
            if (!Array.isArray(existing)) {
                result[xmlNode.nodeName] = [existing, jsonNode];
            }
            else {
                result[xmlNode.nodeName].push(jsonNode);
            }
        }
        else {
    
            if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1) {
                result[xmlNode.nodeName] = [jsonNode];
            }
            else {
                result[xmlNode.nodeName] = jsonNode;
            }
        }
    
        if (xmlNode.attributes) {
            for (let attribute of xmlNode.attributes) {
                jsonNode[attribute.nodeName] = attribute.nodeValue;
            } 
        }
        
        for (let node of xmlNode.childNodes) {
            parseNode(node, jsonNode);
        }
    }

    let result = {};
    for (let node of dom.childNodes) parseNode(node, result);

    return result;
}