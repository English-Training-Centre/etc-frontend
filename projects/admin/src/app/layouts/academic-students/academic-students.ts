import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, GridApi, GridOptions, GridReadyEvent, ModuleRegistry, RowSelectionOptions } from 'ag-grid-community';
import { FloatLabel } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';

ModuleRegistry.registerModules([ AllCommunityModule ]);

@Component({
  selector: 'app-academic-students',
  imports: [FloatLabel, FormsModule, AgGridAngular, InputIcon, IconField, ReactiveFormsModule, InputTextModule, SelectButtonModule],
  templateUrl: './academic-students.html',
  styleUrl: './academic-students.scss',
})
export class AcademicStudents implements OnInit, OnDestroy {
  private subs = new Subscription();

  protected modalityOptions: any[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Online', value: 'online' },
    { label: 'Presencial', value: 'in-person' }
  ];
  protected modalityValue: string = 'all';

  protected statusOptions: any[] = [
    { label: 'Activos', value: 'active' },
    { label: 'Suspensos', value: 'suspended' },
    { label: 'Desistentes', value: 'withdrawn' },
    { label: 'Concluídos', value: 'completed' }
  ];
  protected statusValue: string = 'active';

  protected tableLoading: boolean = false;

  protected searchInput: string = '';
  protected columnDefs: ColDef[] = [];
  protected rowData: any[] = [];
  protected filteredData: any[] = [];
  protected pageData: any[] = [];
  protected currentPage: number = 1;
  protected totalPages: number = 1;
  protected startIndex: number = 0;
  protected endIndex: number = 0;

  protected pageSize: number = 10;
  protected headerHeight = 50;
  protected rowHeight = 50;
  protected showTotalPag: number = 0;

  protected rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "singleRow",
    checkboxes: false,
    enableClickSelection: true
  };

  protected gridOptions: GridOptions = {
    defaultColDef: {
      suppressMovable: true, // can't move
      editable: false,
      sortable: true,
      unSortIcon: false,
      filter: false,
      resizable: false,
      headerClass: 'ag_header'
    }
  };
  protected gridApi!: GridApi;

   // Total Cards
  @ViewChild ('countUpAmount_InitialBalance') countUpAmount_InitialBalance!: ElementRef;
  @ViewChild ('countUpAmount_TotalRevenue') countUpAmount_TotalRevenue!: ElementRef;
  @ViewChild ('countUpAmount_TotalExpense') countUpAmount_TotalExpense!: ElementRef;
  @ViewChild ('countUpAmount_TotalProfit') countUpAmount_TotalProfit!: ElementRef;

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
        minWidth: 80,
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
            //component: BtnTableRegister,
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
        headerName: 'Nome Completo',
        field: 'operator', minWidth: 150, flex: 1,
        cellClass: 'ag_cell_start',
        cellRenderer: (params: any) => {
          return params.node.rowPinned === 'bottom' ? '' : params.value || '';
        },
      },
      {
        headerName: 'Idade',
        field: 'operator', minWidth: 150, flex: 1,
        cellClass: 'ag_cell_start'
      },
      {
        headerName: 'Modalidade',
        field: 'operator', minWidth: 150, flex: 1,
        cellClass: 'ag_cell_start'
      },
      {
        headerName: 'Pacote',
        field: 'operator', minWidth: 150, flex: 1,
        cellClass: 'ag_cell_start'
      },
      {
        headerName: 'Nível',
        field: 'operator', minWidth: 150, flex: 1,
        cellClass: 'ag_cell_start'
      },
      {
        headerName: 'Horário',
        field: 'operator', minWidth: 150, flex: 1,
        cellClass: 'ag_cell_start'
      },
      {
        headerName: 'Status',
        field: 'status',
        minWidth: 100,
        flex: 1,
        cellClass: 'ag_cell_center'
      }
    ];

    //this.loadingData();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onSearch()
  {
    const searchLower = this.searchInput.toLowerCase();
    this.filteredData = this.rowData.filter(item =>
      Object.values(item).some(val => val?.toString().toLowerCase().includes(searchLower))
    );

    this.currentPage = 1;
    this.applyPagination();
  }

  applyPagination()
  {
    //const dataToPaginate = this.rowData;
    const dataToPaginate = this.searchInput ? this.filteredData : this.rowData;
    this.totalPages = Math.ceil(dataToPaginate.length / this.pageSize);
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = Math.min(this.startIndex + this.pageSize, dataToPaginate.length);
    this.pageData = dataToPaginate.slice(this.startIndex, this.endIndex);
    this.showTotalPag = dataToPaginate.length;
  }

  gotToPrevious()
  {
    if (this.currentPage > 1)
    {
      this.currentPage--;
      this.applyPagination();
    }
  }

  goToNext()
  {
    if (this.currentPage < this.totalPages)
    {
      this.currentPage++;
      this.applyPagination();
    }
  }

  goToStart() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.applyPagination();
    }
  }

  goToEnd() {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.applyPagination();
    }
  }

  goToPage(page: number | string) {
    if (typeof page === 'number') {
      this.currentPage = page;
    } else {
      if (page === '...') {
        return; // Não faz nada quando clicar nas reticências.
      }
    }
    this.applyPagination();
  }

  isNumber(value: number | string): value is number {
    return typeof value === 'number';
  }

  get totalPagesArray(): (number | string)[] {
    const maxVisiblePages = 5;
    const pages = [];

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }

    return pages;
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
