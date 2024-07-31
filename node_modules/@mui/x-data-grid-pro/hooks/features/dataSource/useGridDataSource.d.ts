import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const dataSourceStateInitializer: GridStateInitializer;
export declare const useGridDataSource: (apiRef: React.MutableRefObject<GridPrivateApiPro>, props: Pick<DataGridProProcessedProps, "unstable_dataSource" | "unstable_dataSourceCache" | "unstable_onDataSourceError" | "sortingMode" | "filterMode" | "paginationMode" | "treeData">) => void;
