export class RequestProjectListModel {
    prject_id: string;
    project_title: string;
    project_client: string;
    project_assigned_manager: string;
    sprint_planned: number;
    project_cost: number;
    project_type: string;
    project_status: string;
    project_start_date: string;
    project_completion_date: string;
    project_assigned_developers: Array<any>;
    currency: string;
    offset: number;
    perpage: number;
    sortby?: string;
    orderby?: string;
}

/* {
    "project_title": "Accusoft",
    "project_type": "web",
    "project_status": "active",
    "project_client": "Samuel Das",
    "project_assigned_manager": "Kondal Reddy",
    "sprint_planned": "10",
    "project_cost": "800",
    "currency": "USD",
    "project_start_date": "2023-07-24T18:30:00.000Z",
    "project_completion_date": "2023-07-24T18:30:00.000Z",
    "project_assigned_developers":["Rupesh,Gautam kumar"]
} */