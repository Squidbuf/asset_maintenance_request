# Copyright (c) 2024, Craft Interactive and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import time_diff_in_hours




class AssetMaintenanceRequest(Document):
	def validate(self):
		self.validate_completed_date()

	def validate_completed_date(self):
		if self.request_date > self.expected_completion_date:
			frappe.throw(("Request completion date can't be before request date."))


	def after_insert(self):
		if self.priority == "Urgent":
			maintenance_user = frappe.db.get_all("User", {'role_profile_name': "Manufacturing"}, ['name', 'full_name'])
			
			subject = "Urgent Notification: Maintenance Request"
			for user in maintenance_user:
				frappe.sendmail(
					recipients = user.name,
					subject = subject,
					template = "maintenance_request",
					args = dict(
						user = user.full_name,
						link = f"/app/asset-maintenance-request/{self.name}"
					)
				)


@frappe.whitelist(allow_guest=True)
def create_task(**post):
	create_new_task = frappe.new_doc("Task")
	create_new_task.update(post)
	create_new_task.flags.ignore_permissions = True
	create_new_task.save()
	frappe.db.commit()
	return True
	

@frappe.whitelist(allow_guest=True)
def update_request_time(**post):
	diff = time_diff_in_hours(post.get('complete_date'), post.get('request_date'))
	update_request = frappe.get_doc("Asset Maintenance Request", {'name': post.get('request')})
	update_request.resolution_time = diff
	update_request.status = "In Review"
	update_request.flags.ignore_permissions = True
	update_request.save()
	frappe.db.commit()
	
