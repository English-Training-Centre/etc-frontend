import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, GridApi, GridOptions, GridReadyEvent, ModuleRegistry, RowSelectionOptions } from 'ag-grid-community';
import { FloatLabel } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';

ModuleRegistry.registerModules([ AllCommunityModule ]);

@Component({
  selector: 'app-financial-student-financial-statement',
  imports: [FloatLabel, FormsModule, AgGridAngular, InputIcon, IconField, ReactiveFormsModule, InputTextModule],
  templateUrl: './financial-student-financial-statement.html',
  styleUrl: './financial-student-financial-statement.scss',
})
export class FinancialStudentFinancialStatement implements OnInit, OnDestroy {
  private subs = new Subscription();

  protected tableLoading: boolean = false;

  searchInput: string = '';
  columnDefs: ColDef[] = [];
  rowData: any[] = [];
  filteredData: any[] = [];

  headerHeight = 50;
  rowHeight = 50;

  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "singleRow",
    checkboxes: false,
    enableClickSelection: true
  };

  gridOptions: GridOptions = {
    defaultColDef: {
      autoHeight: false,
      suppressMovable: true, // can't move
      editable: false,
      sortable: true,
      unSortIcon: false,
      filter: false,
      resizable: false,
      headerClass: 'ag_header'
    }
  };
  gridApi!: GridApi;

  ngOnInit(): void {
    //this.loadingCards();
    this.tableData();

    /*
    this.subs.add(
      this.translateService.onLangChange.subscribe(() => {
        this.tableData();
      })
    );

    this.subs.add(
      this.hubNotif.receiveNotifs().subscribe(() => {
        this.loadingCards();
        this.refreshLoadingTable();
      })
    );
    */
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe() }
  }

  tableData() {
    this.gridOptions.overlayNoRowsTemplate = `<span style="padding: 10px; color: red;">Sem registos...</span>`;

    this.columnDefs =
    [
      {
        headerName: 'Ações',
        minWidth: 120,
        flex: 1,
        cellClass: 'ag_cell_center',
        cellRendererSelector: (params: any) => {
          if (params.node.rowPinned === 'bottom') {
            return {
              component: null,
              params: null
            };
          }

          return {
            //component: BtnTableIngredient,
            params: { ...params }
          };
        }
      },
      {
        headerName: '#',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellClass: 'ag_cell_row_index',
        cellRenderer: (params: any) => {
          return params.node.rowPinned === 'bottom' ? '' : params.value || '';
        },
      },
      {
        headerName: 'Data',
        field: 'itemName', minWidth: 200, flex: 1,
        cellClass: 'ag_cell_start',
      },
      {
        headerName: "Descrição",
        field: 'batchNumber', minWidth: 120, flex: 1,
        cellClass: 'ag_cell_center',
        cellRenderer: (params: any) => {
          return params.node.rowPinned === 'bottom' ? '' : params.value || '';
        },
      },
      {
        headerName: 'Tipo',
        field: 'packageSize', minWidth: 100, flex: 1,
        cellClass: 'ag_cell_center',
        cellRenderer: (params: any) => {
          //return FormatQty(params.value);
        }
      },
      {
        headerName: 'Método',
        field: 'unitOfMeasure', minWidth: 100, flex: 1,
        cellClass: 'ag_cell_center',
        cellRenderer: (params: any) => {
          return params.node.rowPinned === 'bottom' ? '' : params.value || '';
        },
      },
      {
        headerName: 'Valor',
        field: 'quantity', minWidth: 100, flex: 1,
        cellClass: 'ag_cell_center',
        cellRenderer: (params: any) => {
          //return FormatQty(params.value);
        }
      },
      {
        headerName: 'Status',
        field: 'expirationStatus',
        minWidth: 150,
        flex: 1,
        cellClass: 'ag_cell_center',
        /*
        cellRenderer: (params: any) => {
          const map: any = {
            "Valid":  { label: this.translateService.instant('TABLE_HEADER.EXPIRY_STATUS.OPTIONS.VALID'),   color: "status_green" },
            "Near Expiry": { label: this.translateService.instant('TABLE_HEADER.EXPIRY_STATUS.OPTIONS.NEAR_EXPIRY'), color: "status_orange" },
            "Expired": { label: this.translateService.instant('TABLE_HEADER.EXPIRY_STATUS.OPTIONS.EXPIRED'), color: "status_red" }
          };

          if (!params.value || !map[params.value]) {
            return '';
          }

          const state = map[params.value];

          return `
            <span class="px-2 py-1 rounded-[7px] text-[12pt] font-normal border-1 ${state.color}">
              ${state.label}
            </span>
          `;
        }
        */
      }
    ];

    //this.loadingTable();
  }

  onSearch()
  {
    const searchLower = this.searchInput.toLowerCase();

    if (!searchLower) {
      this.filteredData = this.rowData;
    } else {
      this.filteredData = this.rowData.filter(item =>
        Object.values(item).some(val => val?.toString().toLowerCase().includes(searchLower))
      );
    }

    // Update grid with filtered data
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.filteredData);
      this.gridApi.refreshClientSideRowModel();
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.updateTotals();
    // Recalculate totals on any change that affects visible data
    this.gridApi.addEventListener('cellValueChanged', () => this.updateTotals());
    this.gridApi.addEventListener('filterChanged', () => this.updateTotals());
    this.gridApi.addEventListener('sortChanged', () => this.updateTotals());
    this.gridApi.addEventListener('rowDataUpdated', () => this.updateTotals());
  }

  updateTotals() {
    const totals: any = {
      itemName: 'Totals' + ':',
      quantity: 0,
      unitCostPrice: 0,
      totalCostPrice: 0
    };

    this.gridApi.forEachNodeAfterFilter(node => {
      if (node.data) {
        totals.quantity       += Number(node.data.quantity || 0);
        totals.unitCostPrice  += Number(node.data.unitCostPrice || 0);
        totals.totalCostPrice += Number(node.data.totalCostPrice || 0);
      }
    });

    // this single line creates the perfect totals row
    this.gridApi.setGridOption('pinnedBottomRowData', [totals]);
  }

  /*
  private loadingData(): void
  {
    this.tableLoading = true;

    this.subs.add(
      this.cashRegstService.getAll().subscribe((data: any) => {
        this.tableLoading = false;
        this.rowData = data;
        this.applyPagination();
        this.cdr.detectChanges();
      })
    );
  }

  private refreshLoadingTable(): void
  {
    this.subs.add(
      this.cashRegstService.getAll().subscribe((data: any) => {
        this.rowData = data;
        this.applyPagination();
        this.cdr.detectChanges();
      })
    );
  }

  private loadingCards(): void
  {
    this.subs.add(
      this.cashRegstService.getCards().subscribe(value => {
        setTimeout(() => {
          this.countUpRep.onCountUp('countUp-Amount', this.countUpAmount_InitialBalance, value.initialBalance);
          this.countUpRep.onCountUp('countUp-Amount', this.countUpAmount_TotalRevenue, value.totalRevenue);
          this.countUpRep.onCountUp('countUp-Amount', this.countUpAmount_TotalExpense, value.totalExpense);
          this.countUpRep.onCountUp('countUp-Amount', this.countUpAmount_TotalProfit, value.totalProfit);
        }, 300)
      })
    );
  }
  */
}
