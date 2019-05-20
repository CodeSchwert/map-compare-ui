import { createContext } from 'react' ;

const toDateString = (dateString) => {
  if (dateString.match(/^[0-9]{8}$/) == null) 
    return null;
  if (dateString.length != 8) 
    return null;

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}-${month}-${day}`;
};

const appState = {
  deltaServer: undefined,
  imageServer: undefined,
  userSettings: {},
  project: {
    createdAt: undefined,   // String
    folderPath: undefined,  // String
    name: undefined,        // String
    updatedAt: undefined,   // String
    _id: undefined          // String UUID
  },
  projects: [],
  itls: [],
  itlDates: [],
  selectedDate: undefined,  // String: YYYYMMDD
  selectedITL: undefined,   // number/index
  selectedITLIndex: 0,
  filteredITLArray: [],
  selectedDateString() {
    const dateString = toDateString(this.selectedDate);
    if (dateString) {
      return dateString;
    } else {
      return this.dateString;
    }
  },
  selectDate(date) { /* pass unformated date string! */
    /**
     * probably best to just store the index number instead!
     */
    if (date.match(/^[0-9]{8}$/) == null || date.length != 8) {
      this.selectedDate = undefined;
      this.selectedITLIndex = undefined;
    } else {
      this.selectedDate = date;
      
      this.filteredITLArray = this.itls
        .filter(itlObject => {
          if (itlObject.dates.includes(this.selectedDate))
            return itlObject;
        })
        .sort((a,b) => {
          return a.number - b.number
        });

      this.selectedITL = this.filteredITLArray[0] || undefined;
      this.selectedITLIndex = 0;
    }
  },
  selectITL(n) {
    if (parseInt(n) !== NaN) {
      this.selectedITLIndex = n;
      this.selectedITL = this.filteredITLArray[n];
    }
  },
  updateDeltaServer(url) {
    this.deltaServer = url;
  },
  updateImageServer(url) {
    this.imageServer = url;
  },
  updateProject(project) {
    this.project = project;
  },
  updateProjects(projectArray) {
    if (projectArray instanceof Array) {
      this.projects = projectArray;
    }
  },
  updateItls(itlArray, dateArray) {
    if (itlArray instanceof Array && dateArray instanceof Array) {
      this.itls = itlArray;
      this.itlDates = dateArray;

      if (dateArray.length > 0) {
        this.selectDate(dateArray[0]);
      }
    }
  },
  toDateString: toDateString
};

const AppContext = createContext(appState);

module.exports = {
  appState,
  AppContext
};
