export class RequestProjectListModel {
    prject_id: string;
    project_title: string;
    project_client: string;
    project_assigned_manager: string;
    sprint_planned: string;
    project_cost: string;
    project_type: string;
    project_status
    offset: number;
    perpage: number;
    sortby?: string;
    orderby?: string;
}