import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  transform(values: number[]|string[]|object[], key?: string, reverse?: boolean) {
    if (!Array.isArray(values) || values.length <= 0) {
      return null;
    }
    return this.sort(values, key, reverse);
  }

  private sort(value: any[], key?: any, reverse?: boolean): any[] {
    const isInside = key && key.indexOf('.') !== -1;

    const array: any[] = value.sort((a: any, b: any): number => {
      if (!key) {
        return a > b ? 1 : -1;
      }

      if (key === 'amount') {
        return a[key] - b[key]; // compare numbers ;)
      } else {
        return a[key] > b[key] ? 1 : -1;
      }
    });

    if (reverse) {
      return array.reverse();
    }
    return array;
  }
}
