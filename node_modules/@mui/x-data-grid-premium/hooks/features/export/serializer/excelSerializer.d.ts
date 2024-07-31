import type * as Excel from 'exceljs';
import { GridRowId, GridColDef } from '@mui/x-data-grid-pro';
import { GridStateColDef, GridColumnGroupLookup } from '@mui/x-data-grid/internals';
import { ColumnsStylesInterface, GridExcelExportOptions } from '../gridExcelExportInterface';
import { GridPrivateApiPremium } from '../../../../models/gridApiPremium';
interface SerializedRow {
    row: Record<string, undefined | number | boolean | string | Date>;
    dataValidation: Record<string, Excel.DataValidation>;
    outlineLevel: number;
    mergedCells: {
        leftIndex: number;
        rightIndex: number;
    }[];
}
/**
 * FIXME: This function mutates the colspan info, but colspan info assumes that the columns
 * passed to it are always consistent. In this case, the exported columns may differ from the
 * actual rendered columns.
 * The caller of this function MUST call `resetColSpan()` before and after usage.
 */
export declare const serializeRowUnsafe: (id: GridRowId, columns: GridStateColDef[], apiRef: React.MutableRefObject<GridPrivateApiPremium>, defaultValueOptionsFormulae: {
    [field: string]: {
        address: string;
    };
}, options: Pick<BuildExcelOptions, "escapeFormulas">) => SerializedRow;
export declare const serializeColumn: (column: GridColDef, columnsStyles: ColumnsStylesInterface) => {
    key: string;
    headerText: string;
    width: number;
    style: {
        numFmt?: string | undefined;
        font?: Partial<Excel.Font> | undefined;
        alignment?: Partial<Excel.Alignment> | undefined;
        protection?: Partial<Excel.Protection> | undefined;
        border?: Partial<Excel.Borders> | undefined;
        fill?: Excel.Fill | undefined;
    };
};
type SerializedColumns = Array<{
    key: string;
    width: number;
    style: Partial<Excel.Style>;
    headerText: string;
}>;
export declare function serializeColumns(columns: GridStateColDef[], styles: ColumnsStylesInterface): SerializedColumns;
type ValueOptionsData = Record<string, {
    values: (string | number)[];
    address: string;
}>;
export declare function getDataForValueOptionsSheet(columns: GridStateColDef[], valueOptionsSheetName: string, api: GridPrivateApiPremium): Promise<ValueOptionsData>;
interface BuildExcelOptions extends Pick<GridExcelExportOptions, 'exceljsPreProcess' | 'exceljsPostProcess'>, Pick<Required<GridExcelExportOptions>, 'valueOptionsSheetName' | 'includeHeaders' | 'includeColumnGroupsHeaders' | 'escapeFormulas'> {
    columns: GridStateColDef[];
    rowIds: GridRowId[];
    columnsStyles?: ColumnsStylesInterface;
}
export declare function buildExcel(options: BuildExcelOptions, apiRef: React.MutableRefObject<GridPrivateApiPremium>): Promise<Excel.Workbook>;
export interface ExcelExportInitEvent {
    serializedColumns: SerializedColumns;
    serializedRows: SerializedRow[];
    valueOptionsSheetName: string;
    columnGroupPaths: Record<string, string[]>;
    columnGroupDetails: GridColumnGroupLookup;
    valueOptionsData: ValueOptionsData;
    options: Omit<GridExcelExportOptions, 'exceljsPreProcess' | 'exceljsPostProcess' | 'columnsStyles' | 'valueOptionsSheetName'>;
}
export declare function setupExcelExportWebWorker(workerOptions?: Pick<GridExcelExportOptions, 'exceljsPostProcess' | 'exceljsPreProcess'>): void;
export {};
