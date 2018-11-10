import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})

export class ArrayFilterPipe implements PipeTransform {
  public transform(array: any[], searchText?: string, keyName?: string) {
    // array is array of objects.
    // searchText is the text to search
    // keyName is the key in object to search. might not be specified, and then you have to search all
    if (!array || !searchText || !Array.isArray(array)) {
      return array;
    }
    if (typeof array[0] === 'string') {
      return array.filter(item => item.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    }
    if (!keyName) {
      return array.filter((item: any) => {
        for (const key in item) {
          if (typeof item[key] !== 'object' && item[key].toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            return true;
          }
        }
        return false;
      });
    } else {
      return array.filter((item: any) => {
          if (typeof item[keyName] !== 'object' && item[keyName].toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            return true;
          }
        return false;
      });
    }

  }

}




