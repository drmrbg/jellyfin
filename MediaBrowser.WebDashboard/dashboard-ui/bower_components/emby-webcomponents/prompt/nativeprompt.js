define([], function() {
    "use strict";

    function replaceAll(str, find, replace) {
        return str.split(find).join(replace)
    }
    return function(options) {
        "string" == typeof options && (options = {
            label: "",
            text: options
        });
        var label = replaceAll(options.label || "", "<br/>", "\n"),
            result = prompt(label, options.text || "");
        return result ? Promise.resolve(result) : Promise.reject(result)
    }
});