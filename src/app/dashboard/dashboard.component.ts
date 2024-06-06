import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/Services/professor.service';
import { ReportService } from 'src/Services/report.service';
import { StudentService } from 'src/Services/student.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { ReportType } from 'src/Enums/ReportType';
import { FieldOfStudy } from 'src/Enums/FieldOfStudy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nbStudents: number = 0;
  nbProfessors: number = 0;
  nbReports: number = 0;
  studentsList: any[] = [];
  yearsList: any[] = [];
  reportCounts: { [year: number]: number } = {};
  nbreOfReports: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  reportsByStudents: { [nbReports: number]: number } = {};
  reportTypes = Object.values(ReportType);
  reportsByType: number[] = [];
  fieldOfStudy = Object.values(FieldOfStudy);
  studentsInField: number[] = [];
  currentYear = new Date().getFullYear();
  startYear = this.currentYear - 5;

  constructor(
    private RS: ReportService,
    private SS: StudentService,
    private PS: ProfessorService
  ) {}

  //distribution of students and professors
  chartpieLabels1: string[] = [];
  chartpieOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribution of Students and Professors',
      },
    },
  };
  chartpieData1: ChartDataset[] = [];
  //distribution of reports per year
  chartLabels: string[] = [];
  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Reports per Year',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Reports',
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#333',

          stepSize: 1,
          callback: function (value) {
            return Number(value).toFixed(0); // Ensure ticks are integers
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },

    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
  };
  chartData: ChartDataset<'line'>[] = [];
  //distribution of reports per student
  chartLabels2: string[] = [];
  chartOptions2: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Reports per Student',
      },
    },
  };
  chartData2: ChartDataset[] = [];
  //distribution of reports per type
  chartpieLabels2: string[] = this.reportTypes;
  chartpieOptions2: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribution of Reports per Type',
      },
    },
  };
  chartpieData2: ChartDataset[] = [];

  //distribution of students per field of study
  chartBarLabels: string[] = [];
  chartBarOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Reports per Year',
      },
    },
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //     title: {
    //       display: true,
    //       text: 'Number of Reports',
    //     },
    //     ticks: {
    //       font: {
    //         size: 12,
    //       },
    //       color: '#333',

    //       stepSize: 1,
    //       callback: function (value) {
    //         return Number(value).toFixed(0); // Ensure ticks are integers
    //       },
    //     },
    //   },
    //   x: {
    //     title: {
    //       display: true,
    //       text: 'Year',
    //     },
    //   },
    // },

    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
  };
  chartBarData: ChartDataset[] = [];
  ngOnInit(): void {
    // Generate the list of years from 5 years ago to the current year
    for (let year = this.startYear; year <= this.currentYear; year++) {
      this.yearsList.push(year);
      this.reportCounts[year] = 0; // Initialize count for each year
    }
    // console.log(this.yearsList);

    this.SS.getStudents().subscribe((students) => {
      this.nbStudents = students.length;
      for (let i = 0; i < this.nbStudents; i++) {
        this.studentsList.push(students[i].name + ' ' + students[i].lastname);
      }
      // console.log(this.studentsList);

      for (let i = 0; i < this.fieldOfStudy.length; i++) {
        let nb = 0;
        for (let j = 0; j < this.nbStudents; j++) {
          if (students[j].fieldOfStudy == this.fieldOfStudy[i]) {
            nb++;
            console.log('nb= ' + nb);
          }
        }
        this.studentsInField[i] = nb;
      }
      this.chartBarData = [
        {
          data: this.studentsInField,
          label: 'Students Count',
        },
      ];
      this.chartBarLabels = this.fieldOfStudy;

      console.log(this.chartBarLabels);
      console.log(this.chartBarData);

      this.PS.getProfessors().subscribe((professors) => {
        this.nbProfessors = professors.length;
        // console.log(this.nbStudents);
        // console.log(this.nbProfessors);
        this.chartpieData1 = [
          {
            data: [this.nbStudents, this.nbProfessors],
          },
        ];
        // console.log(this.chartpieData1);
        this.chartpieLabels1 = ['Students', 'Professors'];

        this.RS.getReports().subscribe((reports) => {
          this.nbReports = reports.length;

          for (let i = 0; i < this.nbReports; i++) {
            let year = new Date(reports[i].date).getFullYear();
            // Increment the count for the year if it exists in the reportCounts object
            if (this.reportCounts.hasOwnProperty(year)) {
              this.reportCounts[year]++;
            }
            const authorsCount = reports[i].authors.length;
            this.reportsByStudents[authorsCount] =
              (this.reportsByStudents[authorsCount] || 0) + 1;
          }
          for (let j = 0; j < this.reportTypes.length; j++) {
            let nbR = 0;
            for (let i = 0; i < this.nbReports; i++) {
              if (reports[i].type == this.reportTypes[j]) {
                nbR++;
              }
            }
            this.reportsByType[j] = nbR;
          }
          // console.log(this.reportTypes);
          // console.log(this.reportsByType);
          this.chartpieData2 = [
            {
              data: this.reportsByType,
            },
          ];

          // console.log(this.reportCounts);
          this.chartData = [
            { data: Object.values(this.reportCounts), label: 'Reports Count' },
          ];
          this.chartLabels = Object.keys(this.reportCounts);

          this.chartData2 = [
            {
              data: Object.values(this.reportsByStudents),
              label: 'Students Count',
            },
          ];
          this.chartLabels2 = Object.keys(this.reportsByStudents);
        });
      });
    });
  }
}
