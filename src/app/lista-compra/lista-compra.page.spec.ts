import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCompraPage } from './lista-compra.page';

describe('ListaCompraPage', () => {
  let component: ListaCompraPage;
  let fixture: ComponentFixture<ListaCompraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
