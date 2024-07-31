import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid-pro/internals';
import { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';
export declare const cellSelectionStateInitializer: GridStateInitializer<Pick<DataGridPremiumProcessedProps, 'cellSelectionModel' | 'initialState'>>;
export declare const useGridCellSelection: (apiRef: React.MutableRefObject<GridPrivateApiPremium>, props: Pick<DataGridPremiumProcessedProps, "cellSelection" | "cellSelectionModel" | "onCellSelectionModelChange" | "pagination" | "paginationMode" | "ignoreValueFormatterDuringExport" | "clipboardCopyCellDelimiter" | "columnHeaderHeight">) => void;
