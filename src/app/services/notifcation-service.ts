import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class NotificationService {

    private  queue$ = new BehaviorSubject<string>('');
    notifications$ = this.queue$.asObservable();

    pushNotification(message: string) {
        this.queue$.next(message);
    }
}
