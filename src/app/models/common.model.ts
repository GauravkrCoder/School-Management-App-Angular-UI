export enum RecordsPerPageDataGrid {
    OFFSET = 0,
    PERPAGE = 10
}

export class DataGridInputModel {
    datafor: string;
    headersCol: Array<any>;
    subHeadersCol: Array<any>;
    editableGrid: boolean;
    enableMultiRowSelect: boolean;
    enableRowSelect: boolean;
    enableRowEdit: boolean;
    enableRowDelete: boolean;
    enableRowExpansion: boolean;
    paginator: boolean;
    rowsPerPage: number;
    actionsButtons: boolean;
    searchHeader: boolean;
    dataSpecificationClass: string;
    gridData: Array<any>;
    totalRecords?: number = RecordsPerPageDataGrid.PERPAGE;
    offset?: number = RecordsPerPageDataGrid.OFFSET;

}

export enum Datafor {
    PROJECT = 'project',
    DASHBOARD = 'dashboard'
}

export enum ActionType {
    ADD = 'add',
    EDIT = 'edit',
    DELETE = 'delete',
    SUBMIT = 'submit',
    PAGINATION = 'pagination',
    CLEAR_ALL = 'clear-all',
    CANCEL = 'cancel',
    ROWSELECTION = 'row-selection'
}