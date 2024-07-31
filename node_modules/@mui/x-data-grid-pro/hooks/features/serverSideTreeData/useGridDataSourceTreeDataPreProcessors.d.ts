import * as React from 'react';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
export declare const useGridDataSourceTreeDataPreProcessors: (privateApiRef: React.MutableRefObject<GridPrivateApiPro>, props: Pick<DataGridProProcessedProps, "treeData" | "groupingColDef" | "disableChildrenSorting" | "disableChildrenFiltering" | "defaultGroupingExpansionDepth" | "isGroupExpandedByDefault" | "unstable_dataSource">) => void;
