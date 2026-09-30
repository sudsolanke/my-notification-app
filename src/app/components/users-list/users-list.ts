import { Component, inject, Renderer2, signal, Signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { NotificationService } from '../../services/notifcation-service';
import { Notification123 } from '../notification/notification';
import { TooltipDirective } from '../../directives/tooltip-directive';

@Component({
  imports: [Notification123,TooltipDirective],
  selector: 'app-users-list',
  styleUrl: './users-list.scss',
  templateUrl: './users-list.html',
})
export class UsersList {
  users = signal<User[]>([]);

  userService = inject(UserService);
  notificationService = inject(NotificationService);
  renderer = inject(Renderer2);

  ngOnInit() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users.set(data);
    });
  }

  showNotification(){
    this.notificationService.pushNotification('This is a notification message!');
  }

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;

  const file = input.files?.[0];

  if (!file) {
    return;
  }

  if (file.type !== 'application/pdf') {
    alert('Only PDF files are allowed');
    input.value = '';
    return;
  }

  console.log('Valid PDF:', file);
}
}
