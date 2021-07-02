import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {DataList} from "./dataList/dataList.component";
import {DataForm} from "./dataForm/dataForm.component";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled;
  let nameInput;
  let genreInput;
  let creatorInput;
  let bookTypeInput;
  let songTypeInput;
  let timeInput;
  let addButtonInput;
  let bookTable;
  let songTable;

  const getByTestId = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`[data-test-id="${id}"]`);
  };

  const getById = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`#${id}`);
  };

  const pushValueToInput = async (input, value) => {
    input.value = value;
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DataList,
        DataForm
      ],
      imports: [
        FormsModule
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(AppComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
    nameInput = getByTestId('app-input-name');
    genreInput = getByTestId('app-input-genre');
    creatorInput = getByTestId('app-input-creator');
    timeInput = getByTestId('app-input-time');
    bookTypeInput = getByTestId('app-input-book-type');
    songTypeInput = getByTestId('app-input-song-type');
    addButtonInput = getByTestId('add-button');
    bookTable = getByTestId('book-table');
    songTable = getByTestId('song-table');
  });

  it('Initial UI is rendered as expected', async() => {
      await fixture.whenStable();
      expect(nameInput.value).toBeFalsy();
      expect(genreInput.value).toBeFalsy();
      expect(creatorInput.value).toBeFalsy();
      expect(bookTypeInput.value).toBe('Book');
      expect(songTypeInput.value).toBe('Song');
      expect(timeInput).toBeFalsy();
      let bookListItem = getById('list-item-0', bookTable);
      expect(bookListItem).toBeFalsy();
      let songListItem = getById('list-item-0', songTable);
      expect(songListItem).toBeFalsy();
  });

  it('Clicking on Song type should render time input', async() => {
      await fixture.whenStable();
      expect(nameInput.value).toBeFalsy();
      expect(genreInput.value).toBeFalsy();
      expect(creatorInput.value).toBeFalsy();
      expect(bookTypeInput.value).toBe('Book');
      expect(songTypeInput.value).toBe('Song');
      expect(timeInput).toBeFalsy();

      songTypeInput.click();
      fixture.detectChanges();
      await fixture.whenStable();

      timeInput = getByTestId('app-input-time');
      expect(timeInput).toBeTruthy();
      expect(timeInput.value).toBeFalsy();
      bookTable = getByTestId('book-table');
      songTable = getByTestId('song-table');
  });

  it('Clicking on type Book and Add button should add the item to the Book list', async() => {
    pushValueToInput(nameInput, 'Belief');
    pushValueToInput(genreInput, 'Fiction');
    pushValueToInput(creatorInput, 'John M');
    bookTypeInput.click();
    fixture.detectChanges();
    await fixture.whenStable();

    addButtonInput.click();
    fixture.detectChanges();
    await fixture.whenStable();

    bookTable = getByTestId('book-table');
    let bookListItem = getById('list-item-0', bookTable);
    expect(getByTestId('item-name', bookListItem).innerHTML).toEqual('Belief');
    expect(getByTestId('item-genre', bookListItem).innerHTML).toEqual('Fiction');
    expect(getByTestId('item-creator', bookListItem).innerHTML).toEqual('John M');
  });

  it('Clicking on type Song and Add button should add the item to the Song list', async() => {
    pushValueToInput(nameInput, 'Rock On');
    pushValueToInput(genreInput, 'Rock');
    pushValueToInput(creatorInput, 'Jay');
    songTypeInput.click();
    fixture.detectChanges();
    await fixture.whenStable();

    timeInput = getByTestId('app-input-time');
    pushValueToInput(timeInput, 10);
    addButtonInput.click();

    fixture.detectChanges();
    await fixture.whenStable();

    songTable = getByTestId('song-table');
    let songListItem = getById('list-item-0', songTable);
    expect(getByTestId('item-name', songListItem).innerHTML).toEqual('Rock On');
    expect(getByTestId('item-genre', songListItem).innerHTML).toEqual('Rock');
    expect(getByTestId('item-creator', songListItem).innerHTML).toEqual('Jay');
    expect(getByTestId('item-time', songListItem).innerHTML).toEqual('10');
  });

  it('Clicking on type Song and Add button should clear the input fields', async() => {
    pushValueToInput(nameInput, 'Rock On');
    pushValueToInput(genreInput, 'Rock');
    pushValueToInput(creatorInput, 'Jay');
    songTypeInput.click();
    fixture.detectChanges();
    await fixture.whenStable();

    timeInput = getByTestId('app-input-time');
    pushValueToInput(timeInput, 10);
    addButtonInput.click();

    fixture.detectChanges();
    await fixture.whenStable();

    nameInput = getByTestId('app-input-name');
    genreInput = getByTestId('app-input-genre');
    creatorInput = getByTestId('app-input-creator');
    timeInput = getByTestId('app-input-time');

    expect(nameInput.value).toBeFalsy();
    expect(genreInput.value).toBeFalsy();
    expect(creatorInput.value).toBeFalsy();
    expect(timeInput).toBeFalsy();
  });

  it('Perform a series of operations including delete', async() => {
    pushValueToInput(nameInput, 'Rock On');
    pushValueToInput(genreInput, 'Rock');
    pushValueToInput(creatorInput, 'Jay');
    songTypeInput.click();
    fixture.detectChanges();
    await fixture.whenStable();

    timeInput = getByTestId('app-input-time');
    pushValueToInput(timeInput, 10);
    addButtonInput.click();

    fixture.detectChanges();
    await fixture.whenStable();

    pushValueToInput(nameInput, 'Little Things');
    pushValueToInput(genreInput, 'Disco');
    pushValueToInput(creatorInput, 'Nick');
    songTypeInput.click();
    fixture.detectChanges();
    await fixture.whenStable();

    timeInput = getByTestId('app-input-time');
    pushValueToInput(timeInput, 100);
    addButtonInput.click();

    fixture.detectChanges();
    await fixture.whenStable();

    pushValueToInput(nameInput, 'Belief');
    pushValueToInput(genreInput, 'Fiction');
    pushValueToInput(creatorInput, 'John M');
    bookTypeInput.click();

    fixture.detectChanges();
    await fixture.whenStable();

    addButtonInput.click();
    fixture.detectChanges();
    await fixture.whenStable();

    pushValueToInput(nameInput, 'Crisis');
    pushValueToInput(genreInput, 'Thriller');
    pushValueToInput(creatorInput, 'David');
    bookTypeInput.click();
    fixture.detectChanges();
    await fixture.whenStable();

    addButtonInput.click();
    fixture.detectChanges();
    await fixture.whenStable();

    songTable = getByTestId('song-table');
    let songListItem0 = getById('list-item-0', songTable);
    expect(getByTestId('item-name', songListItem0).innerHTML).toEqual('Rock On');
    expect(getByTestId('item-genre', songListItem0).innerHTML).toEqual('Rock');
    expect(getByTestId('item-creator', songListItem0).innerHTML).toEqual('Jay');
    expect(getByTestId('item-time', songListItem0).innerHTML).toEqual('10');

    let songListItem1 = getById('list-item-1', songTable);
    expect(getByTestId('item-name', songListItem1).innerHTML).toEqual('Little Things');
    expect(getByTestId('item-genre', songListItem1).innerHTML).toEqual('Disco');
    expect(getByTestId('item-creator', songListItem1).innerHTML).toEqual('Nick');
    expect(getByTestId('item-time', songListItem1).innerHTML).toEqual('100');

    getByTestId('item-delete', songListItem0).click();
    fixture.detectChanges();
    await fixture.whenStable();

    songListItem0 = getById('list-item-0', songTable);
    expect(getByTestId('item-name', songListItem0).innerHTML).toEqual('Little Things');
    expect(getByTestId('item-genre', songListItem0).innerHTML).toEqual('Disco');
    expect(getByTestId('item-creator', songListItem0).innerHTML).toEqual('Nick');
    expect(getByTestId('item-time', songListItem0).innerHTML).toEqual('100');

    bookTable = getByTestId('book-table');
    let bookListItem0 = getById('list-item-0', bookTable);
    expect(getByTestId('item-name', bookListItem0).innerHTML).toEqual('Belief');
    expect(getByTestId('item-genre', bookListItem0).innerHTML).toEqual('Fiction');
    expect(getByTestId('item-creator', bookListItem0).innerHTML).toEqual('John M');

    let bookListItem1 = getById('list-item-1', bookTable);
    expect(getByTestId('item-name', bookListItem1).innerHTML).toEqual('Crisis');
    expect(getByTestId('item-genre', bookListItem1).innerHTML).toEqual('Thriller');
    expect(getByTestId('item-creator', bookListItem1).innerHTML).toEqual('David');

    getByTestId('item-delete', bookListItem0).click();
    fixture.detectChanges();
    await fixture.whenStable();

    bookListItem0 = getById('list-item-0', bookTable);
    expect(getByTestId('item-name', bookListItem0).innerHTML).toEqual('Crisis');
    expect(getByTestId('item-genre', bookListItem0).innerHTML).toEqual('Thriller');
    expect(getByTestId('item-creator', bookListItem0).innerHTML).toEqual('David');
  });
});
