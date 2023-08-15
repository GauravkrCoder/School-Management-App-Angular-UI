import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { RolesDefined } from 'src/app/shared/statics/roles-constants';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  public _rolesDefined: string[] = [];
  public leftNavMenuObj: any = {
    moduleName: 'Wires',
    moduleSubHeaders: [
      {
        display: false,
        moduleSubHead: 'Dashboard',
        requiredRole: [RolesDefined.viewAll],
        moduleLinks: [
          { display: false, requiredRole: [RolesDefined.viewAll], linkTitle: 'Home', targetURL: '/home' },
          { display: false, requiredRole: [RolesDefined.viewAll], linkTitle: 'User', targetURL: '/dashboard' }
        ]
      },
      {
        display: false,
        moduleSubHead: 'Admin',
        requiredRole: [RolesDefined.viewAll, RolesDefined.manageAdmin],
        moduleLinks: [
          { display: false, requiredRole: [RolesDefined.viewAll, RolesDefined.manageAdmin], linkTitle: 'Project', targetURL: '/project' },
          // { display: false, requiredRole: [RolesDefined.viewAll, RolesDefined.manageAdmin], linkTitle: 'General List', targetURL: '/general-list' },
          // { display: false, requiredRole: [RolesDefined.viewAll, RolesDefined.manageAdmin], linkTitle: 'Change', targetURL: '/change' }
        ]
      },
      {
        display: false,
        moduleSubHead: 'View Request',
        requiredRole: [RolesDefined.viewAll, RolesDefined.viewRequest],
        moduleLinks: [
          { display: false, requiredRole: [RolesDefined.viewAll, RolesDefined.viewRequest], linkTitle: 'View', targetURL: '/view-details' }
        ]
      },
      {
        display: false,
        moduleSubHead: 'Request',
        requiredRole: [RolesDefined.viewAll, RolesDefined.manageRequest],
        moduleLinks: [
          { display: false, requiredRole: [RolesDefined.viewAll, RolesDefined.manageRequest], linkTitle: 'Add', targetURL: '/add' },
          { display: false, requiredRole: [RolesDefined.viewAll, RolesDefined.manageRequest], linkTitle: 'Approve Request', targetURL: '/approve' },
          { display: false, requiredRole: [RolesDefined.viewAll, RolesDefined.manageRequest], linkTitle: 'Cancel Request', targetURL: '/cancel' }
        ]
      },
    ]
  }

  constructor(
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getClientRoles();
  }

  getClientRoles() {
    const _clientRoles = this._sharedService.clientRoles;
    if (_clientRoles) {
      this._rolesDefined = this._sharedService.clientRoles;
      this.setMenuForDisplay(this._rolesDefined);
    }
  }

  setMenuForDisplay(_rolesDefined: string[]): void {
    this.leftNavMenuObj.moduleSubHeaders.forEach((menuItem: any) => {
      const shallRenderMenuItem = this.checkIfUserHasRequiredRole(menuItem.requiredRole);
      menuItem.display = (shallRenderMenuItem.length > 0);
      menuItem.moduleLinks.forEach((linkItem: any) => {
        const shallRenderLinkItem = this.checkIfUserHasRequiredRole(linkItem.requiredRole);
        linkItem.display = (shallRenderLinkItem.length > 0);
      });
    });
    this.leftNavMenuObj = Object.assign({}, this.leftNavMenuObj);
  }

  checkIfUserHasRequiredRole(itemArray) {
    return itemArray.filter(element => this._rolesDefined.indexOf(element) !== -1);
  }

}
