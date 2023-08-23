import { ActionType } from "src/app/models/common.model";
import { environment } from "src/environments/environment";
import { AppConstants } from "../statics/app-constants";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FormGroup } from "@angular/forms";

export default class AppUtils {

    static getBaseApiURL() {
        return environment.returnParameters().apiBaseURL;
    }

    static getAppEnv(): string {
        return environment.returnParameters().environment;
    }

    static getMsgOnActionType(type: string): string {
        let str: string;
        switch (type) {
            case ActionType.DELETE:
                str = AppConstants.commonMsgs['confirm_delete'];
                break;
        }
        return str;
    }

    static unsbscribeAll(subs: any): null {
        for (let _subs in subs) {
            subs[_subs].unsubscribe();
        }
        return null;
    }

    static removeNullFormControlValues(_form: FormGroup): any {
        let _newValue = {};
        for (let ctrl of Object.keys(_form?.value)) {
            (_form.value[ctrl] === null || _form.value[ctrl] === '') ? null : (_newValue[ctrl] = _form.value[ctrl]);
        }
        return _newValue;
    }

    static payloadStringForDeleteAction(_dataObject: any): string {
        const _data = _dataObject.data;
        const _forPayload = _dataObject['forPayload'];
        let _payloadStringForDelete: string = '';
        if (_data && _data.length > 1) {
            _data.forEach((val) => _payloadStringForDelete += ',' + val[_forPayload]);
            _payloadStringForDelete = _payloadStringForDelete.replace(',', '');
        }
        else {
            _payloadStringForDelete = _data[_forPayload] + '';
        }
        return _payloadStringForDelete;
    }

    static downloadDataTofile(fileFormat: string, _dataObj: any) {
        const dataObj = _dataObj;
        const _filename = dataObj.datafor.toUpperCase();
        if (fileFormat === 'csv') {
            this.downloadDataTofile(dataObj, _filename);
        }
        else if (fileFormat === 'pdf') {
            const _colsData: Array<any> = [];
            dataObj.headersCol.forEach((col) => {
                const _colObj = {};
                _colObj['dataKey'] = col.field;
                _colObj['header'] = col.header;
                _colsData.push(_colObj);
            });
            this.generatePDFwithFormat(dataObj.gridData, _colsData, _filename)
        }
    }

    static generatePDFwithFormat(_gridData: any, _cols: any, _title: string) {
        const doc = new jsPDF({ orientation: 'l', format: 'a4', unit: 'px', compress: true });
        let appLogo = new Image();
        appLogo.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_wTr6lsQyIdrxV_d-KSMLTF5vTM_I-E64ow&usqp=CAU';
        const testData = _gridData;
        const pageSize = doc.internal.pageSize;
        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

        autoTable(doc,
            {
                theme: 'grid',
                showHead: 'everyPage',
                headStyles: { fillColor: '#DCDEE0', fontSize: 9, textColor: '#37424a' },
                margin: { top: 50 },
                columns: _cols,
                body: testData,
                didDrawPage: function (data) {
                    doc.setFontSize(11);
                    doc.text("AccuSoft", pageWidth - 130, 30);
                    doc.setFontSize(9);
                    doc.text(_title, pageWidth - 100, 43);
                    // doc.addImage(appLogo, 'png', data.settings.margin.left, 22, 70, 23);
                    doc.addImage(appLogo, 'png', data.settings.margin.left, 22, 70, 23);
                }
            });
        doc.output('dataurlnewwindow', { filename: _title + '.pdf' });
    }

}