import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-notification',
  styleUrl: './notification.scss',
  templateUrl: './notification.html',
})
export class Notification123 {

  demoNotifications = [
    'Order shipped', 'New comment', 'Password changed',
    'New follower', 'Payment received', 'Task completed',
    'Meeting reminder', 'File uploaded', 'Comment reply',
    'New message', 'Backup complete', 'Storage warning'
  ];

  @ViewChild('container',{ static: true}) container!: ElementRef<HTMLDivElement>;

  renderer = inject(Renderer2);

  private notificationQueue: string[] = this.demoNotifications;
  private currentBatch = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  private readonly batchSize = 5;
  private readonly intervalDuration = 5000; // 5 second

  ngOnInit() {
    this.showNotification(this.notificationQueue);
  }

  showNotification(messages: string[]) {
    const allnotifications = messages;
    this.currentBatch = 0;
    this.renderBatch();

    if(this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.intervalId = setInterval(() => {
      this.currentBatch++;
      if(this.currentBatch * this.batchSize >= allnotifications.length) {
        clearInterval(this.intervalId!);
        this.renderBatch();
        return;
      }
      this.renderBatch();
    }, this.intervalDuration);
  }

  renderBatch(){
    const containerElement = this.container.nativeElement;
    const start = this.currentBatch * this.batchSize;
    const batch = this.notificationQueue.slice(start, start + this.batchSize);

    Array.from(containerElement.children).forEach(el => {
      this.renderer.removeClass(el, 'visible');
    });

    setTimeout(() =>{
      this.clearContainer(containerElement);

      batch.forEach((item,i) => {
        const div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'notification');
        let text = this.renderer.createText(item);
        this.renderer.appendChild(div, text);
        this.renderer.appendChild(containerElement, div);

        setTimeout(() => {
          this.renderer.addClass(div, 'visible');
        }, 20 + i * 40);
      });

      if(batch.length == 0 && this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }, 500);
  }

   // Renderer2 equivalent of container.innerHTML = ''
  private clearContainer(container: HTMLElement): void {
    let child = container.firstChild;
    while (child) {
      this.renderer.removeChild(container, child);
      child = container.firstChild;
    }
  }

  ngOnDestroy() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
