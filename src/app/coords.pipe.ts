import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coords'
})
export class CoordsPipe implements PipeTransform {

  transform(arr: [][]): string {
    let result = arr.join("; ");
    return result;
  }

}
