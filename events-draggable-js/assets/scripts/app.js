class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    // bc we cloned element all event listeners attached are removed and garbage collected
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }
  detach() {
    if (this.element) {
      this.element.remove();
      // below is old way to remove
      // this.element.parentElement.removeChild(this.element);
    };
  };

  attach() {
    this.hostElement.insertAdjacentElement(this.insertBefore ? 'beforebegin' : 'beforeend', this.element)
  }
}


class Tooltip extends Component {
  constructor(closeNotifierFunction) {
    super();
    this.closeNotifier = closeNotifierFunction;
    this.create();
  }
  // arrow functions always refer to this as the class it is within, so 'this' would refer to Tooltip class
  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  }

  create() {
    console.log('The tooltip...');
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    tooltipElement.textContent = 'DUMMY tooltip';
    tooltipElement.addEventListener('click',this.closeTooltip);
    this.element = tooltipElement;
  }

}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    // console.log('ProjectItem constructor - id:', id, 'updateFunction: ', updateProjectListsFunction);
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return
    }
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false
    });
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector('button:first-of-type')
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler)
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    // console.log('ProjItem switchBtn: ', switchBtn);
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id));
    // console.log('connectSwitchButton clicked - which triggers this.updateProjectListsHandler');
    //  (e) => {})
  }

  update(updateProjectListsFunction, type) {
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    // console.log(prjItems);
    for (const prjItem of prjItems) {
      // console.log('ProjectList class type: ', type, 'prjItem:', prjItem);
      this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)); 
    }
    // console.log("ProjectList class ending this.projects: ", this.projects);
  }
  setSwitchHandlerFunction(switchHandlerFunction) {
    // console.log('inside setSwitchHandler: '. switchHandlerFunction);
    this.switchHandler = switchHandlerFunction;
  }
  addProject(project) {
    // console.log('addproject: ', this);
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
    project.update(this.switchProject.bind(this), this.type)
  }
  switchProject(projectId) {
    console.log('switchProject activated from bound class ProjectItem but executed on parent class Projectzlist - projectId passed to switchProject: ', projectId);
    this.switchHandler(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter(p => p.id!== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active',);
    const finishedProjectsList = new ProjectList('finished');
    // need to bind add project to finished projects list because add project is a function within project list and so it would be using project list as 'this' instead of window or App 
    activeProjectsList.setSwitchHandlerFunction(finishedProjectsList.addProject.bind(finishedProjectsList));
    finishedProjectsList.setSwitchHandlerFunction(activeProjectsList.addProject.bind(activeProjectsList));
  }
}

App.init();