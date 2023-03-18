/**
 * Utils
 */

import * as _ from "lodash";
export class Utils {
  public hasDuplicates(array: string[]): boolean {
    return new Set(array).size !== array.length;
  }
}
