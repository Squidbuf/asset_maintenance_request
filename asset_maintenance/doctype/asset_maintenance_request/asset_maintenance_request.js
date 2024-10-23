// Copyright (c) 2024, Craft Interactive and contributors
// For license information, please see license.txt

frappe.ui.form.on("Asset Maintenance Request", {
	onload(frm) {
        frm.set_value("request_date", frappe.datetime.get_today())
	},

	refresh(frm) {
		if (!frm.is_new()) {

			let user = frappe.user_roles;

			if (user.includes('Maintenance Manager') || user.includes("Maintenance User") || frappe.user.name === "Administrator") {
				if (frm.doc.status === "Open") {
					frm.add_custom_button(__("Create Maintenance Task"), function () {
						frm.trigger('create_task')
					})
				}

				if (frm.doc.status === "In Review") {
					frm.add_custom_button(__("Complete"), function () {
						frm.set_value("status", "Completed");
						frm.save()
						frm.refresh_field()
						cur_frm.reload_doc();
					}, 'Actions')
				}
			}
		}
	},

	setup(frm) {
		frm.set_query("asset", function (doc) {
			return {
				filters: [
					['Asset', 'status', '=', "Issue"]
				]
			}
		});
	},

	create_task(frm) {

		let subject = `${frm.doc.asset_name}-${frm.doc.maintenance_type}-${frm.doc.name}`
		frappe.call({
			method: "asset_maintenance.asset_maintenance.doctype.asset_maintenance_request.asset_maintenance_request.create_task",
			args: {
				priority : frm.doc.priority,
				exp_end_date : frm.doc.expected_completion_date,
				subject : subject,
				custom_asset: frm.doc.asset,
				exp_start_date : frm.doc.request_date,
				custom_asset_request: frm.doc.name
			},
			callback: (data) => {
				if (data.message) {
					frm.set_value('status', "In Progress")
					frm.save()
					frm.refresh_field()
					cur_frm.reload_doc();
				}
			}
		})
	}
});
