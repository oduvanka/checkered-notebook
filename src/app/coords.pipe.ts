import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coords',
  pure: false
})
export class CoordsPipe implements PipeTransform {

  transform(arr: [][]): string {
    let result = "";
    const lengthArr = arr.length;
    if (lengthArr <= 3) result = arr.join("; ");
    else {
      result = arr[0] + "; ... " + arr[lengthArr-1] + "; ";
    }
    
    return result;
  }

}
