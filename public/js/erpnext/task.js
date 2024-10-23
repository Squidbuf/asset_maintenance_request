frappe.ui.form.on("Task", {
   before_save(frm) {
        if (frm.doc.status === "Completed") {
            frappe.call({
                method: "asset_maintenance.asset_maintenance.doctype.asset_maintenance_request.asset_maintenance_request.update_request_time",
                args: {
                    request_date: frm.doc.exp_start_date,
                    complete_date: frm.doc.exp_end_date,
                    request: frm.doc.custom_asset_request
                },
                callback: (data) => {
                    console.log("=========================")
                }
            })
        }
   }
})