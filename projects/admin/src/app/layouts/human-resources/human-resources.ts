import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { DialogCreateRepository } from '../../../../../core/src/lib/repositories/dialog-create-repository';

@Component({
  selector: 'app-human-resources',
  imports: [Ripple, AvatarModule],
  templateUrl: './human-resources.html',
  styleUrl: './human-resources.scss',
})
export class HumanResources {
  private readonly dialogCreateRep = inject(DialogCreateRepository);

  protected onDialogCreate(): void
  {
    const payload = {
      format: 'human_resources-create',
      isVisible: true
    }
    this.dialogCreateRep.send(payload);
  }
}
