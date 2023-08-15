import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-count-down-timer',
  templateUrl: './count-down-timer.component.html',
  styleUrls: ['./count-down-timer.component.css']
})
export class CountDownTimerComponent implements OnInit {

  private subscription: Subscription;
  public dateNow = new Date();
  public dDay = new Date();

  public milliSecondsInSecond = 1000;
  public hoursInDay = 24;
  public miniutesInAnHour = 60;
  public secondsInMinute = 60;

  public timeDifference: number;
  public setSeconds;
  public setMinutes;
  public setHours;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _sharedService: SharedService
  ) {
    const _env = environment.returnParameters();
    if (_env.environment !== 'LCL') {
      const _authToken = sessionStorage.getItem('_isLoggedIn');
      let _decodedToken: any = jwt_decode(_authToken);
      const _currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const exp = _decodedToken.exp;
      const timeleft = exp - _currentTimeInSeconds;
      const fiveMinutesInMillis = timeleft * 1000;
      this.dDay.setTime(this.dDay.getTime() + fiveMinutesInMillis);
    }
    else if (_env.environment === 'LCL') {
      const _authToken = sessionStorage.getItem('_isLoggedIn');
      // let _decodedToken: any = jwt_decode(_authToken);
      // const _currentTimeInSeconds = Math.floor(Date.now() / 1000);
      // const exp = _decodedToken.exp;
      // const timeleft = exp - _currentTimeInSeconds;30
      const fiveMinutesInMillis = 50 * 100 * 1000;
      this.dDay.setTime(this.dDay.getTime() + fiveMinutesInMillis);
    }
  }

  ngOnInit() {
    this.subscription = interval(1000)
      .subscribe(x => {
        this.getTimeDifference();
      })
  }

  getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(_timeDifference) {
    const timeDifference = _timeDifference - 300000;   // setting  timeout five minutes before token expiry
    this.setSeconds = Math.floor((timeDifference) / (this.milliSecondsInSecond) % this.secondsInMinute);
    this.setMinutes = Math.floor((timeDifference) / (this.milliSecondsInSecond * this.miniutesInAnHour) % this.secondsInMinute);
    this.setHours = Math.floor((timeDifference) / (this.milliSecondsInSecond * this.miniutesInAnHour * this.secondsInMinute) % this.hoursInDay);

    if (Number(this.setHours) <= 0 && Number(this.setMinutes) <= 0 && Number(this.setSeconds) <= 0) {
      this._sharedService.publishSessionTimeout = true;
      this._router.navigate(['../session-timeout'], { relativeTo: this._activatedRoute });
    }
    else {
      this.setHours = this.setHours < 10 ? '0' + this.setHours : this.setHours;
      this.setMinutes = this.setMinutes < 10 ? '0' + this.setMinutes : this.setMinutes;
      this.setSeconds = this.setSeconds < 10 ? '0' + this.setSeconds : this.setSeconds;
    }

  }

}
