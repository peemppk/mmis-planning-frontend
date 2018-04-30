import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';

@Component({
  selector: 'pm-search-generic',
  templateUrl: './search-generic.component.html',
  styles: []
})
export class SearchGenericComponent implements OnInit {

  _disabled: any;

  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  @Input('disabled')
  set setDisabled(value: any) {
    this._disabled = value;
  }

  token: any;
  query: any = null;
  searchGenericUrl: any;

  constructor(
    @Inject('API_URL') private apiUrl: string) {
    this.token = sessionStorage.getItem('token');
    this.setApiUrl();
  }

  ngOnInit() {
  }

  setApiUrl() {
    this.searchGenericUrl = `${this.apiUrl}/standard/search/generic/autocomplete?token=${this.token}`;
  }

  clearGenericSearch() {
    this.query = null;
  }

  clearSelected(event: any) {
    if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
      this.onChange.emit(false);
    } else {
      this.onChange.emit(true);
    }
  }

  handleResultSelected(event: any) {
    this.onSelect.emit(event);
    this.query = event.generic_name;
  }

  setSearchGeneric(event: any) {
    this.query = event;
  }

}
