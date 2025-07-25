import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  value = signal<string>('');
  placeholder = input.required<string>();

  valueToSearch = output<string>();

  onSearch() {
    if ( !this.value() ) return;
    this.valueToSearch.emit(this.value());
    this.resetFields();
  }

  resetFields() {
    this.value.set('');
  }
}
