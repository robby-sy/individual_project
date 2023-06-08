function createRecord(project,name){
    const proj = project.split(" ").join("_")
    const date = new Date()
    return `Record-${date.getFullYear()}${date.getMonth()}${date.getDay()}_${proj}_${name}`
}

function createComponent(project,name){
    const proj = project.split(" ").join("_")
    const date = new Date()
    return `Component-${date.getFullYear()}${date.getMonth()}${date.getDay()}_${proj}_${name}`
}

module.exports = {createComponent,createRecord}