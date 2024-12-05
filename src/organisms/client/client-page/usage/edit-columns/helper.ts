import { FiltersPayload } from "../types";

export function formatDefaultValue(inputString: string, filters: FiltersPayload) {
    const allKeys = [
      'call_id', 'expert_id', 'expert_name', 'expert_type', 'premium_expert',
      'current_company_name', 'current_company_designation', 'base_location', 'current_us_govt_employee',
      'client_contact_name', 'client_contact_email', 'billing_city',
      'billing_country', 'local_to_local', 'payable_mins', 'chargeable_mins', 'billable_currency',
      'selling_price', 'billing_amount', 'multiplier', 'casecode', 'call_medium', 'call_medium_reason',
      'call_type', 'call_status', 'call_date', 'call_log_time' ,'project_id',
      'project_external_topic', 'parent_project_name', 'account_manager', 'client_compliance_date',
      'client_compliance_responses'
    ];
  
    const inputKeys = inputString.split(',').map(key => key.trim());
    
    const result: any = {
        action: filters.view
    };
    
    allKeys.forEach(key => {
      result[key] = inputKeys.includes(key);
    });
  
    return result;
}

export const actionFields = [{
    label: "Save for Client View",
    value: "client"
},
{
    label: "Save for Internal View",
    value: "internal"
}
]