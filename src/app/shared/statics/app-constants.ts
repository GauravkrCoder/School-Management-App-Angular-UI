export class AppConstants {

    public static errorMsgs: any = {
        invalidInput: 'Invalid Input',
    };

    public static commonMsgs: any = {
        confirm_delete: 'Are you sure you want to delete this record ?',
        confirm_continue: 'Press ok to continue.',
        edit_data_not_available: 'Data not available for<br> VIEW / EDIT / UPDATE / DELETE.<br> Redirecting to main screen.',
    };

    public static apiStatusMsgs: any = {
        something_went_wrong: 'Something went wrong !',
        project_added_successfully: 'Project addess successfully.',
        project_deleted_successfully: 'Project deleted successfully.',
        project_list: 'Project List'
    };

    public static ignoreApiMsgs: Array<string> = ['token_successfully_validated', 'application_token_no_record', 'user_access_grouping_list', 'application_token_record_added_successfully'];

}