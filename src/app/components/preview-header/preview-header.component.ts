import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
@Component({
  selector: 'preview-header',
  templateUrl: './preview-header.component.html',
  styleUrls: ['./preview-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewHeaderComponent {
  @Output() playCollection: EventEmitter<{ shuffle: boolean }> = new EventEmitter();
  public duration = 0;
  private internalCollection: any = null;

  @Input()
  get collection(): any {
    return this.internalCollection;
  }
  set collection(val: any) {
    this.internalCollection = val;
    if (this.internalCollection) {
      for (const song of this.internalCollection.relationships.tracks.data) {
        if (song.attributes.durationInMillis) {
          this.duration += song.attributes.durationInMillis;
        }
      }
      this.cd.markForCheck();
    }
  }
  constructor(private cd: ChangeDetectorRef) {}
  formatDuraction(val: number): string {
    const { hours, minutes } = (window as any).MusicKit.formattedMilliseconds(
      val
    );
    const hourTime = hours === 0 ? `` : `${hours} hours, `;
    const minutesTime = `${minutes} minutes`;
    return `${hourTime} ${minutesTime} `;
  }
  togglePlay(shuffle = false): void {
    this.playCollection.emit({ shuffle });
  }
}
