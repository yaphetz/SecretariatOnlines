import { GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';

export class InputModel implements GridsterItem {
  [propName: string]: any;
  x: number;
  y: number;
  rows: number;
  cols: number;
  layerIndex?: number;
  initCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
  dragEnabled?: boolean;
  resizeEnabled?: boolean;
  compactEnabled?: boolean;
  maxItemRows?: number;
  minItemRows?: number;
  maxItemCols?: number;
  minItemCols?: number;
  minItemArea?: number;
  maxItemArea?: number;
  // custom config
  inputLabel?: string;
}
