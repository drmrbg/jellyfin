define(["dialogHelper", "layoutManager", "globalize", "require", "events", "homescreenSettings", "paper-icon-button-light", "css!./../formdialog"], function(dialogHelper, layoutManager, globalize, require, events, HomescreenSettings) {
    "use strict";

    function centerFocus(elem, horiz, on) {
        require(["scrollHelper"], function(scrollHelper) {
            var fn = on ? "on" : "off";
            scrollHelper.centerFocus[fn](elem, horiz)
        })
    }

    function show(options) {
        return new Promise(function(resolve, reject) {
            require(["text!./homescreensettingsdialog.template.html"], function(template) {
                var dialogOptions = {
                    removeOnClose: !0,
                    scrollY: !1
                };
                layoutManager.tv ? dialogOptions.size = "fullscreen" : dialogOptions.size = "medium-tall";
                var dlg = dialogHelper.createDialog(dialogOptions);
                dlg.classList.add("formDialog");
                var html = "",
                    submitted = !1;
                html += globalize.translateDocument(template, "sharedcomponents"), dlg.innerHTML = html, layoutManager.tv && centerFocus(dlg.querySelector(".formDialogContent"), !1, !0);
                var homescreenSettingsInstance = new HomescreenSettings({
                    serverId: options.serverId,
                    userId: options.userId,
                    element: dlg.querySelector(".settingsContent"),
                    userSettings: options.userSettings,
                    enableSaveButton: !1,
                    enableSaveConfirmation: !1
                });
                dialogHelper.open(dlg), dlg.addEventListener("close", function() {
                    layoutManager.tv && centerFocus(dlg.querySelector(".formDialogContent"), !1, !1), submitted ? resolve() : reject()
                }), dlg.querySelector(".btnCancel").addEventListener("click", function(e) {
                    dialogHelper.close(dlg)
                }), dlg.querySelector(".btnSave").addEventListener("click", function(e) {
                    submitted = !0, homescreenSettingsInstance.submit()
                }), events.on(homescreenSettingsInstance, "saved", function() {
                    submitted = !0, dialogHelper.close(dlg)
                })
            })
        })
    }
    return {
        show: show
    }
});