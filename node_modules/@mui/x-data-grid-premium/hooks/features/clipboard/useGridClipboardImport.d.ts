import * as React from 'react';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';
import type { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
export declare const useGridClipboardImport: (apiRef: React.MutableRefObject<GridPrivateApiPremium>, props: Pick<DataGridPremiumProcessedProps, "pagination" | "paginationMode" | "processRowUpdate" | "onProcessRowUpdateError" | "getRowId" | "onClipboardPasteStart" | "onClipboardPasteEnd" | "splitClipboardPastedText" | "disableClipboardPaste" | "onBeforeClipboardPasteStart">) => void;
